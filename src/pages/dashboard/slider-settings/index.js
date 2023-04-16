import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Container, Grid, IconButton, InputBase, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Router from 'next/router'
import { collection, query, where, getDocs, onSnapshot, doc, updateDoc, serverTimestamp, deleteDoc, setDoc, orderBy } from "firebase/firestore"
import { db, storage } from '../../../utils/firebase';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog';
import Notification from '../../../components/dialogs/Notification';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const SiteSettings = () => {
  const collectionRef = collection(db, "adds")
  const APP_URL = process.env.nodeEnv === "development" ? process.env.DEV_APP_URL : process.env.APP_URL
  const [images, setImages] = useState(null)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [slider, setSlider] = useState({
    name: "",
    url: null,
  })
  const [uploading, setUploading] = useState(false)

  const handleAddSlider = async(e) => {
    e.preventDefault()
    try {
      const newSlider = {
        ...slider,
        id: v4(),
        date: serverTimestamp()
      }

      const sliderRef = doc(collectionRef, newSlider.id)
      await setDoc(sliderRef, newSlider)

      setSlider({
        name: "",
        url: null,
      })
    } catch (error) {
      console.log(error);
    }
}

 const handleDelete = async(id, url) => {
    try {
      const urlRef = ref(storage, url)
      deleteObject(urlRef)
      
      const picRef = doc(collectionRef, id)
      await deleteDoc(picRef)
      setConfirmDialog({
        isOpen: false,
    })
    setNotify({
      isOpen: true,
      message: 'Slider Deleted Successfully',
      type: 'success'
    })
    } catch (error) {
      console.log(error)
    }
}

const handleImageChange = (e) => {
  const files = e.target.files[0]
  if(files){
    setUploading(true)
    setSlider({...slider, url: null})
        const imageRef = ref(storage, `img/ads/${files.name + v4()}`)
         uploadBytes(imageRef, files).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setSlider({...slider, url: url})
            setUploading(false)
          });
        })
  }
}

  useEffect(()=> {
    getImages()
}, [])

  const getImages = () => {
    const images = query(collection(db, "adds"), orderBy("date"))

    const Snapshot = onSnapshot(images, (snapshot) => {
      const items = []
      snapshot.forEach((doc)=>{
        items.push({id: doc.id, data: doc.data()})
      })
      setImages(items)
    })
    return () => {
      Snapshot()
    }
  }

  const handleChange =(index, e) => {
    const values = [...images]
    values[index][e.target.name] = e.target.value
    setImages({...images, values})
  }

  return (
    <>
    <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
       <Notification
        notify={notify}
        setNotify={setNotify}
       />
    <Box sx={{paddingTop: "1rem", paddingBottom: "2rem", width: "100%", display: "flex", justifyContent: "center"}}>
      <Container>
        <Button 
        onClick={() => Router.back()}
        startIcon={<ArrowBackIcon />}
        >
          Back to Dashboard
        </Button>
        <Box sx={{padding: "1rem", display: "flex", justifyContent: "center"}}>
              <Typography variant="h3" sx={{textAlign: "center"}}>Image Slider Section Settings</Typography>
        </Box>
        <Grid container flexDirection={{xs: "column-reverse", md: "row"}}>
          <Grid item md={8} xs={12} sx={{display: "flex", flexWrap: "wrap", width: "100%", marginTop: {xs: "2rem", md: "0"}}} gap={3}>
            {
                images?.map((item) => (
                    <Card key={item.id} sx={{ width: "200px", borderRadius: "10px", padding: "1rem", position: "relative", paddingBottom: "2rem", height: "300px"}}>
                      <CardHeader
                          title={item.data.name}
                          sx={{padding: "1rem"}}
                          subheader={item.data.date !== "" ? item.data.date?.toDate().toDateString() : ""}
                        />
                        <CardMedia
                        component="img"
                        height="150"
                        image={item.data.url}
                      />
                      <CardActions disableSpacing sx={{backgroundColor: "#fff"}}>
                        <IconButton aria-label="delete image"
                        onClick={()=> {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure yo want to delete this Slider?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => { handleDelete(item.id, item.data.url) }
                        })
                        }}
                        color="error"
                        sx={{position: "absolute", bottom: "0", right: "0", transform: "translate(-20px, -10px)"}}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                ))
            }
            </Grid>
            <Grid item md={4} xs={12} width="100%">
                <Box className="container" sx={{width: "100%", height: "fit-content"}}>
                  <form style={{position: "relative"}} onSubmit={handleAddSlider}>
                  <Card sx={{ width: "100%", height: "430px", borderRadius: "10px", paddingBottom: "2rem"}}>
                      <CardHeader
                          title={<TextField
                            fullWidth
                            label="Slider name"
                            margin="normal"
                            required
                            sx={{ ml: 1, flex: 1 }} type="text" name="name" onChange={e => setSlider({...slider, name: e.target.value})} value={slider.name}/>}
                        />
                        <CardContent sx={{padding: "0 1rem"}}>
                        <div className="upload_file_container"
                        onClick={()=>document.querySelector('.upload_input').click()}
                        >
                            <input type="file" accept='image/*' 
                              className="upload_input"
                              hidden
                              required
                              onChange={(e) => handleImageChange(e)}
                              />
                              {
                                slider.url ?
                                <img src={slider.url} width="90%" height="90%"/>
                                :
                                uploading ?
                                <CircularProgress />
                                :
                                <>
                                <CloudUploadIcon color="primary" fontSize="large" />
                                <p>Select file</p>
                                </>
                              }
                          </div>
                        </CardContent>
                      <CardActions disableSpacing sx={{backgroundColor: "#fff"}}>
                          <Button
                            type="submit"
                            variant='contained'
                            sx={{position: "absolute", bottom: "0", right: "0", transform: "translate(-20px, -10px)"}}
                            disabled={!slider.url}
                          >
                            Add Slider
                          </Button>
                      </CardActions>
                    </Card>
                  </form>
                </Box>
            </Grid>
          </Grid>
      </Container>
    </Box>
    </>
  )
}

export default SiteSettings
