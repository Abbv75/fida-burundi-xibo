import { Dispatch, SetStateAction } from "react";

export type USE_STATE_T<T = any> = Dispatch<SetStateAction<T>>

export type ZUSTAND_T<T> = {
  (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false): void;
  (state: T | ((state: T) => T), replace: true): void;
}

export type LOADING_STATE_T = "En cours de chargement."
  | "Chargement finit."
  | "Chargement échoué."
  | "Chargememnt reussi"
  | "En attente"
  | null;

export interface GET_ALL_VALIDATION_T {
  idValidation: number;
  numFiche: string;
  region: string;
  departement: string;
  arrondissement: string;
  commune: string;
  localite: string;
  marche: string;
  categorie: string;
  sousCategorie: string;
  produit: string;
  qualiteProduit: string | null;
  photo: string;
  dateCollecte: string;
  dateEnregistrement: string;
  dateValidation: string | null;
  prix: string;
  variete: string | null;
  niveauApprovisionnement: string | null;
  enqueteur: string;
  numeroEnqueteur: string;
  superviseur: string;
  precedent?: GET_ALL_VALIDATION_T;
  codeProduit: string
};

export interface PAGE_T {
  id: string;
  component: React.ReactNode;
  duration: number;
  preload?: boolean;
};

export interface FILIERE_T {
  id_filiere: number;
  code_filiere: string;
  libelle: string;
  description: string;
  date_ajout: string;
  date_modif: string | null;
  statut: boolean | null;
}

export interface CATEGORIE_PRODUIT_T {
  id_categorie_produit: number;
  code_categorie: string;
  libelle: string;
  description: string;
  date_ajout: string;
  date_modif: string | null;
  filiere: FILIERE_T;
}

export interface FORME_PRODUIT_T {
  id_forme_produit: number;
  code_forme: string;
  libelle: string;
  description: string;
  date_ajout: string;
  date_modif: string | null;
}

export interface PRODUIT_T {
  id_produit: number;
  code_produit: string;
  nom_produit: string;
  image: string;
  description: string;
  date_ajout: string;
  date_modif: string | null;
  statut: boolean;
  categorie_produit: CATEGORIE_PRODUIT_T;
  forme_produit: FORME_PRODUIT_T;
}



export interface SUIVI_INDICATEUR_DONNEE_ANNEE_T {
  annee: number;
  cible: number;
  realisation: number;
}

export interface SUIVI_INDICATEUR_T {
  id_ref_ind: number;
  code_ref_ind: string;
  intitule: string;
  referentiel: number;
  projet: string;
  donnees_annees: SUIVI_INDICATEUR_DONNEE_ANNEE_T[];
}

export interface API_mobile_activite_T {
  code: string;
  libelle: string;
  etapes?: string;  // parfois "-"
  etapes_valeur?: number;
  indicateurs?: string; // parfois "-"
  indicateurs_valeur?: number;
  pourcentage_decaissement: string;
  pourcentage_decaissement_valeur: number;
  pourcentage_engagement: string;
  pourcentage_engagement_valeur: number;
  has_engagement_issue: boolean;
  cout_prevu: number;
  cout_realise: number;
  cout_engage: number;
}

export interface MISSION_SUPERVISION_T {
  projet: {
    id: string;
    intitule: string;
    sigle: string;
  };
  derniere_mission: {
    id_mission: string;
    type: string;
    debut: string;
    fin: string;
    objet: string;
    projet: string;
  } | null;
  recommandations: {
    total: number;
    statistiques: {
      encours: number;
      execute: number;
      non_execute: number;
      non_entame: number;
      pourcentages: {
        encours: number;
        execute: number;
        non_execute: number;
        non_entame: number;
      }
    }
  };
}