import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NextLink from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { toCommas } from '../../utils/toCommas';

export const PendingAmount = ({pendingAmount, ...others}) => (
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
            PENDING AMOUNT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {toCommas(pendingAmount.toFixed(2))}
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
            <AccessTimeIcon />
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
);
