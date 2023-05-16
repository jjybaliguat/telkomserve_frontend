import { Alert, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Button } from 'react-scroll'
import * as Yup from 'yup'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SOA = () => {
    const [loading, setLoading] = useState(false)
    const [soaStep, setSoaStep] = useState(0)
    const [errorMess, setErrorMess] = useState(null)

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
            alert("ksdnubn")
          }
    })

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
    </>
  )
}

export default SOA
