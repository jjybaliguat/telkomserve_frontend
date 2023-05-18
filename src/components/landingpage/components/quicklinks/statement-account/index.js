import { Alert, Box, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';

const StatementOfAccount = () => {
    const [loading, setLoading] = useState(false)
    const [soaStep, setSoaStep] = useState(0)
    const [errorMess, setErrorMess] = useState(null)
    const [accountValid, setAccountValid] = useState(false)
    const [resendCodeLoading, setResendCodeLoading] = useState(false)
    const [disabledResendCode, setDisabledResendCode] = useState(false)
    const [counter, setCounter] = useState(59)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState(null)
    const [result, setResult] = useState(null)
    const [done, setDone] = useState(false)

    const formik = useFormik({
        initialValues: {
            accountNumber: ''
        },
        validationSchema: Yup.object({
            accountNumber: Yup
            .string()
            .min(10, 'Please enter a valid account number')
            .required('Please enter your account number')
        }),
        onSubmit: async() => {
            setLoading(true)
            setDone(false)
            setOtp(null)
            setResult(null)
            setErrorMess(null);
            try {
                const response = await axios.post(`${process.env.PRODUCTION_APP_API}/client/verify-accnum`, {
                  accountNumber: formik.values.accountNumber
                })
                if(response.data){
                  const sendOtp = await axios.post(`${process.env.PRODUCTION_APP_API}/client/send-otp`, {
                    email: response.data?.email
                  })
                  if(sendOtp.data){
                    setEmail(response.data?.email)
                    setAccountValid(true)
                    setSoaStep(1)
                  }
                }
                setLoading(false)
              } catch (error) {
                setErrorMess(error.response?.data?.message);
                setLoading(false)
              }
          }
    })

    const verifyOtp = async(e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMess(null)
        try {
          const response = await axios.post(`${process.env.PRODUCTION_APP_API}/client/checkbills`, {
          otp: otp,
          accountNumber: formik.values.accountNumber
        })

        setResult(response.data);
        setDone(true)
        setLoading(false)
        } catch (error) {
          setErrorMess(error.response?.data.message)
          setLoading(false)
        }
      }

      const handleResendCode = async() => {
        setResendCodeLoading(true)
        await axios.post(`${process.env.PRODUCTION_APP_API}/client/send-otp`, {
            email: email
          })
        setTimeout(()=> {
          setResendCodeLoading(false)
          setDisabledResendCode(true)
          setCounter(59)
        }, 3000)
      }

      const downloadSoa = async() => {
        try {
          const response = await axios.post(`${process.env.PRODUCTION_APP_API}/client/generate-pdf`, {data: result}, { responseType: 'blob' })
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
          saveAs(pdfBlob, `${formik.values.accountNumber}-soa.pdf`)
        } catch (error) {
          console.log(error);
        }

      }

      useEffect(()=> {
        const interval = 
        setInterval(()=>
        {
          if(counter > 0){
          setCounter(counter - 1)
          }else{
            setDisabledResendCode(false)
          }
        }, 1000)
        return () => clearInterval(interval)
      }, [counter])

  return (
    <>
        <Grid container flexDirection="column" alignItems="center"
        sx={{
            position: "relative",
            display: soaStep === 0 ? "flex" : "none",
            paddingTop: "1.5rem"
        }}
        >
            <Button
            sx={{
            position: "absolute",
            top: "0",
            right: "0"
            }}
            disabled={!(formik.isValid && formik.dirty && accountValid)}
            onClick={()=>setSoaStep(1)}
            >
            <ArrowForwardIcon />
            </Button>
            <Grid item sx={{padding: "1rem"}} width={{md: "60%", xs: "100%"}}>
            <Typography sx={{ fontSize: "14px", textAlign: "center"}}>Get Statement Of Account. 
            Please enter your account number.</Typography>
            </Grid>
            <Grid item width={{md: "40%", xs: "90%"}}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack>
                        <TextField
                        error={Boolean(formik.touched.accountNumber && formik.errors.accountNumber)}
                        helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                        label="10 digit Account Number"
                        margin="normal"
                        name="accountNumber"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="string"
                        value={formik.values.accountNumber}
                        variant="outlined"
                        />
                        <Button
                        variant="contained"
                        type="submit"
                        sx={{padding: "0.5rem 4rem", borderRadius: "24px", marginTop: "1rem"}}
                        disabled={!(formik.isValid && formik.dirty && !loading)}
                        >PROCEED
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                color: "primary",
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                                }}
                            />
                            )}
                        </Button>
                        {errorMess && (
                            <Alert severity="error" sx={{marginTop: "1rem"}}>{errorMess}</Alert>
                        )
                        }
                    </Stack>
                </form>
            </Grid>
        </Grid>
        {/* Verify Email */}

        <Grid container flexDirection="column" alignItems="center"
        sx={{
            position: "relative",
            display: soaStep === 1 ? "flex" : "none",
            paddingTop: "1.5rem"
        }}
        >
        <Button
        sx={{
          position: "absolute",
          top: "0",
          left: "0"
        }}
        onClick={()=> setSoaStep(0)}
        >
          <ArrowBackIcon />
        </Button>
        <Grid item sx={{padding: "1rem"}} width={{md: "60%", xs: "100%"}}>
          <Typography sx={{ fontSize: "14px", textAlign: "center"}}> 
          Please enter the verification code that we have sent to your email {email}.
          </Typography>
        </Grid>
        <Grid item width={{md: "40%", xs: "90%"}}>
            <form onSubmit={(e)=>verifyOtp(e)}>
              <Stack>
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    <TextField
                    label="Enter Verification Code"
                    name="otp"
                    type="number"
                    onChange={(e)=>setOtp(e.target.value)}
                    value={otp}
                    required
                    />
                    </Stack>
                      <Button
                      variant="contained"
                      type="submit"
                      sx={{padding: "0.5rem 4rem", borderRadius: "24px", marginTop: "1rem"}}
                      disabled={(done || loading)}
                      >SUBMIT
                      {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                            color: "primary",
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                            }}
                        />
                        )}
                      </Button>
                      <Button
                        disabled={(resendCodeLoading || disabledResendCode || done)}
                        onClick={handleResendCode}
                      >
                        resend code {disabledResendCode? `in ${counter}` : ''}
                        {resendCodeLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                            color: "primary",
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                            }}
                        />
                        )}
                      </Button>
                      {errorMess && (
                        <Alert severity="error">{errorMess}</Alert>
                      )
                      }
                  </Stack>
            </form>
        </Grid>
        {
          result && (
            <Box>
              <Typography sx={{marginBottom: "1rem"}}>Result: </Typography>
              <Button
              variant="outlined"
              onClick={downloadSoa}
              >Click here to download your statement of account</Button>
            </Box>
          )
        }
    </Grid>
    </>
  )
}

export default StatementOfAccount
