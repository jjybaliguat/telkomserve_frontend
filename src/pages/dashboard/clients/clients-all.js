import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import CustomerListResults from '../../../components/customer/customer-list-results';

const Page = () => (
  <>
    <Head>
      <title>
        Clients | RDNAKS ICT
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
        <Box sx={{ mt: 3 }}>
          <CustomerListResults />
        </Box>
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
