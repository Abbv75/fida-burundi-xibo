import { Box, Card, CardCover } from "@mui/joy";
import { IMAGES } from "../../constant";
import { CardMedia } from "@mui/material";

export default () => {
    return (
        <Card
            sx={{
                position: "fixed",
                height: "100vh",
                width: "100vw",
                zIndex: -1,
                p: 0
            }}
        >
            <CardCover>
                <CardMedia
                    component="img"
                    image={IMAGES.burundi_hills}
                />
            </CardCover>
            <CardCover
                sx={{
                    background:"linear-gradient(rgba(0,60,30,0.75), rgba(0,60,30,0.75))",
                }}
            />

        </Card>
    )
}
