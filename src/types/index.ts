
export type ZUSTAND_T<T> = {
  (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false): void;
  (state: T | ((state: T) => T), replace: true): void;
}

export interface PAGE_T {
  id: string;
  component: React.ReactNode;
  duration: number;
  preload?: boolean;
};

export interface MISSION_STAT_VALUES_T {
  encours: number;
  execute: number;
  non_execute: number;
  non_entame: number;
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
    statistiques: MISSION_STAT_VALUES_T & {
      pourcentages: MISSION_STAT_VALUES_T;
    };
  };
}

export interface SUIVI_ACTIVITE_RESPONSABLE_ITEM_T {
  responsable: string;
  activites_prevues: string;
  activites_en_cours: string;
  activites_en_retard: string;
  activites_realisees: string;
  taches_prevues: string;
  taches_en_cours: string;
  taches_en_retard: string;
  taches_realisees: string;
  projet?: string; // To distinguish between PIPARVB, PRODER, PAIFAR-B
}

export interface SUIVI_ACTIVITE_RESPONSABLE_DATA_T {
  piparvb: SUIVI_ACTIVITE_RESPONSABLE_ITEM_T[];
  proder: SUIVI_ACTIVITE_RESPONSABLE_ITEM_T[];
  paifarb: SUIVI_ACTIVITE_RESPONSABLE_ITEM_T[];
}

export interface EXECUTION_COMPOSANTE_ITEM_T {
  code: string;
  intitule: string;
  financier: {
    budget_annuel: number;
    depense_annuelle: number;
    taux_consommation: number;
  };
  physique: {
    total_activites: number;
    realisees: number;
    en_cours: number;
    taux_avancement: number;
  };
  global: {
    total_activites: number;
    realisees: number;
    taux_avancement: number;
  };
}

export interface PROJET_INFO_T {
  id_projet: string;
  intitule_projet: string;
  sigle_projet: string;
}

export interface EXECUTION_COMPOSANTE_PROJET_T {
  projet: PROJET_INFO_T;
  annee_reference: string;
  taux_execution_globale_tache: number | string;
  taux_execution_globale: number | string;
  composantes: EXECUTION_COMPOSANTE_ITEM_T[];
}

export interface INDICATEUR_ITEM_T {
  code: string;
  intitule: string;
  total_prevu: number;
  total_realise: number;
  pourcentage: number;
}

export interface INDICATEUR_PROJET_T {
  projet: {
    sigle: string;
  };
  indicateurs: INDICATEUR_ITEM_T[];
}

export interface PPM_TOTAL_T {
  nombre_marches: number;
  cout_total_bif: number;
  cout_total_usd: number;
  cout_total_bif_formatted: string;
  cout_total_usd_formatted: string;
}

export interface PPM_CATEGORIE_T extends PPM_TOTAL_T {
  code_categorie: string;
  nom_categorie: string | null;
}

export interface PPM_VERSION_T {
  id_version: string;
  info_version: {
    id_version: string;
    annee: string;
  };
  categories: Record<string, PPM_CATEGORIE_T>;
  totaux_version: PPM_TOTAL_T;
}

export interface PPM_DATA_T {
  projet: PROJET_INFO_T;
  metadata: any;
  data: {
    versions: PPM_VERSION_T[];
    totaux_par_categorie: PPM_CATEGORIE_T[];
    totaux_globaux: PPM_TOTAL_T;
  };
}

export interface PPM_API_RESPONSE_T {
  success: boolean;
  message: string;
  metadata: any;
  data: PPM_DATA_T[];
}