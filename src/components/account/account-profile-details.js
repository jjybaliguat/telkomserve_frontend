import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, selectCurrentUser, updateUserAction } from '../../redux/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateadminMutation } from '../../redux/authApiSlice';
import { toast } from 'react-toastify';
import Router from 'next/router'

export const AccountProfileDetails = (props) => {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [updateadmin] = useUpdateadminMutation()
  const notifyError = (msg, {...props}) => toast.error(msg, props);
  const notifySuccess = (msg, {...props}) => toast.success(msg, props);
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      photo: user?.photo
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('name is required'),
      email: Yup
        .string().email("Invalid email format")
        .max(255)
        .required('email is required')
    }),
    onSubmit: async () => {
          setIsLoading(true)
          const user = await updateadmin({name: formik.values.name, newEmail: formik.values.email})
          if(!user.error){
            setIsLoading(false)
            dispatch(updateUserAction(user.data))
            notifySuccess("Profile info saved", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
          }else{
            notifyError(`${user.error?.data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
            setIsLoading(false)
          }
  }})

  return (
    <form onSubmit={formik.handleSubmit}
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
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
              md={6}
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
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            type='submit'
            color="primary"
            variant="contained"
            disabled={!formik.isValid}
          >
            {isLoading? 'Saving...' : 'Save details'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};
