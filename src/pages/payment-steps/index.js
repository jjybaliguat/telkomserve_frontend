import { Box, Button, Container, Divider, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import Footer from '../../components/landingpage/components/Footer'

const SlantDiv1 = styled('div')({
    height: "100vh",
    width: "30%",
    backgroundColor: "#2c387e",
})
const SlantDiv2 = styled('div')({
    height: "100vh",
    width: "70%",
    backgroundColor: "#2196f3",
    borderLeft: "190px solid #2c387e",
    borderBottom: "620px solid transparent",
    boxSizing: "border-box"
})

const PaymentSteps = () => {
  return (
    <>
    <Box
        sx={{
            height: "fit-content",
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            bgcolor: "#2c387e",
            position: "relative"
        }}
    >
        <SlantDiv1 />
        <SlantDiv2 />
        <Box
            sx={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                width: "100%",
                height: "100vh",
                padding: {md: "0 1rem", xs: "0 0.5rem"}
            }}
        >
            <Stack direction={{md: "row", xs: "column"}} alignItems='center' gap={{md: 10, xs: 8}}>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                >
                    <Typography sx={{textAlign: "center", fontWeight: "800", fontSize: {md: "4rem", xs: "2rem"}}}
                    >PAY YOUR BILLS</Typography>
                    <Typography sx={{textAlign: "center", fontWeight: "700", fontSize: {md: "2rem", xs: "18px"}}}
                    >SCAN QR CODE TO PAY</Typography>
                    <Button
                        sx={{
                            marginTop: "1rem",
                            boxShadow: "0 7px 20px 5px #2c387e"
                        }}
                        variant="contained"
                        color="primary"
                    >
                        View Steps
                    </Button>
                </Box>
                <img 
                src="/static/images/gcashQr.png" 
                alt='gcash Qr Code'
                style={{
                    borderRadius: "22px",
                    boxShadow: "0 7px 20px 5px #2c387e"
                }}
                />
            </Stack>
        </Box>
        <Box 
            sx={{
            position: "absolute",
            left: "2rem",
            bottom: "2rem",
        }}
        >
            <Stack gap={3}>
                <Stack direction="row" gap={3}>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                </Stack>
                <Stack direction="row" gap={3}>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                </Stack>
                <Stack direction="row" gap={3}>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                    <Box
                        sx={{
                            height: "12px",
                            width: "12px",
                            bgcolor: "#fff",
                            borderRadius: "50%"
                        }}
                    ></Box>
                </Stack>
            </Stack>
        </Box>
    </Box>
    {/* <Footer /> */}
    </>
  )
}

export default PaymentSteps
