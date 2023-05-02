import { Box, Button, Container, Grid, Hidden, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { mainHeroContent } from '../../../../utils/contents/content'
import ApplyNowbtn from '../../components/Buttons/ApplyNowbtn'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Title from '../../components/Title';
import useMeasure from 'react-use-measure';
import Slideshow from '../../components/imageslider';
import { useRouter } from 'next/router';
import Router from "next/router"
import { useDispatch } from 'react-redux';
import { setSelectedindex } from '../../../../redux/landing/quicklinksAction';
import { useState } from 'react';
import { useEffect } from 'react';
import ImageSlider from '../../components/imageslider/new';
import 'react-slideshow-image/dist/styles.css'

const {
    MainBG,
    blackGradient,
    upperTitle,
    title,
    title2,
    subtitle
} = mainHeroContent

const CustomButton = ({children, ...props}) => (
    <Button 
    variant="outlined"
    sx={{
        borderRadius: 1,
        color: "#fff",
        borderColor: "#fff",
        height: 50,
        px: 3,
      }}
      endIcon={<ArrowForwardIosIcon />}
      {...props}
    >{children}</Button>
)

const Hero = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [ref, { height }] = useMeasure();
    const dispatch = useDispatch()

  return (
    <Box sx={{ width: "100%" }} id="home">
        {/* Main Background */}
        <Box sx={{ position: "fixed", zIndex: -10, top: 0, left: 0, right: 0 }}>
            <img src={MainBG} style={{ width: "100%"}} />
            {/* <video autoPlay loop muted src={MainBG} type='video/mp4' /> */}
        </Box>
        {/* backgrounds elements */}
        <Box
            ref={ref}
            sx={{
            position: "absolute",
            width: "100%",
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            }}
        >
            <img src={MainBG} style={{ width: "100%", opacity: "0" }} />

            <Hidden>
                {/* <img
                    src={blackGradient}
                    style={{
                    position: "absolute",
                    width: "100%",
                    right: 0,
                    left: 0,
                    bottom: "2%",
                    opacity: 0.6
                    }}
                /> */}
            </Hidden>
            <Box
                sx={{
                    backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,1))",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    left: 0,
                    right: 0,
                    height: {xs: "250px", md: "800px"},
                    bottom: "2%",
                    // top: `calc(${height}px)`,
                    // display: {xs: "none", md: "flex"}
                }}
                ></Box>

            <Box
                sx={{
                    bgcolor: "background.dark",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "880px",
                    top: `calc(${height}px - 18%)`,
                }}
                ></Box>
        </Box>

        <Container 
            sx={{
            height: "fit-content",
            mt: 8,
            color: "#fff",
            paddingBottom: "10rem",
            [theme.breakpoints.up("md")]: { mt: 10 },
            }}
            >
            <Grid container
                flexDirection={{xs: "column", md: "row"}}
                alignItems="center"
                gap={10}
            >
                <Grid item sx={{height: "inherit"}} justifyContent="center">
                    <Title
                    variant={{ xs: "h6", sm: "h6", md: "h5" }}
                    sx={{ letterSpacing: "0.05em", mb: 1 }}
                    >
                        {upperTitle}
                    </Title>
                    <Title
                    variant={{ xs: "h3", sm: "h2", md: "h1" }}
                    sx={{ letterSpacing: "0.02em", mb: 1 }}
                    >
                        {title}
                    </Title>
                    <Title
                    variant={{ xs: "h3", sm: "h2", md: "h1" }}
                    sx={{ letterSpacing: "0.02em", mb: 1 }}
                    >
                        {title2}
                    </Title>
                    <Title
                    variant={{ xs: "h4", sm: "h3", md: "h3" }}
                    sx={{ fontWeight: 500, letterSpacing: "0.05em", mb: 5 }}
                    >
                        {subtitle}
                    </Title>
                    <Stack 
                        direction={{xs: "column", md: "row", }}
                        alignItems="center"
                        spacing={2}
                        >
                        <ApplyNowbtn fullWidth={isSmallScreen} sx={{height: 50, px: 3}} onClick={() => {
                            Router.push("/fiber"); dispatch(setSelectedindex(1))}}/>
                        <CustomButton fullWidth={isSmallScreen}
                        onClick={() => {Router.push("/fiber"); dispatch(setSelectedindex(2))}}
                        >Check Bills</CustomButton>
                    </Stack>
                </Grid>
                <Grid item >
                    <Box sx={{height: "300px", width: "350px"}}>
                        <ImageSlider />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

export default Hero
