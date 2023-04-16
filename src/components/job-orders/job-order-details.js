import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Box, Container } from "@mui/system"
import { Autocomplete, Button, Card, CardContent, CircularProgress, Grid, IconButton, InputBase, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Tooltip, Typography } from "@mui/material"
import { Download as DownloadIcon } from '../../icons/download';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import PrintIcon from '@mui/icons-material/Print';
import ReactToPrint from "react-to-print";
import moment from 'moment'
import { toCommas } from '../../utils/toCommas'
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';
import { initialState } from "../../utils/initialState"
import {format} from 'date-fns'
import Router from 'next/router'
import NoData from "../svgIcons/NoData"
import InvoiceRecordPayment from "../dialogs/InvoiceRecordPayment"
import PaymentIcon from '@mui/icons-material/Payment';
import Notification from "../dialogs/Notification"
import { LoadingButton } from "@mui/lab"
import axios from "axios"
import { useGetjoborderMutation, useUpdatejoborderMutation } from "../../redux/jobOrderApiSlice"
import ConfirmDialog from "../dialogs/ConfirmDialog"
import { updateJobOrderAction } from "../../redux/jobOrderAction"
import { useUpdateclientMutation } from "../../redux/authApiSlice"
import { addClientAction } from "../../redux/clientSlice"

