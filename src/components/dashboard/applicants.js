import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';

export const Applicants = (props) => {
  const count = useSelector(store => store.applicants.count)

  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
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
            Applicants
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {count}
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
              href="/dashboard/applicants"
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
  )
}
