import React, { useState } from 'react'
import UpperNavbar from './components/UpperNavbar/UpperNavBar';
import Navbar from './components/Navbar/Navbar';
import Hero from './containers/MainHero';
import About from './containers/services';
import Section2 from './containers/section2';
import { Avatar, Box, Button, Divider, Drawer, List, ListItem, Stack, Typography } from '@mui/material';
import Pricing from './containers/pricing';
import Services from './containers/services';
import { Link } from 'react-scroll';
import Faqs from './containers/Faqs';
import Footer from './containers/footer';
import Contact from './containers/contact';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const CustomLink = (props) => {
  const {href, title, toggleSidebar} = props

  return(
      <Link
        to={href}
        spy={true} 
        smooth={true}
        exact="true"
        offset={-70}
        duration={500}
        onClick={toggleSidebar}
        onKeyDown={toggleSidebar}
        style={{
          width: "100%",
          padding: "0.5rem",
          cursor: "pointer"
        }}
        >
        <Typography
        >{title}</Typography>
      </Link>        
  )
}

const sidebarItem = [
  {
    title: "HOME",
    href: "home"
  },
  {
    title: "SERVICES",
    href: "services"
  },
  {
    title: "PLANS",
    href: "pricing"
  },
  {
    title: "FAQ'S",
    href: "faqs"
  },
  {
    title: "CONTACT US",
    href: "contact"
  },
]

const Landing = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
      <UpperNavbar />
      <Navbar toggleSidebar={toggleSidebar} />
      <Hero />
      <Section2 />
      <Box sx={{ 
        bgcolor: "background.dark", 
        position: "relative",
        paddingBottom: "5rem",
      }}>
        <Services />
        <Pricing />
        <Divider />
        <Contact />
      </Box>
      <Faqs />
      <Box sx={{ 
        bgcolor: "background.dark", 
        position: "relative",
      }}>
        <Footer />
      </Box>
      <Drawer
            anchor='right'
            open={sidebarOpen}
            onClose={toggleSidebar}
            PaperProps={{
              sx: {
                backgroundColor: 'neutral.900',
                color: '#FFFFFF',
                width: 250
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: "100%",
                overflowY: "scroll",
                position: "relative",
                paddingBottom: "2rem"
              }}
            >
              <Box>
                <Link
                  to='home'
                  spy={true} 
                  smooth={true}
                  exact="true"
                  offset={-70}
                  duration={500}
                  onClick={toggleSidebar}
                  onKeyDown={toggleSidebar}
                >
                    <img
                      src='/static/images/rdnaksLogo2.png'
                      alt='Rdnaks Logo'
                      style={{height: '120px'}}
                    />
                </Link>
              </Box>
              <Box sx={{ 
                flexGrow: 1,
                 }}>
                <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                >
                  {
                    sidebarItem.map((item, index)=> {
                      return(
                      <ListItem
                        key={index}
                      >
                        <CustomLink
                          href={item.href}
                          title={item.title}
                          toggleSidebar={toggleSidebar}
                        />
                      </ListItem>
                      )
                    })
                  }
                </List>
                <Button
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 1.5rem",
                    color: "#fff",
                    marginBottom: "2rem"
                  }}
                  >
                    <Typography>SUPPORT</Typography>
                    <span>
                      <KeyboardArrowDownIcon />
                    </span>
                  </Button>

                  <Divider />

                  <Box
                    sx={{
                      color: "#fff",
                      width: "100%",
                      height: "fit-content",
                      padding: "1rem",
                    }}
                    >
                      <Typography>CONTACT INFO</Typography>
                      <Stack gap={2} sx={{marginTop: "1rem"}}>
                      <Stack direction="row" gap={2}
                        alignItems="center"
                      >
                          <Avatar
                          sx={{
                              bgcolor: "primary.main",
                              width: 25,
                              height: 25
                          }}
                          >
                              <LocationOnIcon sx={{fontSize: "20px"}} />
                          </Avatar>
                          <Stack gap={1}>
                              <Typography sx={{fontSize: "14px"}}>Location</Typography>
                              <Typography sx={{fontSize: "14px"}}>Block 156 lot 23 Southville 8B</Typography>
                          </Stack>
                      </Stack>
                      <Stack direction="row" gap={2}
                        alignItems="center"
                      >
                          <Avatar
                          sx={{
                              bgcolor: "primary.main",
                              width: 25,
                              height: 25
                          }}
                          >
                              <EmailIcon sx={{fontSize: "20px"}} />
                          </Avatar>
                          <Stack gap={1}>
                              <Typography sx={{fontSize: "14px"}}>Email</Typography>
                              <Typography sx={{fontSize: "14px"}}>rdnaksnds@rdnaksnds.com</Typography>
                          </Stack>
                      </Stack>
                      <Stack direction="row" gap={2}
                        alignItems="center"
                      >
                          <Avatar
                          sx={{
                              bgcolor: "primary.main",
                              width: 25,
                              height: 25
                          }}
                          >
                              <LocalPhoneIcon sx={{fontSize: "20px"}} />
                          </Avatar>
                          <Stack gap={1}>
                              <Typography sx={{fontSize: "14px"}}>Phone</Typography>
                              <Typography sx={{fontSize: "14px"}}>09308127173 / 09267609934</Typography>
                          </Stack>
                      </Stack>
                      </Stack>
                  </Box>
              </Box>
            </Box>
      </Drawer>
    </>
  )
}

export default Landing
