import React, { useState } from 'react'
import { Box, Button, Card, CardContent, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRetrivesmsMutation } from '../../redux/smsSlice';
import { setMessages } from '../../redux/smsAction';
import Empty from '../svgIcons/Empty';
import dayjs from 'dayjs'

Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? -1 : (a[p] < b[p]) ? 1 : 0;
    });
}

const RecentMesages = () => {
    const dispatch = useDispatch()
    const [retrivesms] = useRetrivesmsMutation()
    const messages = useSelector(store=>store.messages.messages)

    useEffect(()=> {
        getMessages()
    }, [])

    const getMessages = async()  => {
        try {
            const response = await retrivesms()
            if(response.data){
                dispatch(setMessages(response.data))
            }
        } catch (error) {
            console.log(error);
        }

    }

    if(!messages.length){
        return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <Empty />
        <p style={{padding: '40px', color: 'gray'}}>No recent messages available.</p>
      </div>
    }

  return (
    <>
    <Card>
        <CardContent>
            <Box
                sx={{padding: "1rem"}}
            >
                <TableContainer sx={{ maxHeight: 440 }}>
                    <PerfectScrollbar>
                        <Table 
                        stickyHeader 
                        aria-label="sticky table"
                        size='small'
                        >
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
                                {
                                    messages?.sortBy('created_at').map((message)=>
                                    (
                                        <TableRow
                                            hover
                                            key={message?.message_id}
                                        >
                                            <TableCell>
                                                {message?.recipient}
                                            </TableCell>
                                            <Tooltip 
                                            title={message?.message.length > 36 ? message.message : ''}
                                            placement="top-end"
                                            arrow
                                            >
                                                <TableCell 
                                                style={{
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                    width: "300px",
                                                    display: "block",
                                                    overflow: "hidden"
                                                }}
                                                >
                                                    {message?.message}
                                                </TableCell>
                                            </Tooltip>
                                            <TableCell>
                                                {message?.status}
                                            </TableCell>
                                            <TableCell>
                                                {message?.network}
                                            </TableCell>
                                            <TableCell>
                                                {message?.type}
                                            </TableCell>
                                            <TableCell>
                                                {dayjs(message?.created_at).format("MMMM D, YYYY h:mm A")}
                                            </TableCell>
                                        </TableRow>
                                    )
                                    )
                                }
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
