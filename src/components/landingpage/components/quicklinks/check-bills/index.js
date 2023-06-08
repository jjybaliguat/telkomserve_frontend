import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react'
import * as Yup from 'yup';
import { useState } from 'react';
import { KeyOffSharp } from '@mui/icons-material';
import { toCommas } from '../../../../../utils/toCommas'
import axios from 'axios';

let currentOtpIndex = 0

Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}

const CheckBills = () => {
    const inputRef = useRef(null)
    const [accountValid, setAccountValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resendCodeLoading, setResendCodeLoading] = useState(false)
    const [disabledResendCode, setDisabledResendCode] = useState(false)
    const [done, setDone] = useState(false)
    const [checkbillStep, setCheckbillStep] = useState(0)
    const [counter, setCounter] = useState(59)
    const [activeOtpIndex, setActiveOtpIndex] = useState(0)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState(new Array(5).fill(""))
    const [errorMess, setErrorMess] = useState(null)
    const [result, setResult] = useState(null)
    const APP_API = process.env.nodeEnv === "development" ? process.env.DEV_APP_API : process.env.PRODUCTION_APP_API
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
            setErrorMess(null);
            setOtp(new Array(5).fill(""))
            setResult(null)
            try {
              const response = await axios.post(`${APP_API}/client/verify-accnum`, {
                accountNumber: formik.values.accountNumber
              })
              if(response.data){
                const sendOtp = await axios.post(`${APP_API}/client/send-otp`, {
                  email: response.data?.email
                })
                if(sendOtp.data){
                  setEmail(response.data?.email)
                  setAccountValid(true)
                  setCheckbillStep(1)
                }
              }
              setLoading(false)
            } catch (error) {
              setErrorMess(error.response?.data?.message);
              setLoading(false)
            }
            // setTimeout(()=>{
            //   console.log("ok")
            //   setLoading(false)
            //   setAccountValid(true)
            //   setActiveOtpIndex(1)
            // }, 3000)
          }
    })
    const handleChange = (e) => {
      const value = e.target.value
      const newOtp = [...otp]
      newOtp[currentOtpIndex] = value.substring(value.length - 1)
      if(!value){
        setActiveOtpIndex(currentOtpIndex - 1)
      }
      else{
        setActiveOtpIndex(currentOtpIndex + 1)
      }
      setOtp(newOtp)
      }

      const handleOnKeydown = (e, index) => {
        const key = e.key
        currentOtpIndex = index
        if(key === 'Backspace'){
          setActiveOtpIndex(currentOtpIndex - 1)
          // console.log(key);
        }
      }

      useEffect(()=> {
        inputRef.current?.focus()
      }, [activeOtpIndex])

      const handleResendCode = () => {
        setResendCodeLoading(true)
        setTimeout(()=> {
          setResendCodeLoading(false)
          setDisabledResendCode(true)
          setCounter(59)
        }, 3000)
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

      const verifyOtp = async() => {
        setLoading(true)
        setErrorMess(null)
        let newOtp = ''
        otp.map((item)=>newOtp+=item)
        try {
          const response = await axios.post(`${APP_API}/client/checkbills`, {
          otp: newOtp,
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

  return (
    <>
    <Grid container flexDirection="column" alignItems="center"
      sx={{
        position: "relative",
        display: checkbillStep === 0 ? "flex" : "none",
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
        onClick={()=>setCheckbillStep(1)}
        >
          <ArrowForwardIcon />
        </Button>
        <Grid item sx={{padding: "1rem"}} width={{md: "60%", xs: "100%"}}>
          <Typography sx={{ fontSize: "1rem", textAlign: "center"}}>Check your Bills. 
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
                      type="text"
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
        display: checkbillStep === 1 ? "flex" : "none",
        paddingTop: "1.5rem"
      }}
    >
        <Button
        sx={{
          position: "absolute",
          top: "0",
          left: "0"
        }}
        onClick={()=> setCheckbillStep(0)}
        >
          <ArrowBackIcon />
        </Button>
        <Grid item sx={{padding: "1rem"}} width={{md: "60%", xs: "100%"}}>
          <Typography sx={{ fontSize: "14px", textAlign: "center"}}> 
          Please enter the verification code that we have sent to your email {email}.
          </Typography>
        </Grid>
        <Grid item width={{md: "40%", xs: "90%"}}>
            <form>
              <Stack>
                  <Stack direction="row" alignItems="center" justifyContent="center">
                    {otp.map((_, index) => {
                      return(
                        <React.Fragment key={index}>
                        <input
                          ref={index === activeOtpIndex ? inputRef : null}
                          type="number"
                          // variant="outlined"
                          onChange={handleChange}
                          onKeyDown={(e) => handleOnKeydown(e, index)}
                          style={{
                            width: "3.5rem",
                            height: "2.5rem",
                            textAlign: "center", 
                            fontSize: "1.5rem",
                          }}
                          value={otp[index]}
                        />
                        {
                          index === otp.length -1 ? null : (
                            <span
                            style={{
                              fontSize: "2rem",
                              color: "gray",
                              margin: "0 5px"
                            }}
                            >-</span>
                          )
                        }
                        </React.Fragment>
                      )
                    })}
                    </Stack>
                      <Button
                      variant="contained"
                      onClick={verifyOtp}
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
        {result && (
        <Grid item width="100%"
          sx={{
            paddingTop: "1rem",
            paddingBottom: "1rem"
          }}
        >
          <Typography>Result: </Typography>
          {result.length == 0 && (
            <Typography variant="h3" sx={{textAlign: "center"}}>No Data Available</Typography>
          )}
          {
          result.sortBy('dueDate').map((item, index)=>{
            return (
            <Card sx={{ 
              display: 'flex',
              height: "fit-content",
              boxShadow: "0 3px 12px rgb(0 0 0 / 0.2)",
              marginTop: "1rem",
              position: "relative"
              }}
              key={index}
              >
              <Box
              sx={{
                bgcolor: `${item.status === "PAID"? "success.main" : item.status === "PARTIAL"? "warning.main" : "error.main"}`,
                maxWidth: "75px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              >
                <CardContent>
                  <Typography sx={{
                    fontSize: "14px", 
                    color: "#fff",
                    fontWeight: "bold"
                  }}>
                    INVOICE
                  </Typography>
                </CardContent>
              </Box>
              <Box
                sx={{ display: 'flex', 
                flexDirection: 'column',
                justifyContent: "center",
                padding: "0.3rem 0.5rem",
                paddingRight: "4rem"
               }}
              >
                <Typography sx={{fontSize: "16px"}}>{item.items[0].description}</Typography>
                <Stack direction="row" gap={2}>
                  <Typography sx={{fontSize: "14px"}}>
                    Amount: <span>PHP{toCommas(item.total)}</span>
                  </Typography>
                  <Typography sx={{fontSize: "14px"}}>
                    Status: <span
                    style={{
                      color: `${item.status === "PAID"? "#14B8A6" : item.status === "PARTIAL"? "#FFB020" : "#e53935"}`
                    }}
                    >{item.status}</span>
                  </Typography>
                </Stack>
              </Box>
              <Button
              sx={{
                position: "absolute",
                right: "0",
              }}
              onClick={()=>window.open(`/invoice/${item._id}`, "_blank")}
              >
                View
              </Button>
            </Card>
            )
          })
          }
        </Grid>
        )
        }
    </Grid>
    </>
  )
}

export default CheckBills
