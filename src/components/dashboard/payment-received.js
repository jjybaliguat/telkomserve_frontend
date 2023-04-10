import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import NextLink from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { toCommas } from 'src/utils/toCommas';
import { useSelector } from 'react-redux';

export const PaymentReceived = ({totalPaid, ...others}) => {


  return(
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
            PAYMENT RECEIVED
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {toCommas(totalPaid.toFixed(2))}
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
            <CreditScoreIcon />
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
          {/* <NextLink
            href="/dashboard/clients/transaction-history"
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
              View transactions
            </Button>
          </NextLink> */}
        </Box>
    </CardContent>
  </Card>
  )
}
