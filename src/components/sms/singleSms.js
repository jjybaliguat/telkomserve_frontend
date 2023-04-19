import { Box, Button, Card, CardContent, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

const SingleSms = () => {
    const [recipient, setRecipient] = useState('')
    const [message, setMessage] = useState('')

  return (
    <>
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
                    <form>
                        <TextField
                            fullWidth
                            label="Recipient"
                            name="recipient"
                            required
                            onChange={(e)=>setRecipient(e.target.value)}
                            value={recipient}
                        />
                        <TextField
                        id="standard-multiline-static"
                        multiline
                        name="message"
                        fullWidth
                        placeholder='Message'
                        rows={5}
                        value={message}
                        sx={{ ml: 1, flex: 1, marginTop: "0.5rem" }}
                        onChange={(e)=>setMessage(e.target.value)}
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
