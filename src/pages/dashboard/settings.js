import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import { SettingsNotifications } from '../../components/settings/settings-notifications';
import { SettingsPassword } from '../../components/settings/settings-password';

const Page = () => (
  <>
    <Head>
      <title>
        Settings | RDNAKS ICT
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
          Settings
        </Typography>
        <SettingsPassword />
        <Box sx={{ pt: 3 }}>
          <SettingsNotifications />
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
