import { AppBar, Grid, Link, Stack } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

const CustomLink = (props) => {
    const {href, title} = props
    // const router = useRouter();
    // // const active = href ? (router.pathname === href) : false;

    return (
        <Link to={href}
            sx={{
                color: "#fff",
                cursor: "pointer",
            }}
            underline="none"
            >
            {title}
        </Link>
    )
}

const Navbar2 = () => {

    // window.onscroll = function(){
    //   scrollFunction()
    // }
  
    // function scrollFunction() {
    //   if(window.pageYOffset > 75){
    //     setNavColor('secondary.main')
    //   }else{
    //     setNavColor('secondary.main')
    //   }
    // }

  return (
    <AppBar
        position='sticky'
        sx={{
            backgroundImage: 'linear-gradient( 136deg, #fff 0%, #fff 5%, #0d47a1 100%)',
            transition: "0.3s",
            top: 0,
            height: "75px",
            display: "flex",
            justifyContent: "center",
        }}
        elevation="20"
    >
        <Grid container justifyContent="space-between" alignItems="center" sx={{padding: {lg: "0 5rem 0 5rem", xs: "0 2rem 0 2rem"}}}>
            <Grid item>
                <img src="/static/images/rdnaksLogo2.png" height={100} width={150} />
            </Grid>
            <Grid item>
                <Stack direction="row" sx={{ display: { xs: 'none', md: 'flex'} }} gap={5}>
                    <CustomLink href="" title="PLANS" />
                    <CustomLink href="" title="HELP & SUPPORT" />
                    <CustomLink href="" title="COVERAGE AREA" />
                </Stack>
            </Grid>
            <Grid item sx={{marginRight: "2rem", display: {lg: "none", md: "none", xs: "flex"}}}> 
                <MenuIcon sx={{fontSize: "3rem", color: "#fff"}} />
            </Grid>

        </Grid>


    </AppBar>
  )
}

export default Navbar2
