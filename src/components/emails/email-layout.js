import React from 'react'
import EmailNavbar from './email-navbar';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {EmailSideBar} from './email-sidebar';
import EmailInbox from './inbox';
import EmailPopup from './emai-popup';
import { useState } from 'react';

const EmailLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: "2.5rem",
  }));

const Email = () => {
  const [openPopup, setOpenPopup] = useState(false)
  return (
    <>
    <EmailLayoutRoot>
        <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%',
              height: "100%",
              paddingRight: {md: "1rem", xs: "0"},
            }}
          >
            <Stack direction="row" sx={{height: "100%"}}>
                <Box item sx={{width: "100px", height: "100%", px: "0.5rem"}}>
                    <EmailSideBar setOpenPopup={setOpenPopup} />
                </Box>
                <Box 
                    sx={{
                        bgcolor: "#fff",
                        borderRadius: "10px",
                        height: "100%",
                        width: "100%",
                        padding: "1rem",
                    }}
                >
                    <Box
                    sx={{padding: "0.5rem"}}
                    >
                        <Typography variant="h4">Inbox</Typography>
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            height: "400px",
                            overflow: "hidden",
                            overflowY: "scroll",
                        }}
                        >
                            <EmailInbox sx={{display: "flex"}}/>
                        </Box>
                </Box>
            </Stack>
          </Box>
    </EmailLayoutRoot>
    <EmailPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
    <EmailNavbar />
    </>
  )
}

export default Email
