import { Alert, AlertTitle, Avatar, Box, Button, CircularProgress, Collapse, Container, Grid, List, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Title from '../../components/Title'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Contact = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: Yup.object({
            name: Yup
            .string()
            .min(3, "name must be atleast 3 characters")
            .max(255)
            .required("name is required"),
            email: Yup
            .string().email("invalid email format")
            .max(255)
            .required("email is required"),
            subject: Yup
            .string()
            .max(255)
            .required("subject is required"),
            message: Yup
            .string()
            .max(255)
            .required("message is required"),
        }),
        onSubmit: async() => {
            setLoading(true)
            setSuccess(null)
            setError(null)
            try {
                const response = await axios.post('https://api.rdnaksnds.com/api/v1/client/send-message', formik.values)
                if(response.data){
                    setSuccess(response?.data?.msg)
                    setLoading(false)
                    formik.values.name = ''
                    formik.values.email = ''
                    formik.values.subject = ''
                    formik.values.message = ''
                }else{
                    setLoading(false)
                    setError("Something went wrong! Please try again later.")
                }
            } catch (error) {
                setLoading(false)
                setError("Something went wrong! Please try again later.")
                console.log(error);
            }
        }
    })

  return (
    <>
    <Container id="contact"
          sx={{
            color: "#fff",
            marginTop: "3rem",
            height: 'fit-content',
          }}
        >
          <Title variant={{ xs: "h3", md: "h2" }} sx={{ mb: { xs: 5, md: 8 }}}>
            Contact Us
          </Title>
          <Typography variant="h4" sx={{letterSpacing: "0.05em"}}>If you have questions in mind, don&apos;t hesitate to contact us.</Typography>
          <Grid container
            sx={{
                marginTop: "3rem"
            }}
          >
            <Grid item
            xs={12}
            md={6}
            >
                <Box
                    sx={{
                        height: "100%",
                        position: "relative",
                        p: 4,
                        borderRadius: "30px",
                        "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "30px",
                        border: "1px solid transparent",
                        background: "linear-gradient(120deg,#5f5f61,transparent) border-box",
                        WebkitMask:
                            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exlude",
                        },
                    }}
                    >
                        <Box 
                        sx={{
                            position: "relative"
                        }}
                        >
                            <Stack gap={5}>
                                <Stack direction="row" gap={2}
                                alignItems="center"
                                >
                                    <Avatar
                                    sx={{
                                        bgcolor: "primary.main",
                                    }}
                                    >
                                        <LocationOnIcon />
                                    </Avatar>
                                    <Stack gap={1}>
                                        <Typography variant="h4">Location</Typography>
                                        <Typography>Block 156 lot 23 Southville 8B</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" gap={2}
                                alignItems="center"
                                >
                                    <Avatar
                                    sx={{
                                        bgcolor: "primary.main",
                                    }}
                                    >
                                        <LocationOnIcon />
                                    </Avatar>
                                    <Stack gap={1}>
                                        <Typography variant="h4">Email</Typography>
                                        <Typography>renalyndabalos24@gmail.com</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" gap={2}
                                alignItems="center"
                                >
                                    <Avatar
                                    sx={{
                                        bgcolor: "primary.main",
                                    }}
                                    >
                                        <LocationOnIcon />
                                    </Avatar>
                                    <Stack gap={1}>
                                        <Typography variant="h4">Phone</Typography>
                                        <Typography>09308127173 / 09267609934</Typography>
                                    </Stack>
                                </Stack>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d784.9720719802945!2d121.14621465574075!3d14.75241814381432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397a547e6e46c89%3A0x26c244987c25bfc0!2sRdnaks%20Network%20And%20Data%20Solution!5e1!3m2!1sfil!2sph!4v1683289289919!5m2!1sfil!2sph" 
                                    width="100%" 
                                    height="200" 
                                    style={{border: "0"}} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                >
                                </iframe>
                            </Stack>
                        </Box>
                </Box>
            </Grid>
            <Grid item
            xs={12}
            md={6}
            >
                <Box
                    sx={{
                        height: "100%",
                        position: "relative",
                        p: 4,
                        borderRadius: "30px",
                        "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        borderRadius: "30px",
                        border: "1px solid transparent",
                        background: "linear-gradient(120deg,#5f5f61,transparent) border-box",
                        WebkitMask:
                            "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exlude",
                        },
                    }}
                    >
                        <Box 
                        sx={{
                            position: "relative"
                        }}
                        >
                            <form onSubmit={formik.handleSubmit}>
                                <Stack gap={3}>
                                    <Stack direction={{md: "row", xs: "column"}} gap={1}>
                                        <TextField
                                        error={Boolean(formik.touched.name && formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        fullWidth
                                        name="name"
                                        value={formik.values.name}
                                        label="Your name"
                                        onChange={formik.handleChange}
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ style: { color: 'white' } }}
                                        />
                                        <TextField
                                        error={Boolean(formik.touched.email && formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        fullWidth
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        label="Your email"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ style: { color: 'white' } }}
                                        />
                                    </Stack>
                                    <Stack gap={2}>
                                        <TextField
                                        error={Boolean(formik.touched.subject && formik.errors.subject)}
                                        helperText={formik.touched.subject && formik.errors.subject}
                                        fullWidth
                                        name="subject"
                                        value={formik.values.subject}
                                        onChange={formik.handleChange}
                                        label="Subject"
                                        InputLabelProps={{ shrink: true }}
                                        inputProps={{ style: { color: 'white' } }}
                                        />
                                        <TextField
                                        error={Boolean(formik.touched.message && formik.errors.message)}
                                        helperText={formik.touched.message && formik.errors.message}
                                        id="standard-multiline-static"
                                        label="Message"
                                        InputLabelProps={{ shrink: true }}
                                        multiline
                                        fullWidth
                                        name="message"
                                        value={formik.values.message}
                                        rows={8}
                                        onChange={formik.handleChange}
                                        variant="outlined"
                                        inputProps={{ style: { color: 'white' } }}
                                        />
                                        <Grid
                                            container
                                            justifyContent= "space-between"
                                            sx={{marginTop: "1rem"}}
                                            gap={1}
                                        >
                                            <Grid item width={{xs: "100%", md: "65%"}}>
                                                {success &&
                                                <Alert 
                                                severity="success"
                                                variant="filled"
                                                >
                                                    <AlertTitle>{success}</AlertTitle>
                                                </Alert>
                                                }
                                                {error &&
                                                <Alert 
                                                severity="error"
                                                variant="filled"
                                                >
                                                    <AlertTitle>{error}</AlertTitle>
                                                </Alert>
                                                }
                                            </Grid>
                                            <Grid item sx={{position: 'relative'}}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        padding: "0.5rem 2rem",
                                                    }}
                                                    type="submit"
                                                >
                                                    {loading ? 'Sending...' : 'Send Message'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Stack>
                            </form>
                        </Box>
                </Box>
            </Grid>
          </Grid>
    </Container>
    </>
  )
}

export default Contact
