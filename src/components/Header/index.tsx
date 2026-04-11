import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/joy";
import { IMAGES } from "../../constant";
import { green, red, yellow } from "@mui/material/colors";
import { CardMedia } from "@mui/material";

const Header: React.FC = () => {
    return (
        <Stack>
            <Stack
                px={'2vw'}
                py={'0.5vw'}
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    bgcolor: '#0000005b',
                    backdropFilter: `blur(10px)`
                }}
            >
                {/* Logo projet */}
                <Stack gap={1} direction={'row'} >
                    {[IMAGES.armoirie, IMAGES.logo_fida].map((logo, index) => (
                        <CardMedia
                            key={index}
                            component="img"
                            src={logo}
                            alt=""
                            sx={{
                                height: '3vw',
                                width: "auto",
                                filter: "brightness(0) invert(1)"
                            }}
                        />
                    ))}
                </Stack>


                {/* Titre du projet */}
                <Stack spacing={0} sx={{ textAlign: "center" }}>
                    <Typography level="h4" fontWeight="lg" fontSize={'1.2vw'} textColor={green[50]}>
                        Programmes FIDA Burundi
                    </Typography>
                    <Typography level="body-md" fontWeight="md" fontSize={'1vw'} textColor={green[50]}>
                        Projets PIPARV-B, PRODER et PAIFAR-B
                    </Typography>
                </Stack>

                {/* Logos bailleurs / partenaires */}
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box component="img" src={IMAGES.flag_burundi} alt="Flag_of_Burundi" sx={{ height: '2.5vw', width: "auto" }} />
                </Stack>
            </Stack>
            <Grid container >
                {['#009b3a', '#ffffff', '#ce1126'].map((color, index) => (
                    <Grid xs={4} p={'5px'} bgcolor={color} key={index} />
                ))}
            </Grid>
        </Stack>
    );
};

export default Header;
