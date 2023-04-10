import { Avatar, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import DescriptionIcon from '@mui/icons-material/Description';

export const PaidInvoices = ({totalPaidInvoices, ...others}) => (
  <Card {...others}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {totalPaidInvoices > 1? "Paid Invoices" : "Paid Invoice"}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {totalPaidInvoices}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 40,
              width: 40
            }}
          >
            <DescriptionIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
