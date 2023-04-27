import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateadminMutation } from '../../redux/authApiSlice';
import { selectCurrentUser, updateUserAction } from '../../redux/authSlice';
import { toast } from 'react-toastify';
// import FileBase64 from 'react-file-base64';
import convertToBase64 from '../../helpers/base64';
import { storage } from "../../utils/firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL
  } from "firebase/storage";
import { v4 } from "uuid";
import Notification from '../dialogs/Notification';

export const AccountProfile = (props) => {
  const dispatch = useDispatch()
  const [updateadmin] = useUpdateadminMutation()
  const user = useSelector(selectCurrentUser)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProfile, setUploadProfile] =  useState(null)

  const [image, setImage] = useState(user?.photo)
  const [isUploaded, setIsUploaded] = useState(false)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
 

  const onImageChange = async (e) => {
    const file = e.target.files[0]
    if(file.size > 10000000){
        alert("File is too big!");
        setIsUploaded(false)
    }else{
      setImage(URL.createObjectURL(file))
      setUploadProfile(file)
      setIsUploaded(true)
    }
  }

  const handleSubmit = async(e) => {
      e.preventDefault()
      setIsLoading(true)
      try {
        const imageRef = ref(storage, `img/profilepic/${uploadProfile.name + v4()}`)
           uploadBytes(imageRef, uploadProfile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              const updateProfile = async () => {
                  const user = await updateadmin({newPhoto: url})
                  dispatch(updateUserAction(user.data))
                  setIsLoading(false)
                  setIsUploaded(false)
                  setNotify({
                    isOpen: true,
                    message: 'Profile photo saved',
                    type: 'success'
                  })
                      }
                      updateProfile()
                    });
                  })
      } catch (error) {
          setNotify({
            isOpen: true,
            message: 'Something went wrong!',
            type: 'errror'
          })
          setIsLoading(false)
          setIsUploaded(false)
      }
  }

  return(
    <>
    <Notification 
      notify={notify}
      setNotify={setNotify}
    />
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <label htmlFor='file-upload'>
            <Avatar
              src={image}
              sx={{
                height: 100,
                mb: 2,
                width: 100,
              }}
            />
          </label>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user?.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`Role: ${user?.role}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <Card>
          <CardContent>
            <form
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
            >
              <Grid
                container
                spacing={3}
                >
                <TextField
                  fullWidth
                  type='file'
                  name="photo"
                  onChange={(e) => onImageChange(e)}
                  required
                  id='file-upload'
                  variant="outlined"
                  accept='.jpeg, .png, .jpg'
                  // sx={{display: 'none'}}
                />
                {/* <FileBase64
                  multiple={ false }
                  onDone={({base64}) => onImageChange(base64)} /> */}
                <Button
                  type='submit'
                  color="primary"
                  fullWidth
                  variant="text"
                  disabled={!isUploaded}
                >
                  {isLoading? 'Updating...' : 'Update Profile'}
                </Button>
              </Grid>
            </form>
          </CardContent>
      </Card>
    </Card>
  </>
  )
}

