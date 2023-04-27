import React from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout';
import { Alert, Box, CircularProgress, Container, Divider, Grid, Typography } from '@mui/material';
import SingleSms from '../../../components/sms/singleSms';
import Head from 'next/head';
import BulkSms from '../../../components/sms/bulkSms';
import RecentMesages from '../../../components/sms/recentMesages';
import { useRetriveaccountMutation } from '../../../redux/smsSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreditBalance } from '../../../redux/smsAction';
import { selectCurrentUser } from '../../../redux/authSlice';

const Page = () => {
    const user = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const [retrieveaccount] = useRetriveaccountMutation()
    const credit_balance = useSelector(store=>store.messages.credit_balance)

    useEffect(()=> {
        getAccount()
    }, [])

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

if((user?.role === "Super Admin" || user?.role === "Encoder")){
    return (
    <>
        <Head>
        <title>
            SMS | RDNAKS ICT
        </title>
        </Head>
        <Box
        component="main"
        sx={{
            flexGrow: 1,
            py: 3
        }}
        >
            <Container maxWidth="lg">
                <Typography
                sx={{ mb: 3 }}
                variant="h4"
                >
                SMS
                </Typography>
                {credit_balance == 0 &&
                    <Alert 
                    variant="filled"
                    severity="error"
                    sx={{
                        padding: "1rem",
                        marginBottom: "1rem"
                    }}
                    >
                    You have no remaining credit balance. Login to your <a href="https://semaphore.co">
                    semaphore.co</a> account and purchase some sms credits!</Alert>
                }
                <p>
                    Credit Balance: {credit_balance}
                </p>
                
                <Grid container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <SingleSms />
                    </Grid>
                    <Grid 
                        item
                        lg={6}
                        md={6}
                        xs={12}
                    >
                        <BulkSms />
                    </Grid>
                </Grid>
                <Grid container
                    sx={{marginTop: "2rem"}}
                >
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <Typography
                        variant="h4"
                        >
                        Recent Messages
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={12}
                        xs={12}
                    >
                        <RecentMesages />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
    )
}else{
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',height: "100vh", flexDirection: 'column'}}>
        <img src="/assets/errors/error-401.png" height={300} />
        <p style={{padding: '40px', color: 'gray'}}>Sorry, you are not allowed to access this resource!</p>
      </div>
  }
}

Page.getLayout = (page) => (
    <DashboardLayout>
          {page}
    </DashboardLayout>
  );
  
  export default Page;