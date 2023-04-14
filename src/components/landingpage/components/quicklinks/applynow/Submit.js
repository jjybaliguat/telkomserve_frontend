import { Alert, Box, Button, CircularProgress, Grid, IconButton, Stack, TextField, Tooltip, Typography, AlertTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep, setApplicantDetails, resetApplicantDetails } from 'src/redux/landing/quicklinksAction';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { storage } from "../../../../../utils/firebase";
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    getStorage,
    deleteObject
  } from "firebase/storage";
import { v4 } from "uuid"
import { useFormik } from 'formik';
import { useResendcodeMutation, useVerifycodeMutation } from 'src/redux/authApiSlice';
import Router from 'next/router'
import Notification from "../../../../../components/dialogs/Notification";

const Submit = () => {
  const dispatch = useDispatch()
  const [resendcode] = useResendcodeMutation()
  const [verifycode] = useVerifycodeMutation()
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const applicantDetails = useSelector(store=>store.fiber?.appllicantDetails)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
        code: ''
    },
    validationSchema: Yup.object({
        code: Yup
        .string()
        .required('Please enter verification code')
    }),
    onSubmit: async() => {
      try {
        const response = await verifycode({email: applicantDetails?.email, code: formik.values.code})
        if(!response.error){
          setSuccess(`${response.data.msg}. Thank you for completing the
          application form, please wait for 1-2 days for the installation process.`)
          setError(null)
          dispatch(resetApplicantDetails())
          setTimeout(()=>{
            window.location.href = "/"
            dispatch(setActiveStep(0))
          }, 10000)
        }else{
          setError(response.error.data.msg)
          setSuccess(null)
        }
      } catch (error) {
        // setError(error.data.message)
        console.log(error);
      }
    }
  })

  const handleSendCode = async() => {
    try {
      setError(null)
      setLoading(true)
      const send = await resendcode({email: applicantDetails?.email})
      setNotify({
        isOpen: true,
        message: "Verification code sent!",
        type: 'success'
    })
    setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  return (
    <>
     <Notification
        notify={notify}
        setNotify={setNotify}
      />
    <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{position: "relative"}}>
        <Button
          sx={{position: "absolute", top: 0, left: 0}}
          onClick={()=>{
            dispatch(setActiveStep(3));
          }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Grid item sx={{padding: "1rem", marginTop: "1rem"}}>
          <Typography sx={{ fontSize: "16px", textAlign: "center", fontWeight: "bold"}}>VERIFY YOUR EMAIL</Typography>
          <Typography sx={{ fontSize: "16px", textAlign: "center", marginTop: "1rem"}}>Please enter the verification
          code that we have sent to</Typography>
          <Typography sx={{ fontSize: "16px", textAlign: "center", fontWeight: "bold"}}>{applicantDetails?.email}</Typography>
        </Grid>
        <Grid item sx={{padding: "1rem", marginTop: "1rem"}} width={{xs: "100%", md: "50%"}}>
          {success &&
          <Alert severity="success">
            <AlertTitle>{success}</AlertTitle>
            Back to —<strong><Button onClick={()=> window.location.href = "/"}>Home</Button></strong>
          </Alert>
          }
          {error &&
          <Alert severity="error">
            <AlertTitle>{error}</AlertTitle>
            Please double check the verification code
          </Alert>
          }
        </Grid>
        <Grid item sx={{padding: "1rem"}} width={{xs: "100%", md: "50%"}}>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
                <TextField
                  error={Boolean(formik.touched.code && formik.errors.code)}
                  fullWidth
                  helperText={formik.touched.code && formik.errors.code}
                  label="Enter verification code"
                  margin="normal"
                  name="code"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.code}
                  variant="outlined"
                />
                <Button 
                variant="contained"
                type="submit"
                sx={{padding: "0.5rem 4rem", borderRadius: "24px"}}
                disabled={!(formik.isValid && !success && !formik.isSubmitting)}
                >
                VERIFY & SUBMIT
                </Button>
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  onClick={()=>handleSendCode()}
                  disabled={success}
                >
                  resend code
                </LoadingButton>
            </Stack>
          </form>
        </Grid>
    </Grid>
    </>
  )
}

export default Submit
