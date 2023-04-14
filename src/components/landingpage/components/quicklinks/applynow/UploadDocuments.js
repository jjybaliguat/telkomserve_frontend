import { Box, Button, CircularProgress, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep, setApplicantDetails } from 'src/redux/landing/quicklinksAction';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import { storage } from "../../../../../utils/firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    getStorage,
    deleteObject
  } from "firebase/storage";
import { v4 } from "uuid"
import { useRegisterclientMutation } from 'src/redux/authApiSlice';

const UploadDocuments = () => {
  const dispatch = useDispatch()
  const appllicantDetails = useSelector(store=>store.fiber.appllicantDetails)
  const [registerclient] = useRegisterclientMutation()
  const idpic = useSelector(store => store.fiber.appllicantDetails?.idpic)
  const housePic = useSelector(store => store.fiber.appllicantDetails?.housePic)
  const storage = getStorage();
  const [uploadingId, setUploadingId] = useState(false)
  const [uploadingHouse, setUploadingHouse] = useState(false)
  const [idFilename, setIdFilename] = useState("No selected file")
  const [housePicFilename, setHousePicFilename] = useState("No selected file")

  const handleIdpicChange = (e) => {
    const files = e.target.files[0]
    files && setIdFilename(files.name)

    if(idpic){
      const idRef = ref(storage, idpic)

      deleteObject(idRef).then(() => {
        setIdPic(null)
      }).catch((error) => {
        console.log(error);
      });
    }
    if(files){
          setUploadingId(true)
          const imageRef = ref(storage, `img/idpic/${files.name + v4()}`)
           uploadBytes(imageRef, files).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              dispatch(setApplicantDetails({idpic: url}))
              setUploadingId(false)
            });
          })
    }
  }
  const handleRemoveIdPic = () => {
    const idRef = ref(storage, idpic)

    deleteObject(idRef).then(() => {
      setIdFilename('No selected file')
      dispatch(setApplicantDetails({idpic: null}))
    }).catch((error) => {
      console.log(error);
    });
  }
  const handleRemoveHousePic = () => {
    const houseRef = ref(storage, housePic)

    deleteObject(houseRef).then(() => {
      setHousePicFilename('No selected file')
      dispatch(setApplicantDetails({housePic: null}))
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleHousepicChange = (e) => {
    const files = e.target.files[0]
    files && setHousePicFilename(files.name)

    if(housePic){
      const idRef = ref(storage, housePic)

      deleteObject(idRef).then(() => {
        dispatch(setApplicantDetails({housePic: null}))
      }).catch((error) => {
        console.log(error);
      });
    }
    if(files){
      setUploadingHouse(true)
          const imageRef = ref(storage, `img/homepic/${files.name + v4()}`)
           uploadBytes(imageRef, files).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              dispatch(setApplicantDetails({housePic: url}))
              setUploadingHouse(false)
            });
          })
    }
  }

  const handleSubmit = async() => {
    dispatch(setApplicantDetails({idpic, housePic}))
    dispatch(setActiveStep(4))

    const response = await registerclient({...appllicantDetails})
    console.log(response);
  }


  return (
    <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{position: "relative"}}>
      <Button
          sx={{position: "absolute", top: 0, right: 0}}
          disabled={!idpic}
          onClick={()=>{
            handleSubmit()
          }}
          endIcon={<ArrowForwardIcon />}
        >
        </Button>
        <Button
          sx={{position: "absolute", top: 0, left: 0}}
          onClick={()=>{
            dispatch(setActiveStep(2));
          }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Grid item sx={{padding: "1rem", marginTop: "1rem"}}>
          <Typography sx={{ fontSize: "16px", textAlign: "center", fontWeight: "bold"}}>PLEASE UPLOAD REQUIRED DOCUMENTS</Typography>
        </Grid>
        <Grid item sx={{padding: "1rem", marginTop: "1rem"}} width="100%">
          <form>
            <Stack direction={{md: "row", xs: "column"}} gap={5} justifyContent="center" alignItems="center">
              <Stack>
                <Typography sx={{ fontSize: "16px", textAlign: "center"}}>UPLOAD A VALID ID</Typography>
                <div className='upload_file_container' onClick={()=>document.querySelector('.upload_input1').click()}>
                  <input type="file" accept='image/*' 
                  className="upload_input1"
                  hidden
                  onChange={(e) => {
                    handleIdpicChange(e)
                  }}
                  />
                  {
                    idpic ?
                    <img src={idpic} width="90%" height="90%" alt={idFilename}/>
                    :
                    uploadingId ?
                    <CircularProgress />
                    :
                    <>
                    <CloudUploadIcon color="primary" fontSize="large" />
                    <p>Select file</p>
                    </>
                  }
                </div>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{backgroundColor: "gray.light", height: "50px"}}>
                  <span style={{display: "flex", alignItems: "center"}}>
                  <ImageIcon />
                  {idFilename.slice(0, 22)}
                  </span>
                  <span>
                    <Tooltip title="Remove" placement="top">
                      <IconButton onClick={()=> handleRemoveIdPic()}
                        disabled={idpic? "" : "true"}
                      >
                        <DeleteIcon fontSize='small'/>
                      </IconButton>
                    </Tooltip>
                  </span>
                </Stack>
              </Stack>
              <Stack>
                <Typography sx={{ fontSize: "16px", textAlign: "center"}}>UPLOAD A PICTURE OF YOUR HOUSE</Typography>
                <div className='upload_file_container' onClick={()=>document.querySelector('.upload_input2').click()}>
                  <input type="file" accept='image/*' 
                  className="upload_input2"
                  hidden
                  onChange={(e) => handleHousepicChange(e)}
                  />
                  {
                    housePic ?
                    <img src={housePic} width="90%" height="90%" alt={housePicFilename}/>
                    :
                    uploadingHouse ?
                    <CircularProgress />
                    :
                    <>
                    <CloudUploadIcon color="primary" fontSize="large" />
                    <p>Select file</p>
                    </>
                  }
                </div>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{backgroundColor: "gray.light", height: "50px"}}>
                  <span style={{display: "flex", alignItems: "center"}}>
                  <ImageIcon />
                  {housePicFilename.slice(0, 22)}
                  </span>
                  <span>
                    <Tooltip title="Remove" placement="top">
                      <IconButton onClick={()=> handleRemoveHousePic()}>
                        <DeleteIcon fontSize='small'/>
                      </IconButton>
                    </Tooltip>
                  </span>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Grid>
        <Grid item sx={{padding: "1rem", marginTop: "1rem"}}>
          <Stack direction="row" alignItems="center" gap={3}>
            <Typography sx={{ fontSize: "14px", textAlign: "center"}}>Please double check before you continue</Typography>
            <Button 
              variant="contained"
              onClick={()=>handleSubmit()}
              sx={{padding: "0.5rem 4rem", borderRadius: "24px"}}
              disabled={!(idpic && housePic)}
              >
              Continue
              </Button>
          </Stack>
        </Grid>
    </Grid>
  )
}

export default UploadDocuments
