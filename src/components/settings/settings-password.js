import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateadminMutation } from '../../redux/authApiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateUserAction } from '../../redux/authSlice';

export const SettingsPassword = (props) => {
  const dispatch = useDispatch()
  const [updateadmin] = useUpdateadminMutation()
  const notifyError = (msg, {...props}) => toast.error(msg, props);
  const notifySuccess = (msg, {...props}) => toast.success(msg, props);
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      currentpassword: '',
      newpassword: '',
      confirm: ''
    },
    validationSchema: Yup.object({
        currentpassword: Yup
          .string()
          .max(255)
          .required('Current password is required'),
        newpassword: Yup
          .string()
          .max(255)
          .required('Password is required'),
        confirm: Yup
          .string()
          .required('Please retype your password.')
          .oneOf([Yup.ref('newpassword')], 'Passwords must match')
    }),
    onSubmit: async () => {
        setIsLoading(true)
        const user = await updateadmin({password: formik.values.newpassword, currentPass: formik.values.currentpassword})
        if(!user.error){
          setIsLoading(false)
          notifySuccess("New Password Set!", {
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
          console.log(user);
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
    <form {...props} onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            error={Boolean(formik.touched.currentpassword && formik.errors.currentpassword)}
            helperText={formik.touched.currentpassword && formik.errors.currentpassword}
            fullWidth
            label="Current Password"
            margin="normal"
            name="currentpassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            value={formik.values.currentpassword}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.newpassword && formik.errors.newpassword)}
            helperText={formik.touched.newpassword && formik.errors.newpassword}
            fullWidth
            label="Password"
            margin="normal"
            name="newpassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            value={formik.values.newpassword}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.confirm && formik.errors.confirm)}
            helperText={formik.touched.confirm && formik.errors.confirm}
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            value={formik.values.confirm}
            variant="outlined"
          />
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
            color="primary"
            variant="contained"
            type='submit'
          >
            {isLoading? 'Updating' : 'Update'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};
