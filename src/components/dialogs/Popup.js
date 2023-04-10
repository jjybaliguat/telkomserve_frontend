import React from 'react'
import { AppBar, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const Popup = (props) => {
    const {title, children, openPopup, setOpenPopup, styles, ...others} = props

  return (
    <BootstrapDialog open={openPopup} {...others}
      maxWidth="md" onClose={()=>setOpenPopup(false)}
      >
        {/* <DialogTitle sx={{ m: 0, p: 3 }}>
            <IconButton
                aria-label="close"
                onClick={()=>setOpenPopup(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle> */}

            {children}
    </BootstrapDialog>
  )
}

export default Popup
