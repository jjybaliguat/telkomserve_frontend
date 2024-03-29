import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Box, Container } from "@mui/system"
import { Autocomplete, Button, Card, CardContent, CircularProgress, Collapse, Grid, IconButton, InputBase, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Tooltip, Typography } from "@mui/material"
import { Download as DownloadIcon } from '../../icons/download';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import PrintIcon from '@mui/icons-material/Print';
import ReactToPrint from "react-to-print";
import { toCommas } from '../../utils/toCommas'
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';
import { initialState } from "../../utils/initialState"
import { useCreateinvoiceMutation, useGetinvoiceMutation, useGettotalcountMutation } from "../../redux/invoiceApiSlice"
import {format} from 'date-fns'
import { setSingleInvoice } from "../../redux/invoiceAction"
import Router from 'next/router'
import NoData from "../svgIcons/NoData"
import InvoiceRecordPayment from "../dialogs/InvoiceRecordPayment"
import PaymentIcon from '@mui/icons-material/Payment';
import PaymentHistory from "./paymentHistory"
import Notification from "../dialogs/Notification"
import { LoadingButton } from "@mui/lab"
import axios from "axios"
import { saveAs } from 'file-saver';
import dayjs from 'dayjs'
import { selectCurrentUser } from "../../redux/authSlice"
import SmsIcon from '@mui/icons-material/Sms';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ScheduleSendDialog from "../dialogs/scheduleSendDialog"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const InvoiceDetails = () => {
    const user = useSelector(selectCurrentUser)
    const componentRef = useRef()
    const dispatch = useDispatch()
    const [getinvoice] = useGetinvoiceMutation()
    const router = useRouter()
    const invoiceId = router.query.invoiceId
    const invoices = useSelector(store => store.invoice.invoices)
    const singleInvoice =  invoices?.find(invoice => invoice._id === invoiceId)
    // const invoice = useSelector(store => store.invoice.singleInvoice)
    const [ client, setClient] = useState(null)
    const [invoiceData, setInvoiceData] = useState(initialState)
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [sendLoading, setSendLoading] = useState(false)
    const [scheduleSendLoading, setScheduleSendLoading] = useState(false)
    const [sendsmsLoading, setSendsmsLoading] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const APP_API = process.env.nodeEnv === "production" ? process.env.PRODUCTION_APP_API : process.env.DEV_APP_API
    const sendOpen = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const [openSendScheduleDialog, setOpenScheduleDialog] = useState(false)
    const [dateScheduled, setDateScheduled] = useState(null)

    const company= {
        businessName: "RDNAKS NETWORK AND DATA SOLUTION",
        email: "rdnaksnds@rdnaksnds.com",
        logo: 'https://rdnaksnds.com/static/images/rdnaksLogo2.png',
        phoneNumber: "09308127173 / 09267609934",
        contactAddress: "Block 156 lot 23 Southville 8B San Isidro, Rod. Rizal",
        Tin: "495097258000",
        website: 'https://rdnaksnds.com'
      }

      const toggleSendOpen = (event) => setAnchorEl(event.currentTarget);
      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleCopyLink = () => {
        navigator.clipboard.writeText(`${process.env.APP_URL}/invoice/${invoiceId}`)
        setNotify({
            isOpen: true,
            message: "Link copied to clipboard",
            type: "success"
        })
      }

    useEffect(() => {
        if(invoiceId){
            // dispatch(setSingleInvoice(singleInvoice))
            if(singleInvoice){
                setInvoiceData(singleInvoice)
                setRates(singleInvoice.rates)
                setClient(singleInvoice.client)
                setType(singleInvoice.type)
                setStatus(singleInvoice.status)
                setSelectedDate(singleInvoice.dueDate)
                setVat(singleInvoice.vat)
                setSubTotal(singleInvoice.subTotal)
                setTotal(singleInvoice.total)
                setLoading(false)
            }else{
                setLoading(false)
            }
            // console.log(singleInvoice)
        }
    }, [router])

    useEffect(() => {
        // downloadInvoicePdf()
    }, [])

    useEffect(() => {
        const getInvoice = async() => {
          const response = await getinvoice(invoiceId)
          setInvoiceData(response.data)
          setStatus(response.data?.status)
        }
        getInvoice()
      }, [invoiceId])

      let totalAmountReceived = 0
      for(var i = 0; i < singleInvoice?.paymentRecords?.length; i++) {
          totalAmountReceived += Number(singleInvoice?.paymentRecords[i]?.amountPaid)
      }

    //   const downloadInvoicePdf = async(e) => {
    //     e.preventDefault()
    //     setDownloadLoading(true)
    //     await axios.post(`${APP_API}/create-pdf`, 
    //         { 
    //             name: invoiceData?.client.name,
    //             address: invoiceData?.client.address,
    //             phone: invoiceData?.client.phone,
    //             email: invoiceData?.client.email,
    //             accountNumber: invoiceData?.client.accountNumber,
    //             dueDate: invoiceData?.dueDate,
    //             date: invoiceData?.createdAt,
    //             id: invoiceData?.invoiceNumber,
    //             notes: invoiceData?.notes,
    //             subTotal: toCommas(invoiceData?.subTotal),
    //             total: toCommas(invoiceData?.total),
    //             type: invoiceData?.type,
    //             vat: invoiceData?.vat,
    //             items: invoiceData?.items,
    //             status: invoiceData?.status,
    //             totalAmountReceived: toCommas(totalAmountReceived),
    //             balanceDue: toCommas(total - totalAmountReceived),
    //             company
    //     })
    //         .then(() => axios.get(`${APP_API}/fetch-pdf`, { responseType: 'blob' }))
    //         .then((res) => {
    //             const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    //             saveAs(pdfBlob, `${invoiceData?.client.accountNumber}-invoice.pdf`)
    //         }).then(() =>  {
    //             setDownloadLoading(false)
    //             setNotify({
    //                 isOpen: true,
    //                 message: 'Invoice Downloaded Successfully',
    //                 type: 'success'
    //             })
    //         }).catch((err) => {
    //             setNotify({
    //                 isOpen: true,
    //                 message: err,
    //                 type: 'error'
    //             })
    //         })
    //     }

        const sendSms = async(e) => {
            alert("this feature is under development")
        }
        
        const onScheduled = async(e) => {
            e.preventDefault()
            try {
                const response = await axios.post(`${APP_API}/schedule-send`, {
                    scheduledDate: dateScheduled,
                    name: invoiceData?.client.name,
                    address: invoiceData?.client.address,
                    phone: invoiceData?.client.phone,
                    email: 'justinejeraldbaliguat@gmail.com',
                    accountNumber: invoiceData?.client.accountNumber,
                    dueDate: invoiceData?.dueDate,
                    date: invoiceData?.createdAt,
                    id: invoiceData?.invoiceNumber,
                    notes: invoiceData?.notes,
                    subTotal: toCommas(invoiceData?.subTotal),
                    total: toCommas(invoiceData?.total),
                    type: invoiceData?.type,
                    vat: invoiceData?.vat,
                    items: invoiceData?.items,
                    status: invoiceData?.status,
                    totalAmountReceived: toCommas(totalAmountReceived),
                    balanceDue: toCommas(total - totalAmountReceived),
                    link: process.env.nodeEnv === "production"? `${process.env.APP_URL}/invoice/${invoiceData._id}` : `${process.env.DEV_APP_URL}/invoice/${invoiceData._id}`,
                    company
                }
                    )
                
                if(response.data){
                    setOpenScheduleDialog(false)
                    setNotify({
                        isOpen: true,
                        message: response.data.msg,
                        type: "success"
                    })
                }
            } catch (error) {
                setOpenScheduleDialog(false)
                setNotify({
                    isOpen: true,
                    message: "Something went wrong!",
                    type: "error"
                })
                console.log(error);
            }
        }

      const sendPdf = async(e) => {
        e.preventDefault()
        setSendLoading(true)
        axios.post(`${APP_API}/send-pdf`, 
            {
                name: invoiceData?.client.name,
                address: invoiceData?.client.address,
                phone: invoiceData?.client.phone,
                email: invoiceData?.client.email,
                accountNumber: invoiceData?.client.accountNumber,
                dueDate: invoiceData?.dueDate,
                date: invoiceData?.createdAt,
                id: invoiceData?.invoiceNumber,
                notes: invoiceData?.notes,
                subTotal: toCommas(invoiceData?.subTotal),
                total: toCommas(invoiceData?.total),
                type: invoiceData?.type,
                vat: invoiceData?.vat,
                items: invoiceData?.items,
                status: invoiceData?.status,
                totalAmountReceived: toCommas(totalAmountReceived),
                balanceDue: toCommas(total - totalAmountReceived),
                link: process.env.nodeEnv === "production"? `${process.env.APP_URL}/invoice/${invoiceData._id}` : `${process.env.DEV_APP_URL}/invoice/${invoiceData._id}`,
                company
        })
        // .then(() => console.log("invoice sent successfully"))
        .then(() => {
            setSendLoading(false)
             setNotify({
                 isOpen: true,
                 message: 'Email sent successfully',
                 type: 'success'
             })
        })
            .catch((error) => {
                console.log(error)
                setSendLoading(false)
                setNotify({
                    isOpen: true,
                    message: 'Something went wrong',
                    type: 'error'
                })
            })
      }

    if(loading){
        return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: "100vh"}}>
             <CircularProgress size={75}/>
           </div>
    }
        
    if(!invoiceId || !client){
            return (
                loading? (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', height: "100vh"}}>
                    <CircularProgress size={75}/>
                </div>)
                :
                (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
                    <NoData />
                    <p style={{padding: '40px', color: 'gray'}}>Something Went Wrong. No invoice available. Try to reload the page</p>
                    <Button sx={{fontSize: "1.5rem"}} onClick={() => window.location.reload()}>Reload</Button>
                </div>
                )
            )
     }  
    
