import React from 'react'
import { Box, Button, Card, CardContent, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect } from 'react';
import axios from 'axios';

const RecentMesages = () => {
    const API_KEY = process.env.SMS_API_KEY

    useEffect(()=> {
        getMessages()
    }, [])

    const getMessages = ()  => {
        const response = axios.get(`https://api.semaphore.co/api/v4/messages?apikey=${API_KEY}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(response);
    }

  return (
    <>
    <Card>
        <CardContent>
            <Box
                sx={{padding: "1rem"}}
            >
                <TableContainer>
                    <PerfectScrollbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        RECIPIENT
                                    </TableCell>
                                    <TableCell>
                                        MESSAGE
                                    </TableCell>
                                    <TableCell>
                                        STATUS
                                    </TableCell>
                                    <TableCell>
                                        NETWORK
                                    </TableCell>
                                    <TableCell>
                                        TYPE
                                    </TableCell>
                                    <TableCell>
                                        DATE
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                            </TableBody>
                        </Table>
                    </PerfectScrollbar>
                </TableContainer>
            </Box>
        </CardContent>
    </Card>
    </>
  )
}

export default RecentMesages
