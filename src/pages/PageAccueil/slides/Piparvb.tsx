import React from "react";
import { Stack, Typography, List, ListItem } from "@mui/joy";
import { IMAGES } from "../../../constant";
import SlideLayout from "./SlideLayout";

const Piparvb: React.FC = () => {
    return (
        <SlideLayout
            backgroundImage={IMAGES.burundi_rice}
            title="PIPARV-B"
            subtitle="Intensification Agricole et Réduction de la Vulnérabilité"
        >
            <Stack gap={3}>
                <Typography sx={{ color: "white", fontSize: "1.6vw", fontWeight: "bold" }}>
                    Transformer l'agriculture pour éradiquer la pauvreté.
                </Typography>
                
                <Typography sx={{ color: "white", fontSize: "1.3vw" }}>
                    Le projet se concentre sur l'augmentation durable des revenus et l'amélioration des conditions de vie des ménages vulnérables.
                </Typography>

                <List sx={{
                    fontSize: "1.2vw",
                    gap: 1
                }}>
                    <ListItem sx={{ color: "white" }}>• Aménagement des bassins versants et protection des sols.</ListItem>
                    <ListItem sx={{ color: "white" }}>• Intensification des filières Riz, Maïs et Lait.</ListItem>
                    <ListItem sx={{ color: "white" }}>• Appui direct aux coopératives et agriculteurs familiaux.</ListItem>
                    <ListItem sx={{ color: "white" }}>• Présent dans : Karusi, Kayanza, Ngozi, Gitega et Muyinga.</ListItem>
                </List>
            </Stack>
        </SlideLayout>
    );
};

export default Piparvb;
