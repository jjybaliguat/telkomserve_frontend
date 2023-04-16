import { Box, Container, styled } from '@mui/material';
import React, { useState } from 'react'
import useMeasure from 'react-use-measure';
import { mainHeroContent } from '../../../utils/contents/content';
import Navbar2 from '../components/Navbar/Navbar2';

const FiberLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    marginTop: 100,
  }));

export const FiberLayout = (props) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const {children} = props

  return (
    <>
    <Navbar2 />
    {/* <FiberLayoutRoot> */}
        {children}
    {/* </FiberLayoutRoot> */}
    </>
  )
}

