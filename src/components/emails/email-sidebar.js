import { Box, Button, Drawer, Stack } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';
import { useState } from 'react';

const items = [
    {
        icon: (<MoveToInboxIcon fontSize="small" />),
        title: 'Inbox'
      },
      {
        icon: (<SendIcon fontSize="small" />),
        title: 'Sent'
      },
]

const drawerWidth = 200;

export const EmailSideBar = (props) => {

    const { open, onClose, setOpenPopup } = props;
    const [selectedIndex, setSelectedIndex] = useState(0)

  const content = (
    <>
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: "100%",
          paddingTop: "1rem",
        }}
      >
        <div>
            <Box>
                <Box
                sx={{
                    alignItems: 'center',
                    // backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: '11px',
                    borderRadius: 1
                }}
                >
                    <Button
                    variant='outlined'
                    sx={{
                        padding: "0.5rem",
                        borderRadius: "20px",
                        fontSize: "10px"
                    }}
                        startIcon={<EditIcon />}
                      onClick={() => setOpenPopup(true)}
                    >   
                        Compose
                    </Button>
                </Box>
          </Box>
        </div>
        <Box sx={{ flexGrow: 1, padding: "1rem 0.5rem"}}>
            <Stack  gap={1}>
            {items.map((item, index) => (
                <Button
                    key={index}
                    startIcon={item.icon}
                    sx={{borderRadius: "24px", fontSize: "10px"}}
                    variant={`${selectedIndex === index ? "contained" : ""}`}
                >
                    {item.title}
                </Button>
            ))}
            </Stack>
        </Box>
      </Box>
    </>
  )

  return (
    <div
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        left: {
            lg: 280
          },
        height: "100%",
      }}
    >
      {content}
    </div>
  );
}

EmailSideBar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
  };
