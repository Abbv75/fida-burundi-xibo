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
