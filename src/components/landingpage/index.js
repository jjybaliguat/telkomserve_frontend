import React, { useState } from 'react'
import UpperNavbar from './components/UpperNavbar/UpperNavBar';
import Navbar from './components/Navbar/Navbar';
import Hero from './containers/MainHero';
import About from './containers/services';
import Section2 from './containers/section2';
import { Box, Drawer, List, ListItem, Typography } from '@mui/material';
import Pricing from './containers/pricing';
import Services from './containers/services';
import { Link } from 'react-scroll';
import Faqs from './containers/Faqs';

const CustomLink = (props) => {
  const {href, title, toggleSidebar} = props

  return(
      <Link
        to={href}
        spy={true} 
        smooth={true}
        exact="true"
        duration={500}
        onClick={toggleSidebar}
        onKeyDown={toggleSidebar}
        >
        <Typography
        sx={{
          width: "100%"
        }}
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
      <Box sx={{ bgcolor: "background.dark", position: "relative",}}>
        <Services />
        <Pricing />
        <Faqs />
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
                width: "100%"
                // padding: "1rem"
              }}
            >
              <Box>
                <Link
                  to='home'
                  spy={true} 
                  smooth={true}
                  exact="true"
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
                  justifyContent: "center",
                  width: "100%"
                }}
                >
                  {
                    sidebarItem.map((item, index)=> {
                      return(
                      <ListItem
                        key={index}
                        sx={{
                          cursor: "pointer",
                          marginBottom: "1rem",
                        }}
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
              </Box>
            </Box>
      </Drawer>
    </>
  )
}

export default Landing
