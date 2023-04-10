import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Select, Stack, TextField, Typography } from '@mui/material'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetApplicantDetails, setAcceptTerm, setActiveStep, setApplicantDetails, setSelectedindex } from 'src/redux/landing/quicklinksAction';
import Router from 'next/router';

const BasicDetailsContinuation = () => {
  const dispatch = useDispatch()
  const appllicantDetails = useSelector(store => store.fiber.appllicantDetails)
//   console.log(appllicantDetails);
  const [validated, setValidated] = useState(false)

  // dispatch(resetApplicantDetails())

  const formik = useFormik({
    initialValues: {
      fname: appllicantDetails?.fname? appllicantDetails?.fname : '',
      lname: appllicantDetails?.lname? appllicantDetails?.lname : '',
      phone: appllicantDetails?.phone? appllicantDetails?.phone : '',
      email: appllicantDetails?.email? appllicantDetails?.email : '',
      nationality: '',
      civilStatus: '',
      province: appllicantDetails?.province? appllicantDetails?.province : '',
      municipality: appllicantDetails?.municipality? appllicantDetails?.municipality : '',
      brgy: appllicantDetails?.brgy? appllicantDetails?.brgy : '',
      address: '',
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
    }),
    dirty: Yup.boolean,
    // validateOnMount
    onSubmit: () => {
    //   dispatch(setApplicantDetails({...formik.values}))
      dispatch(setActiveStep(2))
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
        <Grid item sx={{padding: "1rem", marginBottom: "1rem"}}>
          <Typography sx={{ fontSize: "14px", textAlign: "center"}}>Get the internet that you deserve at affordable prices. 
          Lets start with your basic details.</Typography>
        </Grid>
        <Grid item width={{md: "75%", xs: "100%"}}>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
                <Typography>Personal information</Typography>
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
              </Stack>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
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
                <TextField
                  fullWidth
                  helperText='optional'
                  label="nationality"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.nationality}
                  variant="outlined"
                />
                <Autocomplete
                options={['Single', 'Married']}
                fullWidth
                renderInput={(params) => <TextField {...params} 
                margin="normal" 
                label="civil status"
                name="civilStatus"
                helperText='optional'
                />}
                onChange={(event, value) => formik.values.civilStatus = value}
                />
              </Stack>
              <Typography>Address information</Typography>
              <Stack direction={{xs: "column", md: "row"}} gap={2}>
                <TextField
                  error={Boolean(formik.touched.province && formik.errors.province)}
                  fullWidth
                  helperText={formik.touched.province && formik.errors.province}
                  label="province"
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
                  label="municipality"
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
                  label="barangay"
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
                  label="please type your complete address"
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
                disabled={!(formik.values.termsAccepted && formik.isValid)}
                >Continue</Button>
              </Stack>
            </Stack>
          </form>
        </Grid>
    </Grid>
  )
}

export default BasicDetailsContinuation
