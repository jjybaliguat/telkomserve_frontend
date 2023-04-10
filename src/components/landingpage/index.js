import React from 'react'
import UpperNavbar from './components/UpperNavbar/UpperNavBar';
import Navbar from './components/Navbar/Navbar';
import Hero from './containers/MainHero';
import About from './containers/services';
import Section2 from './containers/section2';
import { Box } from '@mui/material';
import Pricing from './containers/pricing';
import Services from './containers/services';

const Landing = () => {

  return (
    <>
      <UpperNavbar />
      <Navbar />
      <Hero />
      <Section2 />
      <Box sx={{ bgcolor: "background.dark", position: "relative",}}>
        <Services />
        <Pricing />
      </Box>
    </>
  )
}

export default Landing
