import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../../icons/facebook';
import { Google as GoogleIcon } from '../../icons/google';
import { useState, useEffect } from 'react';
// import { useSession, signIn, signOut } from "next-auth/react"
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from '../../redux/authSlice';
import { useLoginMutation } from '../../redux/authApiSlice'
import Notification from '../../components/dialogs/Notification';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../utils/firebase';


const Login = () => {
  const [login] = useLoginMutation()
  const [errorMess, setErrorMessage] = useState(null)
  const dispatch = useDispatch()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const logged_in = useSelector(store => store.auth.logged_in)

  useEffect(() => {
    if(logged_in){
      window.location.href = "/dashboard"
    }else{
      Router.push("/admin")
    }
  }, [])



  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .max(255)
        .required('email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async () => {
      try {
        // await signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
        const user = await login(formik.values).unwrap()
        dispatch(setUserAction({...user}))
        setNotify({
          isOpen: true,
          message: 'Login successful',
          type: 'success'
        })
        window.location.href = '/dashboard'
        setErrorMessage('')
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message)
        // setNotify({
        //   isOpen: true,
        //   message: error.message,
        //   type: 'error'
        // })
        Router.push('/admin')
      }
  }})

  return (
    <>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <Head>
        <title>Login | RDNAKS ICT</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Back to Home
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in to RDNAKS
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              {errorMess &&
                <Alert
                sx={{
                  color: '#fff'
                }}
                variant='filled'
                severity='error'
                >
                  {errorMess}
                </Alert>
              }
            </Box>
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
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                // onClick={formik.handleSubmit}
              >
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
    )
}

export default Login
