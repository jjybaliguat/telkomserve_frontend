import React, { useState } from 'react'
import { AppBar, Button, Grid, Link, Typography } from '@mui/material'
import { Box, Container, styled } from '@mui/system'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Router from 'next/router';
import ApplyNowbtn from '../Buttons/ApplyNowbtn';

const UpperNavbar = () => {

    const [showUpperNav, setShowUpperNav] = useState(true)

    window.onscroll = function(){
        scrollFunction()
      }

    function scrollFunction() {
        if(window.pageYOffset > 50){
          setShowUpperNav(false)
        }else{
            setShowUpperNav(true)
        }
      }

  return (
    <Grid container>
        <Grid item sx={{width: "100%", display: {xs: "none", md: "flex"}}}>
            <div
            style={{
                display: {xs: "none", md: "flex"},
                backgroundColor: "#fff",
                color: "#000",
                height: "85px",
                width: "100%",
                display: "flex",
                alignItems: "center"
            }}
            >
                <Grid container justifyContent="space-between"
                    alignItems="center">
                    <Grid item sx={{marginLeft: "3rem"}}>
                        <img src="static/images/rdnaksLogo2.png" height={125} width={155} />
                    </Grid>
                    <Grid item sx={{marginRight: "3rem"}}>
                        <Box sx={{ display: { xs: 'none', md: 'flex', gap: "4rem" } }}>
                            <Link href="tel: +639308127173" underline="none">
                                <Box sx={{display: "flex", gap: "1rem"}} alignItems="center">
                                    <PhoneInTalkIcon sx={{color: "#2196f3", height: 40}}/>
                                    <Box sx={{display: "grid"}}>
                                        <Typography color="#959595">Call Us Now</Typography>
                                        <Typography style={{cursor: "pointer", fontWeight: "bold"}}>09308127173</Typography>
                                    </Box>
                                </Box>
                            </Link>
                            <Link href="mailto:rdnaksnds@rdnaksnds.com" underline="none">
                                <Box sx={{display: "flex", gap: "1rem"}} alignItems="center">
                                    <PhoneInTalkIcon sx={{color: "#2196f3", height: 40}}/>
                                    <Box sx={{display: "grid"}}>
                                        <Typography color="#959595">Email</Typography>
                                        <Typography style={{cursor: "pointer", fontWeight: "bold"}}>rdnaksnds@rdnaksnds.com</Typography>
                                    </Box>
                                </Box>
                            </Link>
                            <ApplyNowbtn 
                            onClick={() => Router.push("/fiber")} 
                            sx={{px: 3}} />
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Grid>
        </Grid>
  )
}

export default UpperNavbar
