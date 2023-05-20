import { Avatar, Badge, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Head from 'next/head';
import Router from 'next/router'
import { Box } from "@mui/system";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../components/dialogs/Popup";
import Notification from "../../../components/dialogs/Notification";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 35,
  background: theme.palette.background.paper,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const ButtonHover = styled(Button)(({theme}) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}))

const ApplicantDetails = () => {
    const router = useRouter()
    const applicantId = router.query.applicantId
    const applicants = useSelector(store => store.applicants.applicants)
    const [singleClient, setSingleClient] = useState(null)
    const [profile, setProfile] = useState(singleClient?.photo)
    const [imgPreview, setImagePreview] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        if(applicantId){
            const applicant = applicants?.find(applicant => applicant._id === applicantId)
            setSingleClient(applicant)
        }
    }, [])

    const previewImageHandler = (img) => {
      setImagePreview(img)
      setOpenPopup(true)
    }
    // if(client == null){
    //     return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: "100vh"}}>
    //     <CircularProgress size={50}/>
    //   </div>
    // }

    if(!singleClient){
      return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: "100vh"}}>
        <h1>No Applicant Found!</h1>
      </div>
    }


      return(
          <>
          <Popup
            style={{ maxWidth: "100%", height: 'auto' }}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <img
              style={{ maxWidth: "100%", height: 'auto' }}
              src={imgPreview}
              alt="image"
            />
          </Popup>
          <Head>
              <title>
                  Applicant | INFO
              </title>
          </Head>
          <form
            autoComplete="off"
            noValidate
          >
        <Card
            sx={{
                height: "fit-content",
                minHeight: "100vh"
            }}
        >
          <Button sx={{paddingTop: 2}} onClick={() => Router.back()}><ArrowBackIcon /> Back</Button>
          <CardHeader
            sx={{paddingTop: 1}}
            subheader=""
            title="Applicant Info"
          />
          <CardContent>
            <Grid
              container
              sx={{display: "flex", justifyContent: "space-around", mb: 3}}
            >
              <Grid
                item
                md={6}
                sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
              >
                    <Typography>Applicant Id Pic</Typography>
                      <img
                        onClick={() => previewImageHandler(singleClient?.idPic)}
                        height={100}
                        src={singleClient?.idPic}
                        title="Client Home Picture"
                      />
              </Grid>
              <Grid
                item
                md={6}
                sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
              >
                 <Typography>Applicant Home Pic</Typography>
                      <img
                        onClick={() => previewImageHandler(singleClient?.housePic)}
                        height={100}
                        src={singleClient?.housePic}
                        title="Client Home Picture"
                      />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="name"
                  margin="normal"
                  name="name"
                  type="name"
                  value={singleClient?.name}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="accountNumber"
                  margin="normal"
                  name="accountNumber"
                  type="accountNumber"
                  value={singleClient?.accountNumber}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="phone number"
                  margin="normal"
                  name="phone"
                  type="phone"
                  value={singleClient?.phone}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="email"
                  margin="normal"
                  name="email"
                  type="email"
                  value={singleClient?.email}
                  variant="outlined"
                  InputProps={{
                        readOnly: true,
                    }}
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="internetPlan"
                  margin="normal"
                  name="internetPlan"
                  type="internetPlan"
                  value={singleClient?.internetPlan}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="address"
                  margin="normal"
                  name="address"
                  type="email"
                  value={singleClient?.address}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
          </>
      )
   }

export default ApplicantDetails