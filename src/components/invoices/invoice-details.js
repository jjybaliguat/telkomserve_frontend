import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Box, Container } from "@mui/system"
import { Autocomplete, Button, Card, CardContent, CircularProgress, Grid, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Tooltip, Typography } from "@mui/material"
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
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const InvoiceDetails = () => {
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
    const [sendLoading, setSendLoading] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
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

      const downloadInvoicePdf = async(e) => {
        e.preventDefault()
        setDownloadLoading(true)
        await axios.post(`${APP_API}/create-pdf`, 
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
                company
        })
            .then(() => axios.get(`${APP_API}/fetch-pdf`, { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, `${invoiceData?.client.accountNumber}-invoice.pdf`)
            }).then(() =>  {
                setDownloadLoading(false)
                setNotify({
                    isOpen: true,
                    message: 'Invoice Downloaded Successfully',
                    type: 'success'
                })
            }).catch((err) => {
                setNotify({
                    isOpen: true,
                    message: err,
                    type: 'error'
                })
            })
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

    // useEffect(() => {
    //     if(invoice) {
    //         //Automatically set the default invoice values as the ones in the invoice to be updated
    //         setInvoiceData(invoice)
    //         setRates(invoice.rates)
    //         setClient(invoice.client)
    //         setType(invoice.type)
    //         setStatus(invoice.status)
    //         setSelectedDate(invoice.dueDate)
    //         setVat(invoice.vat)
    //         setSubTotal(invoice.subTotal)
    //         setTotal(invoice.total)
    //     }
    // }, [invoice])

    return(
        <>
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
                        Invoice Details
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
                        <LoadingButton
                            size="small"
                            onClick={downloadInvoicePdf}
                            startIcon={<DownloadIcon fontSize="small" />}
                            loading={downloadLoading}
                            loadingPosition="start"
                            >
                            <span>{downloadLoading? "Downloading..." : "Download as pdf"}</span>
                        </LoadingButton>
                            <ReactToPrint
                                trigger={() => (
                                    <Button
                                    startIcon={(<PrintIcon fontSize="small" />)}
                                    >
                                        Print
                                    </Button>
                                )}
                                content={() => componentRef.current}
                            />
                            <Button
                                startIcon={(<EditIcon fontSize="small" />)}
                                // onClick={() => window.location.href = `/dashboard/invoice/edit/${invoiceData._id}`}
                                onClick={() => Router.push(`/dashboard/invoice/edit/${invoiceData._id}`)}
                                disabled={status === "PAID"}
                            >
                                Edit
                            </Button>
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
                                    src='/static/images/rdnaksLogo2.png'
                                    style={{height: '120px'}}
                                    />
                                    <Typography variant="h6">RDNAKS NETWORK AND DATA SOLUTION</Typography>
                                    <Typography sx={{fontSize: "14px"}}>Block 156 lot 23 Southville 8B</Typography>
                                    <Typography sx={{fontSize: "14px"}}>Phone: 09308127173 / 09267609934</Typography>
                                    <Typography sx={{fontSize: "14px"}}>TIN: 495097258000</Typography>
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
                                    <Typography variant="body2" gutterBottom>{moment().format("MMM Do YYYY")}</Typography>
                                    <Typography variant="overline" gutterBottom>Due Date</Typography>
                                    <Typography variant="body2" gutterBottom>{selectedDate? moment(selectedDate).format("MMM Do YYYY"): moment(today).format("MMM Do YYYY")}</Typography>
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
}
