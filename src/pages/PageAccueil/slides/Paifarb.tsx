import React from "react";
import { Stack, Typography, List, ListItem } from "@mui/joy";
import { IMAGES } from "../../../constant";
import SlideLayout from "./SlideLayout";

const Paifarb: React.FC = () => {
    return (
        <SlideLayout
            backgroundImage={IMAGES.burundi_finance}
            title="PAIFAR-B"
            subtitle="Inclusion Financière Agricole et Rurale"
        >
            <Stack gap={3}>
                <Typography sx={{ color: "white", fontSize: "1.6vw", fontWeight: "bold" }}>
                    Rendre les services financiers accessibles à tous.
                </Typography>
                
                <Typography sx={{ color: "white", fontSize: "1.3vw" }}>
                    PAIFAR-B comble le fossé entre les populations rurales et les institutions financières.
                </Typography>

                <List sx={{ fontSize: "1.2vw", gap: 1 }}>
                    <ListItem sx={{ color: "white" }}>• Amélioration de l'offre de crédit et d'épargne en milieu rural.</ListItem>
                    <ListItem sx={{ color: "white" }}>• Renforcement des Institutions de Microfinance (IMF).</ListItem>
                    <ListItem sx={{ color: "white" }}>• Promotion de l'assurance agricole et de l'éducation financière.</ListItem>
                    <ListItem sx={{ color: "white" }}>• Inclusion des ménages très vulnérables et des femmes.</ListItem>
                </List>
            </Stack>
        </SlideLayout>
    );
};

export default Paifarb;
