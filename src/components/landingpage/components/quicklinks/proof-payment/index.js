import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const ProofPayment = () => {
  const [loading, setLoading] = useState(false)
  const [errorMess, setErrorMess] = useState(null)
  const [done, setDone] = useState(false)

  const formik = useFormik({
    initialValues: {
      accountNumber: '',
      refNumber: '',
      amountPaid: ''
    },
    validationSchema: Yup.object({
      accountNumber: Yup
      .string()
      .min(10, 'Please enter a valid account number')
      .required('Please enter your account number'),
      refNumber: Yup
      .string()
      .max(100)
      .required('Please enter payment reference number'),
      amountPaid: Yup
      .number()
      .required('Please enter amount paid')
    }),
    onSubmit: async() => {
      setErrorMess(null)
      try {
        const response = await axios.post('https://api.rdnaksnds.com/api/v1/client/verify-accnum', {
                accountNumber: formik.values.accountNumber
              })
        if(response.data){
          if(window.confirm("Were working on it. Thank you for your patience.")){
          resetForm()
          }
          // setDone(true)
          // resetForm()
        }
      } catch (error) {
        setErrorMess(error.response?.data?.message);
        setLoading(false)
      }
    }
  })

  const resetForm = () => formik.handleReset()

  return (
    <>
    <Typography sx={{ fontSize: "1rem", textAlign: "center"}}>
      Submit Proof of Payment
    </Typography>
    <Box
      sx={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <Box
        sx={{
          width: {md: "50%", xs: "90%"}
        }}
      >
      <form onSubmit={formik.handleSubmit}>
          {errorMess && (
              <Alert severity="error" sx={{marginTop: "1rem"}}>{errorMess}</Alert>
            )
          }
          {done && (
              <Alert severity="success" variant="filled" sx={{marginTop: "1rem", color: "#fff"}}>Proof of payment submitted!</Alert>
            )
          }
          <TextField
            error={Boolean(formik.touched.accountNumber && formik.errors.accountNumber)}
            helperText={formik.touched.accountNumber && formik.errors.accountNumber}
            fullWidth
            type="text"
            name="accountNumber"
            label="Client Account Number"
            margin="normal"
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />  
          <TextField
            error={Boolean(formik.touched.amountPaid && formik.errors.amountPaid)}
            helperText={formik.touched.amountPaid && formik.errors.amountPaid}
            fullWidth
            type="number"
            name="amountPaid"
            label="Amount Paid"
            margin="normal"
            value={formik.values.amountPaid}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            error={Boolean(formik.touched.refNumber && formik.errors.refNumber)}
            helperText={formik.touched.refNumber && formik.errors.refNumber}
            fullWidth
            type="text"
            name="refNumber"
            label="Reference Number"
            margin="normal"
            value={formik.values.refNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button
            fullWidth
            type="submit"
            variant='contained'
            sx={{
              marginTop: "1rem"
            }}
            disabled={(!(formik.isValid && formik.dirty) || done)}
          >
            Submit
          </Button>
      </form>
      </Box>
    </Box>
    </>
  )
}

export default ProofPayment
