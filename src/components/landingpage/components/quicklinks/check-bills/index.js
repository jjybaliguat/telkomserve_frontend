import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from 'yup';

const CheckBills = () => {

    const formik = useFormik({
        initialValues: {
            accountNumber: ''
        },
        validationSchema: Yup.object({
            accountNumber: Yup
            .string()
            .required('Please enter your account number')
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Please enter a valid account number')
        }),
        onSubmit: () => {
            alert(formik.values.accountNumber)
          }
    })
  return (
    <Grid container flexDirection="column" alignItems="center">
        <Grid item sx={{padding: "1rem"}} width={{md: "60%", xs: "100%"}}>
          <Typography sx={{ fontSize: "14px", textAlign: "center"}}>Check your Bills. 
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
                    disabled={!(formik.isValid)}
                    >SUBMIT</Button>
                </Stack>
            </form>
        </Grid>
    
    </Grid>
  )
}

export default CheckBills
