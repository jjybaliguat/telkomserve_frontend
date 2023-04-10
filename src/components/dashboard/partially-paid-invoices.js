import { Avatar, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import DescriptionIcon from '@mui/icons-material/Description';

export const PartiallyPaidInvoices = ({total, ...others}) => (
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
            {total > 1? "Partially Paid Invoices" : "Partially Paid Invoice"}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {total}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
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
