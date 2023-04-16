import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import Email from '../../../components/emails/email-layout';

const Page = () => (
  <>
    <Head>
      <title>
        Email | RDNAKS ICT
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
            <Email />
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
        {page}
  </DashboardLayout>
);

export default Page;
