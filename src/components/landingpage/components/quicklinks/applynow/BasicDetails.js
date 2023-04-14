import { Alert, AlertTitle, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetApplicantDetails, setAcceptTerm, setActiveStep, setApplicantDetails, setSelectedindex } from 'src/redux/landing/quicklinksAction';
import Router from 'next/router';
import { useCheckemailMutation } from 'src/redux/authApiSlice';

const BasicDetails = () => {
  const dispatch = useDispatch()
  const appllicantDetails = useSelector(store => store.fiber.appllicantDetails)
  const selectedAreaIndex = useSelector(store => store.fiber.selectedAreaIndex)
  const [validated, setValidated] = useState(false)
  const [checkemail] = useCheckemailMutation()
  const [error, setError] = useState(null)

  // dispatch(resetApplicantDetails())

  const formik = useFormik({
    initialValues: {
      name: appllicantDetails?.name,
      phone: appllicantDetails?.phone,
      email: appllicantDetails?.email,
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .max(255)
      .required('complete name is required'),
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
    onSubmit: async() => {
      const emailExist = await checkemail({email: formik.values?.email})

      if(emailExist){
        if(emailExist.data.exist){
          setError("Email you entered already exist, please try another one")
        }else{
          setError(null)
          dispatch(setApplicantDetails({...formik.values}))
          if(selectedAreaIndex >= 0){
            dispatch(setActiveStep(1))
          }else{
            dispatch(setActiveStep(0))
          }
          Router.push('/fiber/application-form')
        }
      }
      // console.log(appllicantDetails);
    }
  })

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
        <Grid item sx={{padding: "1rem", marginTop: "1rem"}} width={{xs: "100%", md: "50%"}}>
          {error &&
          <Alert severity="error">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
          }
        </Grid>
        <Grid item width={{md: "75%", xs: "100%"}}>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Complete name"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
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
                  type="text"
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
                disabled={!(formik.values.termsAccepted && formik.isValid && !formik.isSubmitting)}
                >Continue</Button>
              </Stack>
            </Stack>
          </form>
        </Grid>
    </Grid>
  )
}

export default BasicDetails
