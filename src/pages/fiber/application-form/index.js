import { Box, Button, Container, Grid, Stack, styled, Tab, Tabs, TextField, Typography, useTheme } from '@mui/material'
import Head from 'next/head'
import React, { useState } from 'react'
import useMeasure from 'react-use-measure'
import { mainHeroContent } from 'src/utils/contents/content'
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from 'src/components/landingpage/components/Title'
import Router from 'next/router'
import Slideshow from 'src/components/landingpage/components/imageslider'
import { FiberLayout } from 'src/components/landingpage/layout/FiberLayout'
import BasicDetails from 'src/components/landingpage/components/quicklinks/applynow/BasicDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep, setSelectedindex } from 'src/redux/landing/quicklinksAction'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import BroadcastOnPersonalIcon from '@mui/icons-material/BroadcastOnPersonal';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CheckAvailability from 'src/components/landingpage/components/quicklinks/check-availability'
import BasicDetailsContinuation from 'src/components/landingpage/components/quicklinks/applynow/BasicDetailsContinuation'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
  
  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };
  
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 20,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 136deg, #3FC79A 0%, #2196f3 50%, #0d47a1 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
        'linear-gradient( 136deg, #3FC79A 0%, #10B981 50%, #0B815A 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));
  
  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
      'linear-gradient( 136deg, #2196f3 0%, #2196f3 50%, #0d47a1 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, #3FC79A 0%, #10B981 50%, #0B815A 100%)',
    }),
  }));
  
  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;
  
    const icons = {
      1: <LocationOnIcon />,
      2: <DescriptionIcon />,
      3: <BroadcastOnPersonalIcon />,
      4: <FileUploadIcon />,
      5: <FactCheckIcon />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  
  const steps = ['CHECK AVAILABILITY', 'BASIC DETAILS', 'PLAN', 'DOCUMENT UPLOAD', 'VERIFY AND SUBMIT'];
  
  

const Page = () => {
  const dispatch = useDispatch()
  const activestep = useSelector(store => store.fiber.activeStep)
  const appllicantDetails = useSelector(store => store.fiber.appllicantDetails)
  console.log(appllicantDetails);

  return (
  <>
        <Head>
            <title>
              Application | RDNAKS ICT
            </title>
        </Head>
      <Box sx={{backgroundColor: "#fff", paddingTop: "3rem", height: "fit-content", minHeight: "100vh", paddingBottom: "3rem"}}>
        <Container justifyContent="center" maxWidth="md">
        <Title
            variant="h5"
            sx={{ letterSpacing: "0.03em", mb: 1 }}
          style={{ marginBottom: "1.5rem", textAlign: "center"}}
        >
          PLEASE COMPLETE YOUR APLICATION FORM
        </Title>
        <Box sx={{width: "100%"}}>
            <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper alternativeLabel activeStep={activestep} connector={<ColorlibConnector />}>
                    {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}><Typography sx={{fontSize: "14px", display: {xs: "none", md: "block"}}}>{label}</Typography></StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <Box sx={{bgcolor: "#fff", padding: "2rem"}} className="container">
                  <Box sx={{display: activestep === 0? "block" : "none"}}>
                    <Stack justifyContent="center">
                      {/* {TabsContent[0]} */}
                      <CheckAvailability />
                    </Stack>
                  </Box>
                  <Box sx={{display: activestep === 1? "block" : "none"}}>
                    <Stack justifyContent="center">
                      {/* {TabsContent[0]} */}
                      <BasicDetailsContinuation />
                    </Stack>
                  </Box>
                  <Box sx={{display: activestep === 2? "block" : "none"}}>
                    <Stack justifyContent="center">
                      {/* {TabsContent[0]} */}
                      <Typography>Select Desired Plan</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{display: activestep === 3? "block" : "none"}}>
                    <Stack justifyContent="center">
                      {/* {TabsContent[0]} */}
                      <Typography>Upload required documents</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{display: activestep === 4? "block" : "none"}}>
                    <Stack justifyContent="center">
                      {/* {TabsContent[0]} */}
                      <Typography>Verify and Submit</Typography>
                    </Stack>
                  </Box>
                </Box>
            </Stack>
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
