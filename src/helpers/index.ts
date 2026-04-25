import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Formate une chaîne de date ISO en format lisible (ex: 20 avril 2026)
 * @param dateStr Chaîne de date ISO
 * @returns Date formatée ou la chaîne originale en cas d'erreur
 */
export const formatMissionDate = (dateStr: string) => {
    try {
        if (!dateStr) return "";
        return format(parseISO(dateStr), "d MMMM yyyy", { locale: fr });
    } catch (e) {
        return dateStr;
    }
};

/**
 * Calcule la valeur en pourcentage
 */
export const getPercentageValue = (value: string | number, total: string | number) => {
    const v = Number(value);
    const t = Number(total);
    if (t === 0) return 0;
    return Math.round((v / t) * 100);
};

/**
 * Formate une valeur en pourcentage avec le symbole %
 */
export const formatPercent = (value: string | number, total: string | number) => {
    return `${getPercentageValue(value, total)}%`;
};
