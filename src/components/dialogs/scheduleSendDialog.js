import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const ScheduleSendDialog = (props) => {
    const {openSendScheduleDialog, setOpenScheduleDialog, dateScheduled, setDateScheduled, onScheduled} = props

    const handleClose = () => setOpenScheduleDialog(false)

  return (
    <Dialog open={openSendScheduleDialog} onClose={()=>handleClose}>
        <DialogTitle>Please select Scheduled Date</DialogTitle>
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                label="Select Date and Time"
                onChange={(newValue)=> {setDateScheduled(newValue)}}
                renderInput={
                    (params)=> <TextField {...params} 
                    onChange={(e)=>setDateScheduled(e.target.value)}
                    />
                }
                value={dateScheduled? dateScheduled : new Date()}
                />
            </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>onScheduled(e)}>Schedule</Button>
        </DialogActions>
      </Dialog>
  )
}

export default ScheduleSendDialog
