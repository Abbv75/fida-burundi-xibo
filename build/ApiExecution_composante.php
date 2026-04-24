<?php
/////////////////////////////////////////////////////////
/*   API SSE - Exécution par Composante (Bilan)        */
/////////////////////////////////////////////////////////

header("Content-Type: application/json");

$path = '../';
include_once $path . 'system/configuration.php';
$config = new Config;
include_once $config->sys_folder . "/database/db_connexion.php";

/**
 * Envoie une réponse JSON et arrête l'exécution
 */
function sendResponse($data, $status = 200)
{
    http_response_code($status);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    if (!isset($pdar_connexion) || !$pdar_connexion) {
        throw new Exception("Connexion à la base de données non établie");
    }

    // 1. Identifier la dernière année disponible globalement
    $query_max_annee = "SELECT MAX(annee_ptba) as max_annee FROM version_ptba";
    $max_annee_stmt = $pdar_connexion->prepare($query_max_annee);
    $max_annee_stmt->execute();
    $max_annee_row = $max_annee_stmt->fetch(PDO::FETCH_ASSOC);
    $derniere_annee = $max_annee_row['max_annee'] ?? date("Y");

    // 2. Récupérer les projets
    $query_projets = "SELECT code_projet as id_projet, intitule_projet, sigle_projet FROM projet ORDER BY code_projet";
    $projets_stmt = $pdar_connexion->prepare($query_projets);
    $projets_stmt->execute();
    $projets = $projets_stmt->fetchAll(PDO::FETCH_ASSOC);

    $all_results = [];

    foreach ($projets as $projet) {
        $projet_id = $projet['id_projet'];
        
        // 3. Récupérer la version active pour CETTE année précise
        $query_version = "SELECT v.annee_ptba, v.id_version_ptba 
                         FROM version_ptba v 
                         WHERE v.id_version_ptba IN (SELECT id_version FROM Max_version_Ptba) 
                         AND v.projet = :projet_id 
                         AND v.annee_ptba = :derniere_annee
                         ORDER BY v.date_validation DESC LIMIT 1";
        
        $version_stmt = $pdar_connexion->prepare($query_version);
        $version_stmt->execute([
            ':projet_id' => $projet_id,
            ':derniere_annee' => $derniere_annee
        ]);
        $version_info = $version_stmt->fetch(PDO::FETCH_ASSOC);

        if (!$version_info) continue;

        $annee = $version_info['id_version_ptba']; // L'ID de version est souvent utilisé comme référence d'année dans ce système
        
        // 3. Récupérer la configuration du niveau (pour le découpage des codes)
        $query_config = "SELECT code_number, nombre FROM niveau_config WHERE projet = :projet_id LIMIT 1";
        $config_stmt = $pdar_connexion->prepare($query_config);
        $config_stmt->execute([':projet_id' => $projet_id]);
        $row_config = $config_stmt->fetch(PDO::FETCH_ASSOC);
        
        $tmp = explode(',', $row_config["code_number"] ?? '1,1');
        $niveau_code = isset($tmp[1]) ? (int)$tmp[1] : 1;

        // 4. Récupérer les composantes (Niveau 2)
        $query_composantes = "SELECT code, intitule FROM activite_projet WHERE niveau = 2 AND projet = :projet_id ORDER BY code ASC";
        $comp_stmt = $pdar_connexion->prepare($query_composantes);
        $comp_stmt->execute([':projet_id' => $projet_id]);
        $composantes = $comp_stmt->fetchAll(PDO::FETCH_ASSOC);

        $results_composantes = [];

        foreach ($composantes as $comp) {
            $comp_code = $comp['code'];
            
            // a. Données Financières (Prévu vs Décaisse)
            $query_finance = "SELECT 
                                SUM(IF(ca.annee = :annee, ca.cout_prevu, 0)) as budget_annuel,
                                SUM(IF(ca.annee = :annee, ca.cout_realise, 0)) as depense_annuelle,
                                SUM(ca.cout_realise) as depense_totale
                             FROM code_activite ca
                             WHERE LEFT(ca.code, :niveau) = :comp_code 
                             AND ca.projet = :projet_id
                             AND ca.code IN (SELECT code_activite_ptba FROM ptba WHERE annee = :annee AND projet = :projet_id)";
            
            $finance_stmt = $pdar_connexion->prepare($query_finance);
            $finance_stmt->execute([
                ':annee' => $annee,
                ':comp_code' => $comp_code,
                ':niveau' => $niveau_code,
                ':projet_id' => $projet_id
            ]);
            $finance = $finance_stmt->fetch(PDO::FETCH_ASSOC);

            // b. Statistiques Activités PTBA (Année en cours)
            $query_stats_act = "SELECT 
                                    COUNT(id_ptba) as total_ptba,
                                    SUM(IF(proportions >= 100, 1, 0)) as n_realise,
                                    SUM(IF(proportions < 100 AND proportions > 0, 1, 0)) as n_encours,
                                    AVG(proportions) as moyenne_physique
                                 FROM v_suivi_activite_ptba
                                 WHERE LEFT(code_activite_ptba, :niveau) = :comp_code
                                 AND annee = :annee
                                 AND projet = :projet_id";
            
            $stats_stmt = $pdar_connexion->prepare($query_stats_act);
            $stats_stmt->execute([
                ':comp_code' => $comp_code,
                ':niveau' => $niveau_code,
                ':annee' => $annee,
                ':projet_id' => $projet_id
            ]);
            $stats = $stats_stmt->fetch(PDO::FETCH_ASSOC);

            // c. Statistiques Globales (Physique - Toutes les années)
            $query_stats_global = "SELECT 
                                    COUNT(DISTINCT code) as total_global,
                                    SUM(IF(taux >= 1, 1, 0)) as n_realise_global,
                                    AVG(IF(taux > 1, 1, taux)) as moyenne_physique_global
                                  FROM vieu_taux_pluri 
                                  WHERE LEFT(code, :niveau) = :comp_code
                                  AND projet = :projet_id";
            
            $global_stmt = $pdar_connexion->prepare($query_stats_global);
            $global_stmt->execute([
                ':comp_code' => $comp_code,
                ':niveau' => $niveau_code,
                ':projet_id' => $projet_id
            ]);
            $global_stats = $global_stmt->fetch(PDO::FETCH_ASSOC);

            $results_composantes[] = [
                'code' => $comp_code,
                'intitule' => $comp['intitule'],
                'financier' => [
                    'budget_annuel' => (float)$finance['budget_annuel'],
                    'depense_annuelle' => (float)$finance['depense_annuelle'],
                    'taux_consommation' => $finance['budget_annuel'] > 0 ? round(($finance['depense_annuelle'] / $finance['budget_annuel']) * 100, 2) : 0
                ],
                'physique' => [
                    'total_activites' => (int)$stats['total_ptba'],
                    'realisees' => (int)$stats['n_realise'],
                    'en_cours' => (int)$stats['n_encours'],
                    'taux_avancement' => round((float)$stats['moyenne_physique'], 2)
                ],
                'global' => [
                    'total_activites' => (int)$global_stats['total_global'],
                    'realisees' => (int)$global_stats['n_realise_global'],
                    'taux_avancement' => round((float)$global_stats['moyenne_physique_global'] * 100, 2)
                ]
            ];
        }

        $all_results[] = [
            'projet' => $projet,
            'annee_reference' => $version_info['annee_ptba'],
            'composantes' => $results_composantes
        ];
    }

    sendResponse([
        'success' => true,
        'data' => $all_results,
        'timestamp' => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    sendResponse([
        'success' => false,
        'error' => $e->getMessage()
    ], 500);
}
