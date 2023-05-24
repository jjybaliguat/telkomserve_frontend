import { Box, Link, Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box
    sx={{
        bgcolor: "primary.main",
        height: "fit-content",
        padding: "2rem 0",
        color: "#fff",
        display: {md: "flex", xs: "grid"},
        alignItems: "center",
        justifyContent: "space-around",
        gap: 5
    }}
    >
        <Typography>Powered By: <img src="/static/images/pt-t-Logo.jpg" height={40}/></Typography>
        <Stack direction="row" gap={2} alignItems="center">
            <Link href="/fiber/privacy-policy"
              passHref
            ><a
            style={{color: "#fff"}}
            >
            Privacy Policy
            </a></Link>
            <Typography>|</Typography>
            <Link href="/fiber/terms-condition"
              passHref
            ><a target="_blank" rel="noopener noreferrer"
            style={{color: "#fff"}}
            >
            Terms & Conditions
            </a></Link>
        </Stack>
        <Typography>Copyright @ RDNAKSNDS 2023 </Typography>
    </Box>
  )
}

export default Footer
