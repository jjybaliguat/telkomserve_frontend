import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import { InvoiceListResult } from '../../../components/invoices/invoice-list-result';
import { EmployeeListResult } from '../../../components/employees/employee-list-result';

const Page = () => (
  <>
    <Head>
      <title>
        Employees | RDNAKS ICT
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
        <Box>
          <EmployeeListResult />
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
