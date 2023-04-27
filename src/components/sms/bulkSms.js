import { Box, Button, Card, CardContent, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRetriveaccountMutation, useRetrivesmsMutation, useSendsmsMutation } from '../../redux/smsSlice'
import Notification from '../dialogs/Notification'
import { addMessages, setCreditBalance, setMessages } from '../../redux/smsAction'

const BulkSms = () => {
    const dispatch = useDispatch()
    const credit_balance = useSelector(store=>store.messages.credit_balance)
    const [retrivesms] = useRetrivesmsMutation()
    const [sendsms] = useSendsmsMutation()
    const [retrieveaccount] = useRetriveaccountMutation()
    const [loading, setLoading] = useState(false)
    const [notify, setNotify] = useState({isOpen: '', message: '', type: ''})
    const clients = useSelector(store=>store.clients.clients)
    let recipientsCount = 0
    let recipients = []
    clients.map((client)=>{
        if(client.phone.match('^(09)\\d{9}')){
            recipients.push(client.phone)
            recipientsCount+=1
        }
    })

    const [formData, setFormData] = useState({
        recipients,
        message: ''
    })

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
                    Send to All Client
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
                                <Typography sx={{marginBottom: "1rem"}}>Total recipients: {recipientsCount}</Typography>
                            </Grid>
                            <Grid item sx={{position: 'relative'}}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        padding: "0.5rem 2rem",
                                    }}
                                    type="submit"
                                    disabled={(loading  || credit_balance == 0)}
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

export default BulkSms
