import React, { useEffect } from 'react'
import { Button, Card, CardContent, CardHeader, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { AppBar, Dialog, DialogContent, DialogTitle, IconButton, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close';

function getRandom(length) {
  return `01${Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1))}`;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const AddClientFormDialog = (props) => {
    const {addClient, setOpenPopup, loading, title, children, openPopup, ...others} = props
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          phone: '',
          address: '',
          internetPlan: '',
          dueDate: '',
          installationBalance: '0',
          installationDate: '',
          connectionStatus: 'activated',
          verificationCode: '0',
        },
        validationSchema: Yup.object({
          name: Yup
            .string()
            .max(255)
            .required('firstname is required'),
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
          internetPlan: Yup
            .string()
            .max(255)
            .required('internet plan is required'),
          dueDate: Yup
            .string()
            .max(255)
            .required('due date is required'),
          installationBalance: Yup
            .string()
            .max(255)
            .required('installation balance is required'),
          installationDate: Yup
            .string()
            .max(255)
            .required('installation date is required'),
        }),
        onSubmit: async () => {
          addClient({...formik.values, accountNumber: getRandom(8)}, resetForm)
      }})

      const resetForm = () => formik.handleReset()
    
      return (
        <BootstrapDialog open={openPopup}
      maxWidth="md" onClose={()=>setOpenPopup(false)}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setOpenPopup(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Client
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
                onClick={()=>setOpenPopup(false)}
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
          <form onSubmit={formik.handleSubmit}
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
                      helperText={formik.touched.name && formik.errors.name}
                      label="complete name"
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
                      helperText={formik.touched.email && formik.errors.email}
                      label="email"
                      margin="normal"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="username"
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
                      helperText={formik.touched.phone && formik.errors.phone}
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
                      helperText={formik.touched.address && formik.errors.address}
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
                      <InputLabel id="selectPlan">Select Plan</InputLabel>
                        <Select
                          error={Boolean(formik.touched.internetPlan && formik.errors.internetPlan)}
                          helperText={formik.touched.internetPlan && formik.errors.internetPlan}
                          labelId="selectPlan"
                          id="demo-simple-select"
                          name="internetPlan"
                          margin="normal"
                          value={formik.values.internetPlan}
                          label="Select Plan"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <MenuItem value='699'>Plan699</MenuItem>
                          <MenuItem value='999'>Plan999</MenuItem>
                          <MenuItem value='1299'>Plan1299</MenuItem>
                          <MenuItem value='1499'>Plan1499</MenuItem>
                        </Select>
                      </FormControl>
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                      >
                      <TextField
                          error={Boolean(formik.touched.dueDate && formik.errors.dueDate)}
                          fullWidth
                          helperText={formik.touched.dueDate && formik.errors.dueDate}
                          label="dueDate"
                          margin="normal"
                          name="dueDate"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="number"
                          value={formik.values.dueDate}
                          variant="outlined"
                    />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                          error={Boolean(formik.touched.installationBalance && formik.errors.installationBalance)}
                          fullWidth
                          helperText={formik.touched.installationBalance && formik.errors.installationBalance}
                          label="installationBalance"
                          margin="normal"
                          name="installationBalance"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="number"
                          value={formik.values.installationBalance}
                          variant="outlined"
                    />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                    >
                      <TextField
                          error={Boolean(formik.touched.installationDate && formik.errors.installationDate)}
                          fullWidth
                          helperText={formik.touched.installationDate && formik.errors.installationDate}
                          label="Installation Date"
                          margin="normal"
                          name="installationDate"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="date"
                          value={formik.values.installationDate}
                          variant="outlined"
                    />
                  </Grid>
                </Grid>
          </form>
        </DialogContent>
    </BootstrapDialog>
      )
}

export default AddClientFormDialog
