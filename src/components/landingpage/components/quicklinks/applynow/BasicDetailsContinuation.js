import { Alert, AlertTitle, Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Select, Stack, TextField, Typography } from '@mui/material'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetApplicantDetails, setAcceptTerm, setActiveStep, setApplicantDetails, setSelectedindex } from '../../../../../redux/landing/quicklinksAction';
import Router from 'next/router';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCheckemailMutation } from '../../../../../redux/authApiSlice';

const BasicDetailsContinuation = () => {
  const dispatch = useDispatch()
  const appllicantDetails = useSelector(store => store.fiber.appllicantDetails)
//   console.log(appllicantDetails);
  const [validated, setValidated] = useState(false)
  const [checkemail] = useCheckemailMutation()
  const [error, setError] = useState(null)

  useEffect(()=>{
  },[])

  // dispatch(resetApplicantDetails())

  const formik = useFormik({
    initialValues: {
      name: appllicantDetails?.name,
      phone: appllicantDetails?.phone,
      email: appllicantDetails?.email,
      nationality: '',
      civilStatus: '',
      fbname: '',
      province: appllicantDetails?.province,
      municipality: appllicantDetails?.municipality,
      brgy: appllicantDetails?.brgy,
      address: '',
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .max(255)
      .required('firstname is required'),
      phone: Yup
      .string()
      .required('phone number is required'),
      email: Yup
      .string().email("invalid email format")
      .max(255)
      .required('email is required'),
      province: Yup
      .string()
      .max(255)
      .required('province is required'),
      municipality: Yup
      .string()
      .max(255)
      .required('municipality is required'),
      brgy: Yup
      .string()
      .max(255)
      .required('barangay is required'),
      address: Yup
      .string()
      .max(255)
      .required('address is required'),
      fbname: Yup
      .string()
      .max(255)
      .required('facebook name is required'),
    }),
    dirty: Yup.boolean,
    // validateOnMount
    onSubmit: async() => {
      const emailExist = await checkemail({email: formik.values?.email})
      if(emailExist.data.exist){
        setError("Email you entered already exist, please try another one")
      }else{
        setError(null)
        dispatch(setApplicantDetails({...formik.values}))
        dispatch(setActiveStep(2))
      }

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
    <Grid container flexDirection="column" alignItems="center" sx={{position: "relative"}}>
        <Button
          sx={{position: "absolute", top: 0, right: 0}}
          disabled={!(formik.values.termsAccepted && formik.isValid)}
          onClick={()=>{
            dispatch(setActiveStep(2));
            formik.handleSubmit
          }}
          endIcon={<ArrowForwardIcon />}
        >
        </Button>
        <Button
          sx={{position: "absolute", top: 0, left: 0}}
          onClick={()=>{
            dispatch(setActiveStep(0));
          }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Grid item sx={{padding: "3rem 1rem", marginBottom: "1rem"}}>
          <Typography sx={{ fontSize: "14px", textAlign: "center"}}>Get the internet that you deserve at affordable prices. 
          Lets start with your basic details.</Typography>
        </Grid>
        <Grid item width={{md: "75%", xs: "100%"}}>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
                <Typography>Personal information</Typography>
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
              <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Mobile number"
                  margin="normal"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.phone}
                  variant="outlined"
                />
              </Stack>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  helperText='optional'
                  label="Nationality"
                  margin="normal"
                  name="nationality"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.nationality}
                  variant="outlined"
                />
              </Stack>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
                <TextField
                  error={Boolean(formik.touched.fbname && formik.errors.fbname)}
                  fullWidth
                  helperText={formik.touched.fbname && formik.errors.fbname}
                  label="Facebook account name"
                  margin="normal"
                  name="fbname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.fbname}
                  variant="outlined"
                />
              </Stack>
              <Typography sx={{marginTop: "1rem"}}>Address information</Typography>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
                <TextField
                  error={Boolean(formik.touched.province && formik.errors.province)}
                  fullWidth
                  helperText={formik.touched.province && formik.errors.province}
                  label="Province"
                  margin="normal"
                  name="province"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.province}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.municipality && formik.errors.municipality)}
                  fullWidth
                  helperText={formik.touched.municipality && formik.errors.municipality}
                  label="Municipality"
                  margin="normal"
                  name="municipality"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.municipality}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.brgy && formik.errors.brgy)}
                  fullWidth
                  helperText={formik.touched.brgy && formik.errors.brgy}
                  label="Barangay"
                  margin="normal"
                  name="brgy"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.brgy}
                  variant="outlined"
                />
              </Stack>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
                <TextField
                  error={Boolean(formik.touched.address && formik.errors.address)}
                  fullWidth
                  helperText={formik.touched.address && formik.errors.address}
                  label="Please type your complete address"
                  margin="normal"
                  name="address"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.address}
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
        <Grid item sx={{padding: "1rem"}} width={{xs: "100%", md: "80%"}}>
          {error &&
          <Alert severity="error">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
          }
        </Grid>
    </Grid>
  )
}

export default BasicDetailsContinuation
