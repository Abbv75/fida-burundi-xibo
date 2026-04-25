<?php
/////////////////////////////////////////////////////////
/*   API SSE - Indicateurs de Performance (Bilan)      */
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

    $projet_sigle_filter = isset($_GET['projet']) ? $_GET['projet'] : null;

    // 1. Récupérer les projets
    $query_projets = "SELECT code_projet as id_projet, intitule_projet, sigle_projet FROM projet";
    if ($projet_sigle_filter) {
        $query_projets .= " WHERE sigle_projet = :sigle";
    }
    $query_projets .= " ORDER BY code_projet";
    
    $projets_stmt = $pdar_connexion->prepare($query_projets);
    if ($projet_sigle_filter) {
        $projets_stmt->execute([':sigle' => $projet_sigle_filter]);
    } else {
        $projets_stmt->execute();
    }
    $projets = $projets_stmt->fetchAll(PDO::FETCH_ASSOC);

    $all_results = [];

    foreach ($projets as $projet) {
        $sigle = $projet['sigle_projet'];
        $id_projet = $projet['id_projet'];
        
        // 2. Liste des indicateurs
        $query_liste = "SELECT i.intitule_indicateur as intitule, i.id_indicateur as id, i.code_irprd as code, i.referentiel
                        FROM indicateur_produit_cmr i 
                        WHERE i.cle = 1 AND i.projet_prd = :id_projet
                        ORDER BY i.code_irprd";
        
        $stmt_liste = $pdar_connexion->prepare($query_liste);
        $stmt_liste->execute([':id_projet' => $id_projet]);
        $indicators = $stmt_liste->fetchAll(PDO::FETCH_ASSOC);

        // 3. Cibles (Targets)
        $query_cibles = "SELECT cp.indicateur_produit as id, sum(cp.valeur_cible) as total_prevu
                         FROM cible_cmr_produit cp, indicateur_produit_cmr i
                         WHERE cp.indicateur_produit = i.id_indicateur 
                         AND i.projet_prd = :id_projet 
                         GROUP BY cp.indicateur_produit";
        
        $stmt_cibles = $pdar_connexion->prepare($query_cibles);
        $stmt_cibles->execute([':id_projet' => $id_projet]);
        $cibles = $stmt_cibles->fetchAll(PDO::FETCH_ASSOC);
        $cibles_map = [];
        foreach ($cibles as $c) {
            $cibles_map[$c['id']] = $c['total_prevu'];
        }

        // 4. Réalisations
        $query_real = "SELECT s.indicateur_cr as id, sum(s.valeur_suivi) as total_realise
                       FROM suivi_indicateur_cmr s
                       INNER JOIN indicateur_produit_cmr i ON s.indicateur_cr = i.referentiel
                       WHERE i.projet_prd = :id_projet 
                       GROUP BY s.indicateur_cr";
        
        $stmt_real = $pdar_connexion->prepare($query_real);
        $stmt_real->execute([':id_projet' => $id_projet]);
        $reals = $stmt_real->fetchAll(PDO::FETCH_ASSOC);
        $reals_map = [];
        foreach ($reals as $r) {
            $reals_map[$r['id']] = $r['total_realise'];
        }

        // 5. Assemblage
        $results_indicateurs = [];
        foreach ($indicators as $ind) {
            $id = $ind['id'];
            $ref = $ind['referentiel'];
            $prevu = isset($cibles_map[$id]) ? (float)$cibles_map[$id] : 0;
            $realise = isset($reals_map[$ref]) ? (float)$reals_map[$ref] : 0;
            $pourcentage = $prevu > 0 ? ($realise / $prevu) * 100 : 0;

            $results_indicateurs[] = [
                "code" => $ind['code'],
                "intitule" => $ind['intitule'],
                "total_prevu" => $prevu,
                "total_realise" => $realise,
                "pourcentage" => $pourcentage
            ];
        }

        $all_results[] = [
            "projet" => ["sigle" => $sigle],
            "indicateurs" => $results_indicateurs
        ];
    }

    sendResponse([
        'success' => true,
        'data' => $projet_sigle_filter ? $all_results[0] : $all_results,
        'timestamp' => date('Y-m-d H:i:s')
    ]);

} catch (Exception $e) {
    sendResponse([
        'success' => false,
        'error' => $e->getMessage()
    ], 500);
}
?>
