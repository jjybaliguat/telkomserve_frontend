import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';

const InstallationStatus = () => {

    const formik = useFormik({
        initialValues: {
            referenceNumber: ''
        },
        validationSchema: Yup.object({
            referenceNumber: Yup
            .string()
            .required('Please reference number')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Please enter a valid reference number')
        }),
        onSubmit: () => {
            alert(formik.values.referenceNumber)
          }
    })
  return (
    <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{padding: "1rem"}} width={{md: "60%", xs: "100%"}}>
          <Typography sx={{ fontSize: "14px", textAlign: "center"}}>Track your installation status. 
          Please enter the reference number that we have sent to your registered email.</Typography>
        </Grid>
        <Grid item width={{md: "40%", xs: "90%"}}>
          <form onSubmit={formik.handleSubmit}>
                <Stack>
                    <TextField
                    error={Boolean(formik.touched.referenceNumber && formik.errors.referenceNumber)}
                    fullWidth
                    helperText={formik.touched.referenceNumber && formik.errors.referenceNumber}
                    label="Reference number"
                    margin="normal"
                    name="referenceNumber"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.referenceNumber}
                    variant="outlined"
                    />
                    <Button
                    variant="contained"
                    type="submit"
                    sx={{padding: "0.5rem 4rem", borderRadius: "24px", marginTop: "1rem"}}
                    disabled={!(formik.isValid)}
                    >SUBMIT</Button>
                </Stack>
            </form>
        </Grid>
    
    </Grid>
  )
}

export default InstallationStatus
