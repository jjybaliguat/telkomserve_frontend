import { AppBar, Button, Grid, Stack, Typography } from '@mui/material'
import { Box, Container, styled } from '@mui/system'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { LinkS } from './NavElements';
import ApplyNowbtn from '../Buttons/ApplyNowbtn';

const CustomLink = (props) => {
    const {href, title} = props
    // const router = useRouter();
    // // const active = href ? (router.pathname === href) : false;

    return (
        <LinkS to={href}
            spy={true} 
            smooth={true}
            exact="true"
            offset={-70}
            duration={500}
            >
            {title}
        </LinkS>
    )
}

const Navbar = () => {
    const [hideLogo, setHideLogo] = useState(false)

    window.onscroll = function(){
      scrollFunction()
    }
  
    function scrollFunction() {
      if(window.pageYOffset > 85){
        setHideLogo(true)
      }else{
        setHideLogo(false)
      }
    }

  return (
    <>
    <AppBar 
        position='sticky'
        sx={{
            backgroundColor: "#000",
            // top: {xs: 0, lg: 85},
            // color: "text.secondary2",
            top: 0,
            height: "75px",
            display: "flex",
            justifyContent: "center"
        }}
        >
        <Grid container justifyContent="space-between"
            alignItems="center">
            {hideLogo? (
            <Grid item sx={{marginLeft: "2rem"}}>
                <img src="static/images/rdnaksLogo2.png" height={100} width={150} />
            </Grid>
            ) :
            (
            <Grid item sx={{marginLeft: "2rem" , display: {lg: "none", xs: "flex"}}}>
                <img src="static/images/rdnaksLogo2.png" height={100} width={150} />
            </Grid>
            )
            }
            <Grid item>
            </Grid>
            <Grid item sx={{marginRight: "4rem"}}>
                <Stack sx={{ display: { xs: 'none', md: 'flex'} }} direction="row" gap={5} alignItems="center">
                    <CustomLink href="home" title="HOME" />
                    <CustomLink href="services" title="SERVICES" />
                    <CustomLink href="pricing" title="PLANS" />
                    <CustomLink href="faqs" title="FAQ'S" />
                    <CustomLink href="contact" title="CONTACT US" />
                    <ApplyNowbtn 
                        onClick={() => Router.push("/fiber")}
                        sx={{px: 3, display: {md:`${hideLogo? "flex" : "none"}`, xs: "none"}}} />
                    {/* <CustomLink href="#about" scroll={false}>
                        <Typography style={{cursor: "pointer", fontWeight: "bold"}}>ABOUT</Typography>
                    </CustomLink>
                    <CustomLink href="" scroll={false}>
                        <Typography style={{cursor: "pointer", fontWeight: "bold"}}>PRICING</Typography>
                    </CustomLink>
                    <CustomLink href="" scroll={false}>
                        <Typography style={{cursor: "pointer", fontWeight: "bold"}}>FAQ'S</Typography>
                    </CustomLink>
                    <CustomLink href="" scroll={false}>
                        <Typography style={{cursor: "pointer", fontWeight: "bold"}}>CONTACT US</Typography>
                    </CustomLink> */}
                </Stack>
            </Grid>
            <Grid item sx={{marginRight: "2rem", display: {lg: "none", md: "none", xs: "flex"}}}> 
                <MenuIcon sx={{fontSize: "3rem", color: "#fff"}} />
            </Grid>
        </Grid>
    </AppBar>
    </>
  )
}

export default Navbar
