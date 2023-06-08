import { AppBar, Button, Grid, Menu, MenuItem, Popover, Stack, Typography } from '@mui/material'
import { Box, Container, styled, alpha } from '@mui/system'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { LinkS } from './NavElements';
import ApplyNowbtn from '../Buttons/ApplyNowbtn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch } from 'react-redux';
import { setSelectedindex } from '../../../../redux/landing/quicklinksAction';

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

const CustomLink = (props) => {
    const {href, title} = props
    // const router = useRouter();
    // // const active = href ? (router.pathname === href) : false;

    return (
        <LinkS 
            to={href}
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

const Navbar = ({toggleSidebar}) => {
    const dispatch = useDispatch()
    const [hideLogo, setHideLogo] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleHover = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

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
                <img src="static/images/logo.png" height={50} />
            </Grid>
            ) :
            (
            <Grid item sx={{marginLeft: "2rem" , display: {lg: "none", xs: "flex"}}}>
                <img src="static/images/logo.png" height={50} />
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
                    <CustomLink href="contact" title="CONTACT US" />
                    <CustomLink href="faqs" title="FAQ'S" />
                    <Typography
                        id="quicklinks-menu"
                        underline="none"
                        // onMouseEnter={handleHover}
                        onClick={handleHover}
                        aria-owns={open ? 'quicklinks-menu' : undefined}
                        aria-haspopup="true"
                        sx={{
                            fontWeight: 'bold',
                            color: 'rgba(255,255,255,.6)',
                            display: "flex",
                            alignItems: "center",
                            "&:hover": {
                                color: "#fff",
                            },
                            cursor: "pointer"
                        }}
                    >SUPPORT <KeyboardArrowDownIcon /></Typography>
                    <ApplyNowbtn 
                        onClick={() => Router.push("/fiber")}
                        sx={{px: 3, display: {md:`${hideLogo? "flex" : "none"}`, xs: "none"}}} 
                    />
                    <StyledMenu
                        id="quicklinks-menu"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'bottom',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'bottom',
                          }}
                        MenuListProps={{
                        'aria-labelledby': 'quicklinks-menu',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={()=> {handleClose(); Router.push('/fiber'); dispatch(setSelectedindex(0))}}>
                            Check Availability
                        </MenuItem>
                        <MenuItem onClick={()=> {handleClose(); Router.push('/fiber'); dispatch(setSelectedindex(1))}} disableRipple>
                            Application
                        </MenuItem>
                        <MenuItem onClick={()=>{handleClose(); Router.push('/fiber'); dispatch(setSelectedindex(2))}} disableRipple>
                            Check Bills
                        </MenuItem>
                        <MenuItem onClick={()=>{handleClose(); Router.push('/fiber'); dispatch(setSelectedindex(3))}} disableRipple>
                            SOA
                        </MenuItem>
                        <MenuItem onClick={()=>{handleClose(); Router.push('/fiber'); dispatch(setSelectedindex(4))}} disableRipple>
                            Submit Proof of Payment
                        </MenuItem>
                        <MenuItem onClick={()=>{handleClose(); Router.push('/fiber'); dispatch(setSelectedindex(5))}} disableRipple>
                            Installation Status
                        </MenuItem>
                    </StyledMenu>
                </Stack>
            </Grid>
            <Grid item sx={{marginRight: "2rem", display: {lg: "none", md: "none", xs: "flex"}}}> 
                <MenuIcon 
                sx={{
                    fontSize: "3rem", 
                    color: "#fff",
                    cursor: "pointer"
                }}
                onClick={toggleSidebar}
                 />
            </Grid>
        </Grid>
    </AppBar>
    </>
  )
}

export default Navbar
