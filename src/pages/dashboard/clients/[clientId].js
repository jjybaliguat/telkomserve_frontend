import { Avatar, Badge, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useGetsingleclientsMutation, useUpdateclientMutation, useUpdateclientPhotoMutation } from "../../../redux/authApiSlice"
import Head from 'next/head';
import Router from 'next/router'
import { Box } from "@mui/system";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { setSingleClient, updateClientAction } from "../../../redux/clientSlice";
import { format } from "date-fns";
import Popup from "../../../components/dialogs/Popup";
import Notification from "../../../components/dialogs/Notification";
// import FileBase64 from 'react-file-base64';
import setFileToBase from "../../../utils/setToBase64";
import axios from "axios";
import { storage } from "../../../utils/firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL
  } from "firebase/storage";
import { v4 } from "uuid"

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

const ClientDetails = () => {
    const dispatch = useDispatch()
    const [updateclient] = useUpdateclientMutation()
    // const [updateclientPhoto] = useUpdateclientPhotoMutation()
    const router = useRouter()
    const clientId = router.query.clientId
    const clients = useSelector(store => store.clients.clients)
    const singleClient = clients.find(client => client._id === clientId)
    const client = useSelector(store => store.clients.singleClient)
    const [profile, setProfile] = useState(client?.photo)
    const [uploadProfile, setUploadProfile] = useState(null)
    const [uploadHomePic, setUploadHomePic] = useState(null)
    const [homePic, setHomePic] = useState(client?.homePic)
    const [imgPreview, setImagePreview] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [photoChanged, setPhotoChanged] = useState(false)
    const [homePicChanged, setHomePicChanged] = useState(false)
    const [uploadPhotoLoading, setUploadPhotoLoading] = useState(false)
    const [uploadHomePicLoading, setUploadHomePicLoading] = useState(false)
    const [updatingInfoLoading, setUpdatingInfoLoading] = useState(false)
    

    if(clientId){
      dispatch(setSingleClient(singleClient))
    }

    const formik = useFormik({
        initialValues: {
          name: client?.name,
          accountNumber: client?.accountNumber,
          phone: client?.phone,
          email: client?.email,
          address: client?.address,
          photo: client?.photo,
          connectionStatus: client?.connectionStatus,
          dueDate: client?.dueDate,
          homePic: client?.homePic,
          idPic: client?.idPic,
          installationBalance: client?.installationBalance,
          installationDate: client?.installationDate,
          internetPlan: client?.internetPlan,
        },
        validationSchema: Yup.object({
          name: Yup
            .string()
            .max(255)
            .required('name is required'),
          phone: Yup
            .string()
            .max(20)
            .min(3)
            .required('phone number is required'),
          email: Yup
            .string().email("Invalid email format")
            .max(255)
            .required('email is required')
        }),
        onSubmit: async () => {
          // console.log(formik.values);
          setUpdatingInfoLoading(true)
          try {
            const update = await updateclient({id: client._id, data: formik.values})
              setUpdatingInfoLoading(false)
              setNotify({
                isOpen: true,
                message: "Client updated successfully",
                type: 'success'
              })
          } catch (error) {
            console.log(error);
            setNotify({
              isOpen: true,
              message: "Failed",
              type: 'error'
            })
          }
        }
     })

     const handleSubmitPhoto = () => {
        try {
          if (uploadProfile == null) return;

          setUploadPhotoLoading(true)
          const imageRef = ref(storage, `img/profilepic/${uploadProfile.name + v4()}`)
           uploadBytes(imageRef, uploadProfile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              const updateProfile = async () => {
                try {
                  const data = await updateclient({id: client._id, data: {photo: url}})
                  // dispatch(setSingleClient(data.data))
                  console.log(data);
                  setPhotoChanged(false)
                  setUploadPhotoLoading(false)
                  setProfile(url)
                  setNotify({
                    isOpen: true,
                    message: "Client Photo updated successfully",
                    type: 'success'
                })
                setProfile(url)
                } catch (error) {
                  console.log(error);
                  setNotify({
                    isOpen: true,
                    message: "Failed",
                    type: 'error'
                })
                }
              }
              updateProfile()
            });
          })
        } catch (error) {
            setNotify({
              isOpen: true,
              message: "Failed",
              type: 'error'
          })
          console.log(error)
        }
     }
     const handleSubmitHomePic = () => {
        try {
          if (uploadHomePic == null) return;

          setUploadHomePicLoading(true)
          const imageRef = ref(storage, `img/homepic/${uploadHomePic.name + v4()}`)
           uploadBytes(imageRef, uploadHomePic).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              const updateProfile = async () => {
                try {
                  const data = await updateclient({id: client._id, data: {homePic: url}})
                  // dispatch(setSingleClient(data.data))
                  console.log(data);
                  setHomePicChanged(false)
                  setUploadHomePicLoading(false)
                  setHomePic(url)
                  setNotify({
                    isOpen: true,
                    message: "Client Home Picture updated successfully",
                    type: 'success'
                })
                setHomePic(url)
                } catch (error) {
                  console.log(error);
                  setNotify({
                    isOpen: true,
                    message: "Failed",
                    type: 'error'
                })
                }
              }
              updateProfile()
            });
          })
        } catch (error) {
            setNotify({
              isOpen: true,
              message: "Failed",
              type: 'error'
          })
          console.log(error)
        }
     }
      
     const onProfileChange = (e) => {
      setPhotoChanged(true)
      const file = e.target.files[0]
        if(file.size > 10000000){
          alert("File is too big!");
          setPhotoChanged(false)
      }else{
        const img = URL.createObjectURL(file)
        setProfile(img)
        setUploadProfile(file)
        setPhotoChanged(true)
      }
      }

     const onHomePicChange = (e) => {
      setHomePicChanged(true)
      const file = e.target.files[0]
        if(file.size > 10000000){
          alert("File is too big!");
          setHomePicChanged(false)
      }else{
        const img = URL.createObjectURL(file)
        setHomePic(img)
        setUploadHomePic(file)
        setHomePicChanged(true)
      }
      }

        const TransformFileData = (file) => {
          const reader = new FileReader();
      
          if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              setProfile(reader.result);
              formik.values.photo = reader.result
              console.log(reader.result);
            }
          } else {
            setProfile("");
          }
        }


      // const file = e.target.files[0]
      // if(file){
      //   const newProfile = URL.createObjectURL(file)
      //   formik.values.photo = newProfile
      //   setProfile(newProfile)
      // }

    const previewImageHandler = (img) => {
      setImagePreview(img)
      setOpenPopup(true)
    }
    // if(client == null){
    //     return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: "100vh"}}>
    //     <CircularProgress size={50}/>
    //   </div>
    // }

    if(!client){
      return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: "100vh"}}>
        <h1>No Client Found!</h1>
      </div>
    }


      return(
          <>
          <Notification
            notify={notify}
            setNotify={setNotify}
          />
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
                  Clients | INFO
              </title>
          </Head>
          <form
            autoComplete="off"
            noValidate
          >
        <Card>
          <Button sx={{paddingTop: 2}} onClick={() => Router.push('/dashboard')}><ArrowBackIcon /> Back</Button>
          <CardHeader
            sx={{paddingTop: 1}}
            subheader="The information can be edited"
            title="Client Info"
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
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <SmallAvatar>
                          <ButtonHover
                          >
                            <label htmlFor='photo-upload'>
                              <CameraAltIcon />
                            </label>
                          </ButtonHover>
                      </SmallAvatar>
                    }
                  >
                  <Avatar
                    onClick={() => previewImageHandler(profile)}
                    src={profile}
                    sx={{
                      height: 100,
                      width: 100,
                    }}
                  />
                  </Badge>
                  {/* <FileBase64
                    id='photo-upload'
                    variant="outlined"
                    name="photo"
                    multiple={ false }
                    accept='.jpeg, .png, .jpg'
                    sx={{display: 'none'}}
                    onDone={(base64) => onProfileChange(base64)} /> */}
                    <Button 
                    onClick={handleSubmitPhoto}
                    disabled={!photoChanged}
                    >
                      {uploadPhotoLoading? 'Saving...' : 'Save'}
                    </Button>
                <TextField
                  type='file'
                  name="photo"
                  onChange={(e) => onProfileChange(e)}
                  required
                  id='photo-upload'
                  variant="outlined"
                  accept='.jpeg, .png, .jpg'
                  sx={{display: 'none'}}
              />
              </Grid>
              <Grid
                item
                md={6}
                sx={{display: "flex", flexDirection: "column", alignItems: "center"}}
              >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <SmallAvatar>
                          <Button
                            color="primary"
                          >
                            <label htmlFor='home-upload'>
                              <CameraAltIcon />
                            </label>
                          </Button>
                      </SmallAvatar>
                    }
                  >
                      <img
                        onClick={() => previewImageHandler(homePic)}
                        height={100}
                        src={homePic}
                        title="Client Home Picture"
                      />
                    {/* <Avatar 
                      alt="Client home Pic" 
                      src={formik.values.homePic} 
                      sx={{
                        height: 100,
                        width: 100,
                      }}
                      /> */}
                  </Badge>
                  <Button 
                    onClick={handleSubmitHomePic}
                    disabled={!homePicChanged}
                    >
                      {uploadHomePicLoading? 'Saving...' : 'Save'}
                    </Button>
                <TextField
                type='file'
                name="homePic"
                onChange={onHomePicChange}
                required
                id='home-upload'
                variant="outlined"
                accept='.jpeg, .png, .jpg'
                sx={{display: 'none'}}
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
                md={3}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.accountNumber && formik.errors.accountNumber)}
                  fullWidth
                  helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                  label="accountNumber"
                  margin="normal"
                  name="accountNumber"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="accountNumber"
                  value={formik.values.accountNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="phone number"
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
                md={3}
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
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.internetPlan && formik.errors.internetPlan)}
                  fullWidth
                  helperText={formik.touched.internetPlan && formik.errors.internetPlan}
                  label="internetPlan"
                  margin="normal"
                  name="internetPlan"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="internetPlan"
                  value={formik.values.internetPlan}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
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
                  type="email"
                  value={formik.values.address}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
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
                  type="dueDate"
                  value={formik.values.dueDate}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <FormControl fullWidth>
                  <InputLabel id="sortBy">Connection Status</InputLabel>
                    <Select
                      labelId="sortBy"
                      id="demo-simple-select"
                      value={formik.values.connectionStatus}
                      label="Age"
                      name="connectionStatus"
                      onChange={formik.handleChange}
                    >
                      <MenuItem  value='activated'>activated</MenuItem>
                      <MenuItem value='disconnected'>disconnected</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                md={3}
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
                  type="installationBalance"
                  value={formik.values.installationBalance}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.installationDate && formik.errors.installationDate)}
                  fullWidth
                  helperText={formik.touched.installationDate && formik.errors.installationDate}
                  label="installationDate (MM-dd-yyyy)"
                  margin="normal"
                  name="installationDate"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="installationDate"
                  value={format(new Date(), "MM-dd-yyyy")}
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
              onClick={formik.handleSubmit}
              color="primary"
              variant="contained"
            >
              {updatingInfoLoading? 'Updating...' : 'Update Info'}
            </Button>
          </Box>
        </Card>
      </form>
          </>
      )
   }

export default ClientDetails