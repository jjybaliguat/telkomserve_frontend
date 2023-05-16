import React from 'react'
import { DashboardLayout } from '../../../components/dashboard-layout';
import { collection } from 'firebase/firestore';
import { db } from '../../../utils/firebase';
import PlansSetting from '../../../components/settings/plan-settings';
import Head from 'next/head';
import { Box, Container } from '@mui/material';

const Page = () => {

  return(
  <>
    <Head>
      <title>
        Plan Setting | RDNAKS ICT
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 3
      }}
    >
      <Container maxWidth={false}>
          <PlansSetting />
      </Container>
    </Box>
  </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;