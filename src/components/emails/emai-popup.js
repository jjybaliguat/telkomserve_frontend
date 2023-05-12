import { Autocomplete, Box, Button, Divider, Grid, IconButton, InputBase, Stack, TextField, Typography, autocompleteClasses, createFilterOptions, styled, useAutocomplete } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check'
import { useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import Notification from '../dialogs/Notification';

const EmailPopup = (props) => {

    const {openPopup, setOpenPopup} = props
    const [minimize, setMinimize] = useState(false)
    const [recipients, setRecepients] = useState([])
    const [customRecipient, setCustomRecipient] = useState('')
    const clients = useSelector(store => store.clients.clients)
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    // useEffect(()=>{
    //     console.log(recipients);
    // },[recipients])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        const emails = [customRecipient]
        recipients.map((item)=>{
            emails.push(item.email)
        })
        const formData = {
            recipients: emails,
            subject: subject,
            message: message
        }
        
        const response = await axios.post('http://localhost:5000/api/v1/send-multiple', formData)
        
        if(response.data.success){
            setLoading(false)
            setNotify({
                isOpen: true,
                message: 'Email sent!',
                type: 'success'
            })
        }
    }

    const handleClose = () => {
        setOpenPopup(false) 
        setMinimize(false)
        setSubject('')
        setMessage('')
        setCustomRecipient('')
        setRecepients([])
    }


  return (
    <>
        <Notification
            notify={notify}
            setNotify={setNotify}
        />
        <Box
            sx={{
                width: {md: "430px", xs:"280px"},
                height: "450px",
                bgcolor: "#fff",
                position: "fixed",
                bottom : `${minimize? "-400px" : "0"}`,
                right: "0",
                zIndex: "9999",
                transform: "translate(-25px)",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                overflow: "hidden",
                display: `${openPopup? "flex" : "none"}`,
                flexDirection: "column",
            }}
            className="container"
        >
            <Box
            sx={{
                height: "50px",
                bgcolor: "#2196f3",
                width: "100%",
                display: "flex",
                color: "#fff",
                alignItems: "center",
            }}
            >
              <Box
                sx={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                }}
              >
                <Typography>New Message</Typography>
                <Stack direction="row">
                    <IconButton
                        onClick={() => setMinimize(!minimize)}
                    >
                        <RemoveIcon sx={{color: "#fff"}} />
                    </IconButton>
                    <IconButton
                        onClick={handleClose}
                    >
                        <CloseIcon sx={{color: "#fff"}}/>
                    </IconButton>
                </Stack>
              </Box>
            </Box>

            <Box
            sx={{
                padding: "10px",
            }}
            >
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <div
                        style={{
                            height: "320px",
                            overflow: "hidden",
                            overflowY: "scroll"
                        }}
                    >
                    <Multiselect
                        displayValue="email"
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={(event)=>{setRecepients(event)}}
                        onSearch={function noRefCheck(){}}
                        onSelect={(event)=>{setRecepients(event)}}
                        options={clients}
                        showCheckbox
                        placeholder="Select Recipients from client"
                        required
                        sx={{
                            height: "200px"
                        }}
                    />

                    <Divider />
                    <InputBase fullWidth sx={{ ml: 1, flex: 1 }} type="text" name="others" value={customRecipient} placeholder='other recipient' onChange={(e) => setCustomRecipient(e.target.value)}  required/>
                    <Divider />
                    <InputBase fullWidth sx={{ ml: 1, flex: 1 }} type="text" name="subject" value={subject} placeholder='Subject' onChange={(e) => setSubject(e.target.value)}  required/>
                    <Divider />
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        fullWidth
                        placeholder='Message'
                        rows={9}
                        value={message}
                        sx={{ ml: 1, flex: 1 }}
                        onChange={(e)=>setMessage(e.target.value)}
                        variant="standard"
                        required
                        />
                    </div>
                    <Grid container
                        sx={{
                            position: "absolute",
                            width: "100%",
                            bottom: "0",
                            padding: "1rem 2rem",
                        }}
                        justifyContent="space-between"
                    >
                        <Grid item>
                            
                        </Grid>
                        <Grid item>
                            <LoadingButton
                                sx={{
                                    marginTop: "5px",
                                    padding: "3px 10px",
                                }}
                                size="small"
                                // type="submit"
                                onClick={(e)=>handleSubmit(e)}
                                endIcon={<SendIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                disabled={(message === '' || subject === '')}
                                >
                                <span>Send</span>
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    </>
  )
}

export default EmailPopup
