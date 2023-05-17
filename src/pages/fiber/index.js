import { Box, Button, Container, Grid, Stack, styled, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'
import { mainHeroContent } from '../../utils/contents/content'
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from '../../components/landingpage/components/Title'
import Router from 'next/router'
import Slideshow from '../../components/landingpage/components/imageslider'
import { FiberLayout } from '../../components/landingpage/layout/FiberLayout'
import BasicDetails from '../../components/landingpage/components/quicklinks/applynow/BasicDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedindex } from '../../redux/landing/quicklinksAction'
import CheckAvailability from '../../components/landingpage/components/quicklinks/check-availability'
import axios from 'axios'
import CheckBills from '../../components/landingpage/components/quicklinks/check-bills'
import InstallationStatus from '../../components/landingpage/components/quicklinks/installation-status'
import SOA from '../../components/landingpage/components/quicklinks/soa'
import Footer from '../../components/landingpage/containers/footer'
import Link from 'next/link'

const TabsContent = [
  "Check Availability",
  "Apply Now",
  "Check Bills",
  "Statement of Account",
  "Submit Proof of Payment",
  "Installation Status",
]

const {
  MainBG,
} = mainHeroContent

const StyledTabs = styled((props) => 
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
)( ({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
})
);

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(0),
    '&.Mui-focusVisible': {
      color: "#fff",
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
    '&:hover': {
      color: theme.palette.secondary.light,
      // backgroundColor: theme.palette.background.paper,
      opacity: 1,
    },
    '&.Mui-selected': {
      color: theme.palette.secondary.light,
      fontWeight: "bold",
      // backgroundColor: theme.palette.primary.main,
      transition: ".5s"
    },
  }),
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Page = () => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const [ref, { height }] = useMeasure();
  const selectedIndex = useSelector(store => store.fiber.selectedIndex)

  const toggleTab = (index) => {
    dispatch(setSelectedindex(index))
  };


  return (
  <>
        <Head>
            <title>
              Application | RDNAKS ICT
            </title>
        </Head>
      <Box 
      sx={{
        backgroundColor: "#FFFF", 
        paddingTop: "3rem", 
        minHeight: "900px", 
        height: "100vh", 
        paddingBottom: "3rem"
        }}>
        <Container justifyContent="center" maxWidth="md">
        <p
          style={{ marginBottom: "1.5rem", textAlign: "center"}}
        >
          Check out our quick links
        </p>
        <Box className="container" sx={{width: "100%"}}>

          <Box className="bloc-tabs" sx={{height: "60px"}}>
            {TabsContent.map((item, index) => {
              return (
                <Button sx={{
                  background: "rgba(128, 128, 128, 0.075)", 
                  border: "none",
                  fontSize: {xs: "14px", md: "1rem"},
                  borderRadius: "0",
                  color: selectedIndex === index ? "primary.main" : "secondary.main",
                  "&:hover": {
                    backgroundColor: "#fff"
                  }
                }}
                  key={index} onClick={() => toggleTab(index)}
                  className={selectedIndex === index ? "tabs active-tabs" : "tabs"}
                  >
                  <Typography sx={{fontSize: {md: "14px", xs: "12px"}}}>{item}</Typography>
                </Button>
              )
            })}
          </Box>
          <Box sx={{bgcolor: "#fff", padding: "2rem"}}>
            <Box 
            sx={{
              display: selectedIndex === 0? "block" : "none",
              height: "fit-content", 
              }}>
              <Stack justifyContent="center">
                {/* {TabsContent[0]} */}
                <CheckAvailability />
              </Stack>
            </Box>
            <Box 
            sx={{
              display: selectedIndex === 1? "block" : "none", 
              height: "fit-content", 
              maxHeight: "100vh"
              }}>
                <BasicDetails />
            </Box>
            <Box sx={{display: selectedIndex === 2? "block" : "none",
              height: "fit-content", 
          }}>
              <Stack justifyContent="center">
                  {/* {TabsContent[0]} */}
                <CheckBills />
              </Stack>
            </Box>
            <Box sx={{display: selectedIndex === 3? "block" : "none",
              height: "fit-content", 
          }}>
              <Stack justifyContent="center">
                  {/* {TabsContent[0]} */}
                {/* <SOA /> */}
              </Stack>
            </Box>
            <Box sx={{display: selectedIndex === 5? "block" : "none"}}>
              <Stack justifyContent="center">
                {/* {TabsContent[0]} */}
                <InstallationStatus />
              </Stack>
            </Box>
          </Box>
        </Box>
        </Container>
      </Box>
  </>
  )
}

Page.getLayout = (page) => (
  <FiberLayout>
    {page}
  </FiberLayout>
)

export default Page
