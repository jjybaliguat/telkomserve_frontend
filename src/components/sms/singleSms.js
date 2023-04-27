import { Box, Button, Card, CardContent, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addMessages, setCreditBalance, setMessages } from '../../redux/smsAction'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import { useRetriveaccountMutation, useRetrivesmsMutation, useSendsmsMutation } from '../../redux/smsSlice'
import Notification from '../dialogs/Notification'

const SingleSms = () => {
    const dispatch = useDispatch()
    const credit_balance = useSelector(store=>store.messages.credit_balance)
    const [retrivesms] = useRetrivesmsMutation()
    const [sendsms] = useSendsmsMutation()
    const [retrieveaccount] = useRetriveaccountMutation()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        message: '',
        recipients: '',
    })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })



    const getMessages = async()  => {
        try {
            const response = await retrivesms()
            dispatch(setMessages(response.data))
        } catch (error) {
            console.log(error);
        }
    }

    const getAccount = async() => {
        try {
            const response = await retrieveaccount()
            if(response.data.credit_balance){
                dispatch(setCreditBalance(response.data.credit_balance))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await sendsms(formData)
            if(response.data){
                response.data.map((data)=>{
                    dispatch(addMessages(data))
                })
                setFormData({
                    message: '',
                    recipients: ''
                })
                setNotify({
                    isOpen: true,
                    message: 'Message Sent!',
                    type: "success"
                })
                setLoading(false)
                setTimeout(()=>{
                    getMessages()
                    getAccount()
                }, 10000)
            }else{
                console.log(response.data);
                setLoading(false)
                setNotify({
                    isOpen: true,
                    message: `An error eccured: ${response.data.message}`,
                    type: "error"
                })
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
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
                            onChange={(e)=>setFormData({...formData, recipients: e.target.value})}
                            value={formData.recipients}
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
                            <Grid item sx={{position: 'relative'}}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        padding: "0.5rem 2rem",
                                    }}
                                    type="submit"
                                    disabled={(loading || credit_balance == 0)}
                                >
                                    Send
                                </Button>
                                {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                    color: "primary",
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                    }}
                                />
                                )}
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
