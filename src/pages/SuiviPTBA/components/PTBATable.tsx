import React from "react";
import { Box } from "@mui/joy";
import TableCustom from "../../../components/TableCustome";
import { ActivitePTBA } from "../../../service/ptba_zibo";
import LinearProgressCustom from "../../../components/LinearProgressCustom";
import { TASK_PALETTE } from "./constants";

interface PTBATableProps {
    activities: ActivitePTBA[];
}

export const PTBATable: React.FC<PTBATableProps> = ({ activities }) => {
    const transformedData = React.useMemo(() => {
        return activities.map((act) => ({
            ...act,
            total_prop_el: (
                <LinearProgressCustom 
                    value={parseFloat(act.total_prop || "0")} 
                    progressColor={TASK_PALETTE[0]} 
                />
            ),
            taux_decaissement_el: (
                <LinearProgressCustom 
                    value={parseFloat(act.taux_decaissement || "0")} 
                    progressColor={TASK_PALETTE[1]} 
                />
            ),
        }));
    }, [activities]);

    return (
        <Box
            sx={{
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
                overflow: "hidden",
                height: "100%",
                '& thead *': {
                    color: '#ffd700 !important',
                    background: 'rgba(0,60,25,0.6) !important',
                    fontSize: '0.9vw !important',
                },
                '& tbody *': {
                    color: '#fff !important',
                    fontSize: '0.85vw !important',
                }
            }}
        >
            <TableCustom
                columns={[
                    { label: "Activité / Tâche", key: "intitule_activite_ptba" },
                    { label: "Avancement Physique (%)", key: "total_prop_el" },
                    { label: "Taux de Décaissement (%)", key: "taux_decaissement_el" },
                ]}
                data={transformedData}
            />
        </Box>
    );
};