if((user?.role === "Super Admin" || user?.role === "Encoder" || user?.role === "Collector")){
    return(
        <>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ScheduleSendDialog
                openSendScheduleDialog={openSendScheduleDialog}
                setOpenScheduleDialog={setOpenScheduleDialog}
                dateScheduled={dateScheduled}
                setDateScheduled={setDateScheduled}
                onScheduled={onScheduled}
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
                        Invoice Details
                    </Typography>
                    <Box sx={{ 
                        ml: 1,
                        display: "flex",
                        flexWrap: "wrap"
                        }}>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                label="Select Date and Time"
                                onChange={(newValue)=> {setDateScheduled(newValue)}}
                                renderInput={
                                    (params)=> <TextField {...params} />
                                }
                                value={dayjs(dateScheduled)}
                                />
                            </LocalizationProvider> */}
                            <Button aria-describedby="emailPopup" onClick={toggleSendOpen}>
                                Email to client
                            </Button>                
                            <Popover
                                id="emailPopup"
                                open={sendOpen}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            > 
                                <Stack direction="column">
                                    <LoadingButton
                                        size="small"
                                        onClick={(e)=>sendPdf(e)}
                                        startIcon={<SendIcon />}
                                        loading={sendLoading}
                                        loadingPosition="start"
                                        >
                                        <span>{sendLoading? "Sending..." : "Send Now"}</span>
                                    </LoadingButton>
                                    <LoadingButton
                                        size="small"
                                        // onClick={()=>setOpenScheduleDialog(true)}
                                        onClick={()=>alert("Were still working in this feature. Thank you.")}
                                        startIcon={<ScheduleSendIcon />}
                                        loading={scheduleSendLoading}
                                        loadingPosition="start"
                                        >
                                        <span>{scheduleSendLoading? "Sending..." : "Schedule send"}</span>
                                    </LoadingButton>
                                </Stack>
                            </Popover>
                        <LoadingButton
                            size="small"
                            onClick={sendSms}
                            startIcon={<SmsIcon />}
                            loading={sendsmsLoading}
                            loadingPosition="start"
                            >
                            <span>{sendsmsLoading? "Sending..." : "Message To Client"}</span>
                        </LoadingButton>
                        <Button
                            size="small"
                            onClick={handleCopyLink}
                            startIcon={<ContentCopyIcon />}
                            loadingPosition="start"
                            >
                            <span>Copy Link</span>
                        </Button>
                        {/* <LoadingButton
                            size="small"
                            onClick={downloadInvoicePdf}
                            startIcon={<DownloadIcon fontSize="small" />}
                            loading={downloadLoading}
                            loadingPosition="start"
                            >
                            <span>{downloadLoading? "Downloading..." : "Download as pdf"}</span>
                        </LoadingButton> */}
                            <ReactToPrint
                                trigger={() => (
                                    <Button
                                    startIcon={(<PrintIcon fontSize="small" />)}
                                    >
                                        Print / Download
                                    </Button>
                                )}
                                content={() => componentRef.current}
                            />
                            {(user?.role === "Super Admin" || user?.role === "Encoder") &&
                                <Button
                                startIcon={(<EditIcon fontSize="small" />)}
                                // onClick={() => window.location.href = `/dashboard/invoice/edit/${invoiceData._id}`}
                                onClick={() => Router.push(`/dashboard/invoice/edit/${invoiceData._id}`)}
                                disabled={status === "PAID"}
                                >
                                    Edit
                                </Button>
                            }
                            <Button
                                variant="contained"
                                onClick={() => setOpen((prev) => !prev)}
                                startIcon={<PaymentIcon />}
                                disabled={status === "PAID"}
                            >
                                Record payment
                            </Button>
                        </Box>
                    </Box>
                    {invoiceData?.paymentRecords?.length !== 0 && (
                        <PaymentHistory paymentRecords={invoiceData?.paymentRecords} />
                    )}
                    <InvoiceRecordPayment open={open} setOpen={setOpen} invoice={invoiceData} />

                <Box sx={{ mt: 3 }} ref={componentRef}>
                    <Card sx={{maxWidth: 1000 , margin: "0 auto", p: 3}}>
                        <CardContent>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <img 
                                    alt="Company Logo" 
                                    src='/static/images/logo.png'
                                    style={{height: '120px'}}
                                    />
                                    <Typography variant="h6">TELKOMSERVE NETWORK AND DATA SOLUTION</Typography>
                                    <Typography sx={{fontSize: "14px"}}>Block 1 lot 5 San Antonio Village Brgy San Isidro Rodriguez Rizal</Typography>
                                    <Typography sx={{fontSize: "14px"}}>Phone: 09979112814 </Typography>
                                    {/* <Typography sx={{fontSize: "14px"}}>TIN: 495097258000</Typography> */}
                                </Grid>
                                <Grid item>
                                    <Typography style={{lineSpacing: 1, fontSize: 45, fontWeight: 700, color: 'gray'}} >{Number(total - totalAmountReceived) <= 0 ? 'Receipt' : type}</Typography>
                                    <Typography variant="body2" sx={{fontSize: "1rem"}}>No: {invoiceData?.invoiceNumber}</Typography>
                                </Grid>
                            </Grid >
                            <Grid container justifyContent="space-between" mt={5}>
                                <Grid item style={{width: '50%'}}>
                                    <Typography variant="h6">Bill To: </Typography>
                                    <div style={{marginLeft: 20}}>
                                        <Typography>Client Name: <b>{client?.name}</b></Typography>
                                        <Typography>Account Number: <b>{client?.accountNumber}</b></Typography>
                                        <Typography>Address: <b>{client?.address}</b></Typography>
                                        <Typography>Phone: <b>{client?.phone}</b></Typography>
                                    </div>
                                </Grid>
                                <Grid item style={{textAlign: 'right'}}>
                                    <Typography variant="h6" gutterBottom>Status</Typography>
                                    <Typography variant="h5" color={`${invoiceData?.status === "PAID"? "success.main" : invoiceData.status === "PARTIAL"? "warning.main" : "error"}`} gutterBottom>{status}</Typography>
                                    <Typography variant="overline" gutterBottom>Date</Typography>
                                    <Typography variant="body2" gutterBottom>{dayjs().format("MMM DD, YYYY")}</Typography>
                                    <Typography variant="overline" gutterBottom>Due Date</Typography>
                                    <Typography variant="body2" gutterBottom>{selectedDate? dayjs(selectedDate).format("MMM DD, YYYY"): dayjs().date().format("MMM DD, YYYY")}</Typography>
                                    <Typography variant="overline" gutterBottom>Amount</Typography>
                                    <Typography variant="h6" gutterBottom>PHP {toCommas(total)}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Typography>Client Installation balance: {client?.installationBalance}</Typography><br />
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
                                        {invoiceData?.items?.map((itemField, index) => (
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
                                        <Typography>Invoice Summary</Typography>
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
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </>
    )
}else{
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',height: "100vh", flexDirection: 'column'}}>
        <img src="/assets/errors/error-401.png" height={300} />
        <p style={{padding: '40px', color: 'gray'}}>Sorry, you are not allowed to access this resource!</p>
      </div>
  }
}
