import { Avatar, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import DescriptionIcon from '@mui/icons-material/Description';

export const OverdueInvoices = ({total, ...others}) => (
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
            {total > 1? "Overdue Invoices" : "Overdue Invoice"}
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
              backgroundColor: 'error.main',
              height: 40,
              width: 40
            }}
          >
            <DescriptionIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 1
          }}
        >
          <NextLink
            href="/dashboard/invoices"
            passHref
          >
            <Button
              // component="a"
              startIcon={<ArrowForwardIcon />}
              disableRipple
              sx={{
                fontWeight: 'fontWeightBold',
                fontSize: '12px'
              }}
            >
              Click here to view
            </Button>
          </NextLink>
        </Box>
    </CardContent>
  </Card>
);
