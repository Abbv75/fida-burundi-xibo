import React from "react";
import { Stack, Typography, List, ListItem } from "@mui/joy";
import { IMAGES } from "../../../constant";
import SlideLayout from "./SlideLayout";

const Proder: React.FC = () => {
    return (
        <SlideLayout
            backgroundImage={IMAGES.burundi_entrepreneur}
            title="PRODER"
            subtitle="Développement de l’Entrepreneuriat Rural"
        >
            <Stack gap={3}>
                <Typography sx={{ color: "white", fontSize: "1.6vw", fontWeight: "bold" }}>
                    Cultiver l'esprit d'entreprise dans le monde rural.
                </Typography>
                
                <Typography sx={{ color: "white", fontSize: "1.3vw" }}>
                    PRODER favorise la création d'emplois durables, particulièrement pour les jeunes et les femmes, à travers l'agribusiness.
                </Typography>

                <List sx={{ fontSize: "1.2vw", gap: 1 }}>
                    <ListItem sx={{ color: "white" }}>• Accompagnement technique et financier des jeunes ruraux.</ListItem>
                    <ListItem sx={{ color: "white" }}>• Appui à la transformation et à la commercialisation.</ListItem>
                    <ListItem sx={{ color: "white" }}>• Création de micro-entreprises rurales compétitives.</ListItem>
                    <ListItem sx={{ color: "white" }}>• Rayonnement national pour une transformation inclusive.</ListItem>
                </List>
            </Stack>
        </SlideLayout>
    );
};

export default Proder;
