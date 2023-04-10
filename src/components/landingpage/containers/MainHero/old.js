import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Router from 'next/router';

const Hero = () => {
  return (
    <div id="home" 
        style={{
            height: "100vh",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("/static/images/mainHero.jpg")`,
            color: "#fff"
        }}
        >
        <Container maxWidth={false} sx={{justifyContent: "center"}}>
            <Grid container alignItems="center"
                spacing={5}
            // sx={{
            //     gap: 10, display: "flex", 
            //     alignItems: "center", 
            //     justifyContent: "space-between",
            //     margin: "5rem"
            //     }}
                >
                <Grid item lg={6} xs={12}>
                    <img src='/static/images/rdnaksLogo2.png' height={300} />
                </Grid>
                <Grid item lg={6} xs={12}
                // sx={{alignItems: {xs: "center"}}}
                >
                    <Typography>We Provide A Better</Typography>
                    <Typography variant="h2">PURE FIBER</Typography>
                    <Typography variant="h2">INTERNET CONNECTION</Typography>
                    <Button variant="contained" onClick={() => Router.push("/register")} sx={{color: "#000", border: "1px solid #8C8C8C", background: "#08D1FD"}} 
                        endIcon={
                        <div style={{backgroundColor: "#fff", width: "2rem", display: "flex", justifyContent: "center", borderRadius: "3px", padding: "0 22px"}}>
                            <ArrowForwardIosIcon sx={{color: "#000"}}/>
                        </div>}
                        >
                        Apply Now
                    </Button>
                    <Button variant="outlined" onClick={() => Router.push("/register")} sx={{color: "#fff", border: "1px solid #8C8C8C", marginLeft: "1rem"}} 
                        endIcon={
                        <div style={{backgroundColor: "#08D1FD", width: "2rem", display: "flex", justifyContent: "center", borderRadius: "3px", padding: "0 22px"}}>
                            <ArrowForwardIosIcon sx={{color: "#fff"}}/>
                        </div>}
                        >
                        Check Bills
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </div>
  )
}

export default Hero
