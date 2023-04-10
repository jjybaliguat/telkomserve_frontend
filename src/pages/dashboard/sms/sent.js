import Head from 'next/head';
import { Box, Container } from '@mui/material';
import CustomerListResults from '../../../components/customer/customer-list-results';
import { DashboardLayout } from '../../../components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>
        Clients | RDNAKS
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ mt: 3 }}>
          <CustomerListResults customers={customers} />
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
