import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/firebase'
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import Title from '../landingpage/components/Title'
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from '../dialogs/ConfirmDialog'
import Notification from '../dialogs/Notification'
import { v4 } from 'uuid';

Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
  }

const planDescription = [
    "Unlimited Internet",
    "No data capping",
    "Fast instalation process",
    "No hidden charges",
]

const PlansSetting = () => {
    const docRef = collection(db, 'internetPlans')
    const [plans, setPlans] = useState(null)
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [planData, setPlanData] = useState({
        title: '',
        price: '',
        speed: '',
    })
    const [singlePlan, setSinglePlan] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const handleOpen = () => {
        setAddOpen(true)
    }
    const handleClose = () => {
        setAddOpen(false)
    }
    const handleEditOpen = (id) => {
        const data = plans.find((item)=>item.id===id)
        setSinglePlan(data)
        setEditOpen(true)
    }
    const handleEditClose = () => {
        setEditOpen(false)
    }

    const handleDelete = async(id) => {
        try {
          const planRef = doc(docRef, id)
          await deleteDoc(planRef)
          setConfirmDialog({
            isOpen: false,
        })
        setNotify({
          isOpen: true,
          message: 'Plan Deleted Successfully',
          type: 'success'
        })
        } catch (error) {
            setNotify({
                isOpen: true,
                message: 'Something went wrong!',
                type: 'error'
              })
              setConfirmDialog({
                isOpen: false,
            })
          console.log(error)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const finalData = {
            ...planData,
            id: v4(),
            date: serverTimestamp()
        }
        
        try {
            const planRef = doc(docRef, finalData.id)
            await setDoc(planRef, finalData)
            handleClose()
            setPlanData({
                title: '',
                price: '',
                speed: '',
            })
            setNotify({
                isOpen: true,
                message: "New Plan Added",
                type: "success"
            })
        } catch (error) {
            setNotify({
                isOpen: true,
                message: "Something went wrong!",
                type: "error"
            })
            console.log(error);
            handleClose()
        }
    }
    

    useEffect(()=>{
        getPlans()
    }, [])

    const getPlans = () => {
        const Snapshot = onSnapshot(docRef, (snapshot) => {
          const items = []
          snapshot.forEach((doc)=>{
            items.push(doc.data())
          })
          setPlans(items)
        })
    
        return () => {
          Snapshot()
        }
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
    <Box
        sx={{

        }}
    >
        <Typography
            sx={{ mb: 3 }}
            variant="h4"
            >
        Internet Plan Settings
        </Typography>
        <Card
        sx={{
            padding: "1rem",
            minHeight: "100vh",
            height: "fit-content"
        }}
        >
            <Stack direction='row' alignItems="center" gap={2}>
                <Typography>Current Plans</Typography>
                <Button
                variant="contained"
                sx={{
                    padding: "0 0.5rem"
                }}
                onClick={handleOpen}
                >
                 Add Plan
                </Button>
            </Stack>
            <Grid container
                sx={{
                    paddingTop: "1.5rem"
                }}
                gap={2}
            >
                {
                    plans?.sortBy('date').map((item,index)=>{
                        return(
                        <Grid item
                            xs={12}
                            md={3}
                            key={index}
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Card
                                sx={{
                                    width: "100%",
                                    boxShadow: "0 3px 12px rgb(0 0 0 / 0.2)",
                                    padding: "1rem",
                                    minHeight: "350px"
                                }}
                            >
                                <Stack>
                                <Title variant={{ xs: "h4", sm: "h3" }} sx={{textAlign: "center", color:"primary.main"}}>{item.title}</Title>
                                <Title variant={{ xs: "h5", sm: "h4" }}>₱ {item.price}/month</Title>
                                <Title variant={{ xs: "h6", sm: "h5" }}>{item.speed}</Title>
                                {planDescription.map((item, index) => {
                                    return (
                                    <Stack key={index} direction="row" alignItems="center" spacing={1}>
                                        <CheckIcon sx={{color: "primary.main"}} />
                                        <Typography variant="body2">
                                            {item}
                                        </Typography>
                                    </Stack>
                                    )
                                })}
                                </Stack>
                                <Grid container justifyContent="space-between"
                                    sx={{
                                        position: "absolute",
                                        bottom: "0",
                                        right: "10px"
                                    }}
                                >
                                    <Grid item>
                                        
                                    </Grid>
                                    <Grid item>
                                        <Stack direction="row">
                                            <IconButton aria-label="edit">
                                                <EditIcon 
                                                onClick={()=>handleEditOpen(item.id)}
                                                color="warning"/>
                                            </IconButton>
                                            <IconButton aria-label="delete">
                                                <DeleteIcon color="error"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure yo want to delete this Internet Plan?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { handleDelete(item.id) }
                                                    })}} fontSize="small"
                                                    />
                                            </IconButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        )
                    })
                }
            </Grid>
        </Card>

        {/* Form Dialog */}

        <Dialog open={addOpen} onClose={handleClose}>
            <DialogTitle>Add Internet Plan</DialogTitle>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Plan Title (ex. Plan 1299)"
                        type="text"
                        value={planData.title}
                        onChange={(e)=>setPlanData({...planData, title: e.target.value})}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Plan Price"
                        type="number"
                        value={planData.price}
                        onChange={(e)=>setPlanData({...planData, price: e.target.value})}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        id="speed"
                        label="Plan Speed (ex. UpTo 50MBPS)"
                        type="text"
                        value={planData.speed}
                        onChange={(e)=>setPlanData({...planData, speed: e.target.value})}
                        fullWidth
                        required
                    />
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Add</Button>
            </DialogActions>
        </form>
        </Dialog>
        {/* Edit Dialog */}

        <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>Edit Internet Plan</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    label="Plan Title"
                    type="text"
                    value={singlePlan?.title}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="price"
                    label="Plan Price"
                    type="number"
                    value={singlePlan?.price}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="speed"
                    label="Plan Speed"
                    type="text"
                    fullWidth
                    value={singlePlan?.speed}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={handleEditClose}>Edit</Button>
            </DialogActions>
        </Dialog>
    </Box>
    </>
  )
}

export default PlansSetting
