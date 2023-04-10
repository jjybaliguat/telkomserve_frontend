import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetApplicantDetails, setAcceptTerm, setActiveStep, setApplicantDetails, setSelectedindex } from 'src/redux/landing/quicklinksAction';
import Router from 'next/router';

const BasicDetails = () => {
  const dispatch = useDispatch()
  const appllicantDetails = useSelector(store => store.fiber.appllicantDetails)
  const selectedAreaIndex = useSelector(store => store.fiber.selectedAreaIndex)
  const [validated, setValidated] = useState(false)

  // dispatch(resetApplicantDetails())

  const formik = useFormik({
    initialValues: {
      fname: appllicantDetails?.fname,
      lname: appllicantDetails?.lname,
      phone: appllicantDetails?.phone,
      email: appllicantDetails?.email,
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      fname: Yup
      .string()
      .max(255)
      .required('firstname is required'),
      lname: Yup
      .string()
      .max(255)
      .required('lastname is required'),
      phone: Yup
      .string()
      .required('phone number is required'),
      email: Yup
      .string().email("invalid email format")
      .max(255)
      .required('email is required'),
    }),
    dirty: Yup.boolean,
    // validateOnMount
    onSubmit: () => {
      dispatch(setApplicantDetails({...formik.values}))
      if(selectedAreaIndex >= 0){
        dispatch(setActiveStep(1))
      }else{
        dispatch(setActiveStep(0))
      }
      Router.push('/fiber/application-form')
      // console.log(appllicantDetails);
    }
  })

  const handleCapitalize = (e) => {
    const value = e.target.value.toUpperCase()
    formik.values.fname = value
  }

  const handleClickTerm = (e) => {
    if(e.target.checked){
      formik.values.termsAccepted = true
      setValidated(true)
    }else{
      formik.values.termsAccepted = false
      setValidated(false)
    }
  }
  return (
    <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{padding: "1rem"}}>
          <Typography sx={{ fontSize: "14px", textAlign: "center"}}>Get the internet that you deserve at affordable prices. 
          Lets start with your basic details.</Typography>
        </Grid>
        <Grid item width={{md: "75%", xs: "100%"}}>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
              <TextField
                error={Boolean(formik.touched.fname && formik.errors.fname)}
                fullWidth
                helperText={formik.touched.fname && formik.errors.fname}
                label="first name"
                margin="normal"
                name="fname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.fname}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.lname && formik.errors.lname)}
                fullWidth
                helperText={formik.touched.lname && formik.errors.lname}
                label="last name"
                margin="normal"
                name="lname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.lname}
                variant="outlined"
              />
              </Stack>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
                <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="mobile number"
                  margin="normal"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.phone}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
              </Stack>
              <Stack direction={{xs: "column", md: "row"}} gap={5} sx={{marginTop: "1.5rem"}}>
                <FormGroup>
                    <FormControlLabel control={
                    <Checkbox
                    // disabled={!(formik.isValid && formik.dirty)}
                    // checked={formik.values.termsAccepted}
                    onChange={(e) => handleClickTerm(e)}
                    />} 
                    label={<Typography sx={{fontSize: "12px"}}>I agree to the Terms and Conditions,
                        and allow rdnaks to collect my personal details to proceed with the application process.</Typography>} />
                </FormGroup>
                <Button 
                variant="contained"
                type="submit"
                sx={{padding: "0.5rem 4rem", borderRadius: "24px"}}
                disabled={!(formik.values.termsAccepted && formik.isValid)}
                >Continue</Button>
              </Stack>
            </Stack>
          </form>
        </Grid>
    </Grid>
  )
}

export default BasicDetails
