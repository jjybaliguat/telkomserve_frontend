import React from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import SingleSms from '../../../components/sms/singleSms';
import Head from 'next/head';
import BulkSms from '../../../components/sms/bulkSms';
import RecentMesages from '../../../components/sms/recentMesages';

const Page = () => (
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
                    <Typography
                    variant="h4"
                    >
                    Recent Messages
                    </Typography>
                    <Divider sx={{marginTop: "1rem"}}/>
                    <Grid
                        item
                        md={12}
                    >
                        <RecentMesages />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
)

Page.getLayout = (page) => (
    <DashboardLayout>
          {page}
    </DashboardLayout>
  );
  
  export default Page;