export const JobOrderDetails = () => {
    const componentRef = useRef()
    const dispatch = useDispatch()
    const [getjoborder] = useGetjoborderMutation()
    const [updatejoborder] = useUpdatejoborderMutation()
    const [updateclient] = useUpdateclientMutation()
    const router = useRouter()
    const jobOrderId = router.query.jobOrderId
    const joborders = useSelector(store => store.joborders.jobOrders)
    const singleJobOrder=  joborders?.find(jobOrder => jobOrder._id === jobOrderId)
    // const invoice = useSelector(store => store.invoice.singleJobOrder)
    const [ applicant, setApplicant] = useState(null)
    const [jobOrderData, setJobOrderData] = useState(initialState)
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "MM/dd/yyyy"));
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [vat, setVat] = useState(0)
    const [status, setStatus ] = useState('')
    const [type, setType] = useState('INVOICE')
    const [ rates, setRates] = useState(0)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [sendLoading, setSendLoading] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const APP_API = process.env.nodeEnv === "production" ? process.env.PRODUCTION_APP_API : process.env.DEV_APP_API

    const company= {
        businessName: "RDNAKS NETWORK AND DATA SOLUTION",
        email: "rdnaksict@gmail.com",
        logo: 'https://rdnaksict.vercel.app/static/images/rdnaksLogo2.png',
        phoneNumber: "09308127173 / 09267609934",
        contactAddress: "Block 156 lot 23 Southville 8B San Isidro, Rod. Rizal",
        Tin: "495097258000",
        website: 'http://rdnaksict.vercel.app'
      }

    useEffect(() => {
        if(jobOrderId){
            // dispatch(setSingleInvoice(singleJobOrder))
            if(singleJobOrder){
                setJobOrderData(singleJobOrder)
                setRates(singleJobOrder.rates)
                setApplicant(singleJobOrder.applicant)
                setType(singleJobOrder.type)
                setStatus(singleJobOrder.status)
                setSelectedDate(singleJobOrder.installationDate)
                setVat(singleJobOrder.vat)
                setSubTotal(singleJobOrder.subTotal)
                setTotal(singleJobOrder.total)
                setLoading(false)
            }else{
                setLoading(false)
            }
            // console.log(singleJobOrder)
        }
    }, [router])

    useEffect(() => {
        const getJobOrder = async() => {
          const response = await getjoborder(jobOrderId)
          setJobOrderData(response.data)
          setStatus(response.data?.status)
        }
        getJobOrder()
      }, [jobOrderId])

      const sendPdf = async(e) => {
        e.preventDefault()
        setSendLoading(true)
      }

      const handleMarkasDone = async(id) => {
        const response = await updatejoborder({id: id, data: {
            ...jobOrderData,
            status: "DONE"
        }})
        dispatch(updateJobOrderAction(response.data))
        setStatus("DONE")
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        if(response?.data?.status === "DONE"){
            const response = await updateclient({id: jobOrderData?.applicant?._id, data: {
                connectionStatus: "activated"
            }})
            console.log(response);
            if(response.data){
                dispatch(addClientAction(response.data))
                Router.push(`/dashboard/clients/${response.data?._id}`)
            }

        }
        setNotify({
            isOpen: true,
            message: 'Job Order marked as done successfully',
            type: 'success'
          })
      }

    if(loading){
        return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: "100vh"}}>
             <CircularProgress size={75}/>
           </div>
    }
        
    if(!jobOrderId || !applicant){
            return (
                loading? (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: "100vh"}}>
                    <CircularProgress size={75}/>
                </div>)
                :
                (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
                    <NoData />
                    <p style={{padding: '40px', color: 'gray'}}>Something Went Wrong. No JobOrder available. Or invalid invoice Id. Try to reload the page</p>
                    <Button sx={{fontSize: "1.5rem"}} onClick={() => window.location.reload()}>Reload</Button>
                </div>
                )
            )
     }  

    return(
        <>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Box sx={{ mt: 3 }}>
                <Box
                    sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1
                    }}
                >
                    <Typography
                        sx={{ m: 1 }}
                        variant="h4"
                        >
                        Job Order Details
                    </Typography>
                    <Box sx={{ ml: 1}}>
                        <LoadingButton
                            size="small"
                            onClick={sendPdf}
                            startIcon={<SendIcon />}
                            loading={sendLoading}
                            loadingPosition="start"
                            >
                            <span>{sendLoading? "Sending..." : "Send To Client"}</span>
                        </LoadingButton>
                            <ReactToPrint
                                trigger={() => (
                                    <Button
                                    startIcon={(<PrintIcon fontSize="small" />)}
                                    >
                                        Print/Download
                                    </Button>
                                )}
                                content={() => componentRef.current}
                            />
                            <Button
                                startIcon={(<EditIcon fontSize="small" />)}
                                // onClick={() => window.location.href = `/dashboard/invoice/edit/${jobOrderData._id}`}
                                // onClick={() => Router.push(`/dashboard/invoice/edit/${jobOrderData._id}`)}
                                disabled={status === "DONE"}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setConfirmDialog({
                                        isOpen: true,
                                        title: 'Are you sure yo mark this job order as done?',
                                        subTitle: "You can't undo this operation",
                                        onConfirm: () => {handleMarkasDone(jobOrderData._id) }
                                    })}} fontSize="small"
                                startIcon={<PaymentIcon />}
                                disabled={status === "DONE"}
                            >
                                Mark Job Order as Done
                            </Button>
                        </Box>
                    </Box>

                <Box sx={{ mt: 3 }} ref={componentRef}>
                    <Card sx={{maxWidth: 1000 , margin: "0 auto", p: 3}}>
                        <CardContent>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <img 
                                    alt="Company Logo" 
                                    src='/static/images/rdnaksLogo2.png'
                                    style={{height: '120px'}}
                                    />
                                    <Typography variant="h6">RDNAKS NETWORK AND DATA SOLUTION</Typography>
                                    <Typography sx={{fontSize: "14px"}}>Block 156 lot 23 Southville 8B</Typography>
                                    <Typography sx={{fontSize: "14px"}}>Phone: 09308127173 / 09267609934</Typography>
                                    <Typography sx={{fontSize: "14px"}}>TIN: 495097258000</Typography>
                                </Grid>
                                <Grid item sx={{display: "flex", flexDirection:"column"}}>
                                <h1>JOB ORDER</h1>
                                <Stack direction="row" alignItems="center">
                                    Job-Order #:
                                    <div style={{
                                        marginTop: '15px',
                                        width: '100px',
                                        padding: '8px',
                                        display: 'inline-block',
                                        backgroundColor: '#f4f4f4',
                                        outline: '0px solid transparent'
                                    }}  
                                    >
                                    <span style={{width:'40px',
                                        color: 'black',
                                        padding: '15px',
                                    }} 
                                    >{jobOrderData?.jobOrderNumber}</span>
                                    <br/>
                                    </div>
                                </Stack>
                                <Stack direction="row" alignItems="center">
                                    Reference #:
                                    <div style={{
                                        marginTop: '15px',
                                        width: '150px',
                                        padding: '8px',
                                        display: 'inline-block',
                                        backgroundColor: '#f4f4f4',
                                        outline: '0px solid transparent'
                                    }}  
                                    >
                                    <span style={{width:'40px',
                                        color: 'black',
                                        padding: '8px',
                                    }} 
                                    >{jobOrderData?.refNumber}</span>
                                    <br/>
                                    </div>
                                </Stack>
                            </Grid>
                            </Grid >
                            <Grid container justifyContent="space-between" mt={5}>
                                <Grid item style={{width: '50%'}}>
                                    <Typography variant="h6">Client info: </Typography>
                                    <div style={{marginLeft: 20}}>
                                        <Typography>Client Name: <b>{applicant?.name}</b></Typography>
                                        <Typography>Account Number: <b>{applicant?.accountNumber}</b></Typography>
                                        <Typography>Address: <b>{applicant?.address}</b></Typography>
                                        <Typography>Phone: <b>{applicant?.phone}</b></Typography>
                                    </div>
                                </Grid>
                                <Grid item style={{textAlign: 'right'}}>
                                    <Typography variant="h6" gutterBottom>Status</Typography>
                                    <Typography variant="h5" color={`${jobOrderData?.status === "DONE"? "success.main" : "warning.main"}`} gutterBottom>{status}</Typography>
                                    <Typography variant="overline" gutterBottom>Date</Typography>
                                    <Typography variant="body2" gutterBottom>{moment().format("MMM Do YYYY")}</Typography>
                                    <Typography variant="overline" gutterBottom>Due Date</Typography>
                                    <Typography variant="body2" gutterBottom>{selectedDate? moment(selectedDate).format("MMM Do YYYY"): moment(today).format("MMM Do YYYY")}</Typography>
                                    <Typography variant="overline" gutterBottom>Amount</Typography>
                                    <Typography variant="h6" gutterBottom>PHP {toCommas(total)}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <PerfectScrollbar>
                                    <Box sx={{ minWidth: 425 }}>
                                    <TableContainer>
                                    <Table>
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Description</TableCell>
                                            <TableCell >Price</TableCell>
                                            <TableCell >Disc(%)</TableCell>
                                            <TableCell >Amount</TableCell>

                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {jobOrderData?.items.map((itemField, index) => (
                                            <TableRow hover key={index}>
                                            <TableCell  scope="row" style={{width: '40%' }}> <InputBase style={{width: '100%'}} outline="none" sx={{ ml: 1, flex: 1 }} type="text" name="description" value={itemField.description} readOnly /> </TableCell>
                                            <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="text" name="price"  value={itemField.price} readOnly/> </TableCell>
                                            <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount"  placeholder="0" value={itemField.discount} readOnly/> </TableCell>
                                            <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="amount" value={(itemField.price) - (itemField.price) * itemField.discount / 100} readOnly /> </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    </Box>
                                </PerfectScrollbar>
                            </Grid>
                            <Grid container justifyContent="space-between" mt={3}>
                                <Grid item>

                                </Grid>
                                <Grid item style={{width: "50%"}}>
                                <div>
                                    <div style={{
                                        backgroundColor: "rgb(247, 247, 247)",
                                        fontWeight: 500,
                                        padding: "15px 0px",
                                        paddingLeft: "15px",
                                        display: "flex",
                                        color: "gray"
                                    }}>
                                        <Typography>Job Order Summary</Typography>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "15px",
                                        color: "gray"
                                    }}>
                                        <Typography>Sub total:</Typography>
                                        <Typography>{subTotal}</Typography>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "15px",
                                        color: "gray"
                                    }}>
                                        <Typography>VAT(%):</Typography>
                                        <Typography>{vat}</Typography>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "15px",
                                        color: "gray"
                                    }}>
                                        <Typography>Total:</Typography>
                                        <Typography>PHP {toCommas(total)}</Typography>
                                    </div>
                                </div>
                                </Grid>
                            </Grid>
                            <div>
                        <div style={{
                          textAlign: "left",
                          }}>
                            <h4>Note</h4>
                            <p style={{marginLeft: "1rem"}}>{jobOrderData?.notes}</p>
                        </div>
                      </div>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    )
}
