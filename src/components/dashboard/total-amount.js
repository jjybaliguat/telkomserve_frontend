import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NextLink from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from 'react-redux';
import { toCommas } from '../../utils/toCommas';

export const TotalAmount = ({totalAmount, ...others}) => {
  
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
            TOTAL AMOUNT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {toCommas(totalAmount.toFixed(2))}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 40,
              width: 40
            }}
          >
            <AccountBalanceWalletIcon />
          </Avatar>
        </Grid>
      </Grid>
      {/* <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 1
          }}
        >
          <NextLink
            href="/dashboard/transaction-history"
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
          </NextLink>
        </Box> */}
    </CardContent>
  </Card>
  )
}
