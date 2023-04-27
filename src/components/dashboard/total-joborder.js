import { Avatar, Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux';
import NextLink from 'next/link';

export const TotalJobOrders = (props) => {
    const joborders = useSelector(store => store.joborders.jobOrders)

  return(
    <Card {...props}>
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
              JOB ORDERS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {joborders?.length}
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
              <PeopleIcon />
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
              href="/dashboard/job-orders"
              passHref
            >
              <Button
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
  )
}
