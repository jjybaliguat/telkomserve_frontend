import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addMessages, setMessages } from '../../redux/smsAction'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { useRetrivesmsMutation } from '../../redux/smsSlice'
import Notification from '../dialogs/Notification'

const SingleSms = () => {
    const dispatch = useDispatch()
    const [recipient, setRecipient] = useState('')
    const [retrivesms] = useRetrivesmsMutation()
    const [formData, setFormData] = useState({
        message: '',
        recipient: '',
    })
    const [message, setMessage] = useState('')
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const getMessages = async()  => {
        try {
            const response = await retrivesms()
            dispatch(setMessages(response.data))
        } catch (error) {
            console.log(error);
        }
    }

    const getSmsAccount = async() => {
        try {
            const response = await retrivesms()
            dispatch(setMessages(response.data))
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/messages`, formData)
            if(response.data){
                dispatch(addMessages(response.data[0]))
                setFormData({
                    message: '',
                    recipient: ''
                })
                setNotify({
                    isOpen: true,
                    message: 'Message Sent!',
                    type: "success"
                })
                setTimeout(()=>{
                    getMessages()
                }, 10000)
            }
        } catch (error) {
            console.log(error)
            setNotify({
                isOpen: true,
                message: 'Something went wrong. Please try again!',
                type: "error"
            })
        }
    }


  return (
    <>
        <Notification
            notify={notify}
            setNotify={setNotify}
        />
        <Card>
            <CardContent>
                <Typography
                variant="h5"
                >
                Compose Single Mesage
                </Typography>
                <Divider sx={{marginTop: "1rem"}}/>
                <Box
                    sx={{padding: "1rem"}}
                >
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <TextField
                            fullWidth
                            label="Recipient"
                            name="recipient"
                            required
                            onChange={(e)=>setFormData({...formData, recipient: e.target.value})}
                            value={formData.recipient}
                        />
                        <TextField
                        id="standard-multiline-static"
                        multiline
                        name="message"
                        fullWidth
                        placeholder='Message'
                        rows={5}
                        value={formData.message}
                        sx={{ ml: 1, flex: 1, marginTop: "0.5rem" }}
                        onChange={(e)=>setFormData({...formData, message: e.target.value})}
                        variant="standard"
                        required
                        />
                        <Grid 
                            container
                            justifyContent= "space-between"
                            sx={{marginTop: "1rem"}}
                        >
                            <Grid item>
                                
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    sx={{
                                        padding: "0.5rem 2rem",
                                    }}
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </CardContent>
        </Card>
    </>
  )
}

export default SingleSms
