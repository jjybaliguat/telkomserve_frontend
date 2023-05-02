import { Avatar, Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-scroll';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <>
    <Container
    sx={{
        color: "#fff",
        marginTop: "3rem",
        paddingBottom: "3rem"
    }}
    >
        <Grid container gap={10}>
            <Grid item
                md={3}
                xs={12}
            >
                <Stack direction="column" gap={3}>
                    <Typography variant="h5"
                    sx={{
                        letterSpacing: "0.08em"
                    }}
                    >RDNAKS NETWORK AND DATA SOLUTION</Typography>
                    <p style={{fontSize: "14px", letterSpacing: "0.08em"}}>Block 156 lot 23 Southville 8B</p>
                    <p style={{fontSize: "14px", letterSpacing: "0.06em"}}><strong>Phone: </strong>09308127173 / 09267609934</p>
                    <p style={{fontSize: "14px", letterSpacing: "0.06em"}}><strong>Email: </strong>renalyndabalos24@gmail.com</p>
                </Stack>
            </Grid>
            <Grid item
                md={3}
                xs={12}
            >
                <Stack direction="column" gap={3}>
                    <Typography variant="h6"
                    sx={{
                        letterSpacing: "0.08em"
                    }}
                    >Useful Links</Typography>
                    <Link
                        to="home"
                        spy={true} 
                        smooth={true}
                        exact="true"
                        offset={-70}
                        duration={500}
                    >
                    <span style={{
                        fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}><ArrowForwardIosIcon fontSize="14px" sx={{marginRight: "10px"}}/>Home</span>
                    </Link>
                    <Link
                        to="services"
                        spy={true} 
                        smooth={true}
                        exact="true"
                        offset={-70}
                        duration={500}
                    >
                    <span style={{
                        fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}><ArrowForwardIosIcon fontSize="14px" sx={{marginRight: "10px"}}/>Services</span>
                    </Link>
                    <Link
                        to="pricing"
                        spy={true} 
                        smooth={true}
                        exact="true"
                        offset={-70}
                        duration={500}
                    >
                    <span style={{
                        fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}><ArrowForwardIosIcon fontSize="14px" sx={{marginRight: "10px"}}/>Plans</span>
                    </Link>
                    <Link
                        to="faqs"
                        spy={true} 
                        smooth={true}
                        exact="true"
                        offset={-70}
                        duration={500}
                    >
                    <span style={{
                        fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}><ArrowForwardIosIcon fontSize="14px" sx={{marginRight: "10px"}}/>FAQ'S</span>
                    </Link>
                    <Link
                        to="contact"
                        spy={true} 
                        smooth={true}
                        exact="true"
                        offset={-70}
                        duration={500}
                    >
                    <span style={{
                        fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center"
                    }}><ArrowForwardIosIcon fontSize="14px" sx={{marginRight: "10px"}}/>Contact us</span>
                    </Link>

                </Stack>
            </Grid>
            <Grid item
                md={3}
                xs={12}
            >
                <Stack direction="column" gap={3}>
                    <Typography variant="h6"
                    sx={{
                        letterSpacing: "0.08em"
                    }}
                    >Social Networks</Typography>

                <Stack direction="row" gap={2}>
                    <Avatar
                    sx={{
                        bgcolor: "primary.main",
                    }}
                    >
                        <FacebookIcon/>
                    </Avatar>
                    <Avatar
                    sx={{
                        bgcolor: "primary.main",
                    }}
                    >
                        <TwitterIcon/>
                    </Avatar>
                    <Avatar
                    sx={{
                        bgcolor: "primary.main",
                    }}
                    >
                        <InstagramIcon/>
                    </Avatar>
                </Stack>
                </Stack>
            </Grid>
        </Grid>
    </Container>
    <Box
    sx={{
        bgcolor: "primary.main",
        height: "fit-content",
        padding: "2rem 0",
        color: "#fff",
        display: {md: "flex", xs: "grid"},
        alignItems: "center",
        justifyContent: "space-around",
        gap: 5
    }}
    >
        <Typography>Powered By: <img src="/static/images/pt-t-Logo.jpg" height={40}/></Typography>
        <Stack direction="row" gap={3}>
            <img src="/static/images/netflix.png" height={40}/>
            <img src="/static/images/youtube.png" height={40}/>
            <img src="/static/images/fb.png" height={40}/>
            <img src="/static/images/ml.jpg" height={40}/>
        </Stack>
        <Typography>All rights reserved @ RDNAKS 2023 </Typography>
    </Box>
    </>
  )
}

export default Footer
