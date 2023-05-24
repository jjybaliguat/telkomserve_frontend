import { Box, Button, Collapse, Container, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Title from '../../components/Title'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Router from 'next/router'
import { Link } from 'react-scroll';

const faqsItem = [
  {
    title: "How long will the installation process?",
    description: "The installation process is 1-2 days depending on your location."
  },
  {
    title: "How should I pay my monthly bills??",
    description: "You can pay thru Gcash payment, just scan the QR code on your router to proceed sending your bill. Our collector also will go to your home to get the payment."
  },
]

const Faqs = () => {
  const [open1, setOpen1] = useState(true)
  const toggleOpen1 = () => setOpen1(!open1)
  const [open2, setOpen2] = useState(false)
  const toggleOpen2 = () => setOpen2(!open2)

  return (
    <>
    <Box 
        sx={{
          background: "#f8f9fa",
          width: "100%",
          height: '100vh',
          paddingBottom: "3rem"
      }}
      id="faqs"
      >
        <Container
          sx={{
            color: "#000",
            marginTop: "3rem"
          }}
        >
          <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: { xs: 5, md: 8 }}}>
            Frequently Ask Questions
          </Title>
          <Box
          sx={{
            width: "100%",
            padding: {sx: "0", md: "0 3rem"}
          }}
          >
            <Stack direction="column" gap={3}>
              <Box
                sx={{
                  bgcolor: "#fff",
                  padding: "1rem 0"
                }}
              >
                <ListItemButton onClick={()=>{toggleOpen1()}}> 
                <ListItemIcon>
                  <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="How long will the installation process?" />
                {(open1) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={(open1) ? true : false} timeout="auto" unmountOnExit>
                <List component="div"
                  sx={{ 
                    pl: "5rem",
                    pr: "2rem"
                  }}
                >
                    <ListItemText primary="The installation process is 1-2 days depending on your location." />
                </List>
              </Collapse>
              </Box>

              <Box
                sx={{
                  bgcolor: "#fff",
                  padding: "1rem 0"
                }}
              >
                <ListItemButton onClick={()=>{toggleOpen2()}}>
                  <ListItemIcon>
                    <HelpOutlineIcon />
                  </ListItemIcon>
                  <ListItemText primary="How should I pay my monthly bills?" />
                  {(open2) ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={(open2) ? true : false} timeout="auto" unmountOnExit>
                  <List component="div"
                    sx={{ 
                      pl: "5rem",
                      pr: "2rem"
                   }}
                  >
                      <ListItemText primary="You can pay thru Gcash payment, just scan the QR code on your router to proceed sending your bill. Our collector also will go to your home to get the payment." />
                      <Button
                        startIcon={<ArrowForwardIcon />}
                        onClick={()=>Router.push("/payment-steps")}
                      >
                        See Pay with QR Code Steps
                      </Button>
                  </List>
                </Collapse>
              </Box>
              <Box
                sx={{marginTop: "3rem"}}
              >
                <Typography>Have Questions? Feel free to ask in <Link
                    to="contact"
                    spy={true} 
                    smooth={true}
                    exact="true"
                    offset={-70}
                    duration={500}
                  >
                    <span style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "#2196f3"
                    }}>Contact Section</span>
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Faqs
