import React from 'react'
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

const ConfirmDialog = (props) => {

    const { confirmDialog, setConfirmDialog } = props;

    return (
        <Dialog open={confirmDialog.isOpen} 
            onClose={()=>setConfirmDialog({...confirmDialog, isOpen: false})}
            PaperProps={{sx:{padding: 1, position: 'absolute', top: 5}}}
        >
            <DialogTitle sx={{textAlign: 'center'}}>
                <IconButton disableRipple 
                sx={{backgroundColor: "error.light",
                    color: "error.main",
                    '&:hover': {
                        backgroundColor: "error.contrastText",
                        cursor: 'default'
                    },
                    '& .MuiSvgIcon-root': {
                        fontSize: '8rem',
                    }
                }}>
                    <FmdBadIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{
                textAlign: "center"
                }}>
                <Typography variant="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmDialog.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
                <Button
                    variant="contained"
                    color="gray"
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                    >
                    No
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={confirmDialog.onConfirm}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog