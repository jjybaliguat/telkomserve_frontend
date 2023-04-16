import React from 'react'
import EmailNavbar from './email-navbar';
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {EmailSideBar} from './email-sidebar';
import EmailInbox from './inbox';

const EmailLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: "2.5rem",
  }));

const Email = () => {
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
              paddingRight: {md: "3rem", xs: "1rem"},
            }}
          >
            <Stack direction="row" sx={{height: "100%"}}>
                <Box item sx={{width: "200px", height: "100%"}}>
                    <EmailSideBar />
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
                            height: "40vh",
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
    <EmailNavbar />
    </>
  )
}

export default Email
