import { AppBar, Avatar, Badge, Box, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import React from 'react'
import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const EmailNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    paddingTop: "64px",
  }));

const EmailNavbar = (props) => {
    const { onSidebarOpen, ...other } = props;
  return (
    <>
    <EmailNavbarRoot
    sx={{
        left: {
          lg: 280
        },
        width: {
          lg: 'calc(100% - 280px)'
        }
      }}
    >
        <Toolbar
            disableGutters
            sx={{
            minHeight: 64,
            left: 0,
            px: 2,
            color: "#000"
            }}
        >
            <IconButton 
            onClick={onSidebarOpen}
            >
                <MenuIcon fontSize="small" />
            </IconButton>
            <Stack direction="row" gap={1} alignItems="center">
                <img src="/static/images/gmail.png" height={30}/>
                <Typography>Gmail</Typography>
            </Stack>
            <Tooltip title="Search">
                <IconButton sx={{ ml: 1 }}>
                    <SearchIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Toolbar>
    </EmailNavbarRoot>
    </>
  )
}

export default EmailNavbar
