import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardContent, CardHeader, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { AppBar, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../utils/firebase'
import Notification from './Notification';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const AddEmmployeeFormDialog = (props) => {
    const {addEmployee, setAddEmployeePopup, loading, title, children, openPopup, ...others} = props
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          phone: '',
          address: '',
          role: '',
          password: '123456789'
        },
        validationSchema: Yup.object({
          name: Yup
            .string()
            .max(255)
            .required('name is required'),
          email: Yup
            .string().email("Invalid email format")
            .max(255)
            .required('email is required'),
          phone: Yup
            .string()
            .max(255)
            .required('phone number is required'),
          address: Yup
            .string()
            .max(255)
            .required('address is required'),
          role: Yup
            .string()
            .max(255)
            .required('role is required'),
        }),
        onSubmit: async () => {
        try {
          await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
          addEmployee(formik.values, resetForm)
        } catch (error) {
          console.log(error);
          setNotify({
            isOpen: true,
            message: error.message,
            type: 'error'
        })
        }
      }})

      const resetForm = () => formik.handleReset()

      const createEmployee = async(e) => {
        e.preventDefault()
        e.preventDefault()
        try {
          const response = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    
      return (
        <>
          <Notification
              notify={notify}
              setNotify={setNotify}
              />
        <BootstrapDialog open={openPopup}
      maxWidth="md" onClose={()=>setAddEmployeePopup(false)}>
        <AppBar sx={{ position: 'relative', backgroundColor: 'primary.main' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setAddEmployeePopup(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Employee
            </Typography>
               <Button
                autoFocus 
                color="inherit"
                onClick={formik.handleSubmit} 
                disabled={!formik.isValid}
                >
                {loading? "Saving..." : "Save"}
              </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle sx={{ m: 0, p: 2 }}>
            <IconButton
                aria-label="close"
                onClick={()=>setAddEmployeePopup(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form onSubmit={(e)=>createEmployee(e)}
            autoComplete="off"
            noValidate
          >
                <Grid
                  container
                  spacing={1}
                >
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(formik.touched.name && formik.errors.name)}
                      fullWidth
                      helpertext={formik.touched.name && formik.errors.name}
                      label="name"
                      margin="normal"
                      name="name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="name"
                      value={formik.values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      fullWidth
                      helpertext={formik.touched.email && formik.errors.email}
                      label="email"
                      margin="normal"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="email"
                      value={formik.values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(formik.touched.phone && formik.errors.phone)}
                      fullWidth
                      helpertext={formik.touched.phone && formik.errors.phone}
                      label="phone"
                      margin="normal"
                      name="phone"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="phone"
                      value={formik.values.phone}
                      variant="outlined"
                    />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                    <TextField
                      error={Boolean(formik.touched.address && formik.errors.address)}
                      fullWidth
                      helpertext={formik.touched.address && formik.errors.address}
                      label="address"
                      margin="normal"
                      name="address"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="address"
                      value={formik.values.address}
                      variant="outlined"
                    />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <FormControl fullWidth>
                      <InputLabel id="role">Select Role</InputLabel>
                        <Select
                          error={Boolean(formik.touched.role && formik.errors.role)}
                          helpertext={formik.touched.role && formik.errors.role}
                          labelId="role"
                          id="demo-simple-select"
                          name="role"
                          margin="normal"
                          value={formik.values.role}
                          label="Select Role"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <MenuItem value='Super Admin'>Super Admin</MenuItem>
                          <MenuItem value='Collector'>Collector</MenuItem>
                          <MenuItem value='Installer'>Installer</MenuItem>
                          <MenuItem value='Encoder'>Encoder</MenuItem>
                        </Select>
                      </FormControl>
                      </Grid>
                </Grid>
          </form>
        </DialogContent>
    </BootstrapDialog>
    </>
      )
}

export default AddEmmployeeFormDialog
