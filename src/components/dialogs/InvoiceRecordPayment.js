 /* eslint-disable */
import React, { useState, useEffect} from 'react';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
 import { useDispatch, useSelector } from 'react-redux'
import { updateInvoiceAction } from 'src/redux/invoiceAction';
import { useUpdateinvoiceMutation } from 'src/redux/invoiceApiSlice';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CloseIcon from '@mui/icons-material/Close';
// import dayjs from 'dayjs';
import { DatePicker } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'path';
 
const MuiDialogTitle = styled(DialogTitle)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#1976D2',
    marginLeft: 0,
  }));
const MuiDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(4),
  }));
const MuiDialogActions = styled(DialogActions)(({ theme }) => ({
    margin: 0,
     padding: theme.spacing(1),
  }));

const CustomButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
  }))
 
 
 const Title = (props) => {
   const { children, onClose, ...other } = props;

   return (
     <MuiDialogTitle disableTypography  {...other}>
       <Typography variant="h6">{children}</Typography>
       {onClose ? (
         <CustomButton aria-label="close" onClick={onClose}>
           <CloseIcon />
         </CustomButton>
       ) : null}
     </MuiDialogTitle>
   );
 }
 
 const InvoiceRecordPayment = ({ setOpen, open, invoice }) => {
    
     const dispatch = useDispatch()
     const [updateinvoice] = useUpdateinvoiceMutation()
     const user = useSelector(store => store.auth.user)
     //Create a state to add new payment record
     const formik = useFormik({
        initialValues: {
            amountPaid: 0,
            datePaid: '',
            paymentMethod: '',
            note: '',
            clientName: '',
            paidBy: user.name
        },
        validationSchema: Yup.object({
            amountPaid: Yup
                .number()
                .integer()
                .required('amount paid is required'),
            datePaid: Yup
                .string()
                .max(255)
                .required('date paid is required'),
            paymentMethod: Yup
                .string()
                .max(255)
                .required('payment method is required'),
            note: Yup
                .string()
                .max(255),
        }),

        onSubmit: async () => {
            try {
                const {data} = await updateinvoice({id: invoice._id, data: updatedInvoice})
                dispatch(updateInvoiceAction(data))
                handleClose()
                window.location.reload()
            } catch (error) {
                console.log(error)
            }
      }})
 
     //Material ui datepicker
    const [selectedDate, setSelectedDate] = useState(new Date());
   //Crate a state to handle the payment records
     const [paymentRecords, setPaymentRecords] = useState([])
     const [method, setMethod] = useState({})
     const [totalAmountReceived, setTotalAmountReceived] = useState(0)
     const [updatedInvoice, setUpdatedInvoice] = useState({})
 
 
     useEffect(() => {
        formik.values.paymentMethod = method?.title
     },[method])
 
     useEffect(() => {
        formik.values.datePaid = selectedDate
     },[selectedDate])
 
     useEffect(() => {
       if(invoice) {
        formik.values.amountPaid = (Number(invoice.total) - Number(invoice.totalAmountReceived))}
        formik.values.clientName = invoice?.client?.name
     },[invoice])
     
     useEffect(() => {
         if(invoice?.paymentRecords) {
             setPaymentRecords(invoice?.paymentRecords)
         }
     }, [invoice])
 
     //Get the total amount paid
     useEffect(() => {
       let totalReceived = 0
       for(var i = 0; i < invoice?.paymentRecords?.length; i++) {
         totalReceived += Number(invoice?.paymentRecords[i]?.amountPaid)
         setTotalAmountReceived(totalReceived)
     }
     }, [invoice, formik.values] )
 
 
 
     useEffect(() => {
       setUpdatedInvoice({...invoice, status: (Number(totalAmountReceived) + Number(formik.values.amountPaid)) 
         >= 
         invoice?.total ? 'PAID' : 'PARTIAL', 
         paymentRecords: [...paymentRecords, formik.values], 
         totalAmountReceived:  Number(totalAmountReceived) + Number(formik.values.amountPaid)
       })
     },[formik.values, paymentRecords, totalAmountReceived, invoice] )

     
   const handleClose = () => {
     setOpen(false);
   };
 
   return (
     <div>
         <form onSubmit={formik.handleSubmit}>
       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullwidth >
             <Title id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
            Record Payment
             </Title>
             <MuiDialogContent dividers>
             <Grid
                  container
                  spacing={1}
                >
                <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                        error={Boolean(formik.touched.datePaid && formik.errors.datePaid)}
                        helperText={formik.touched.datePaid && formik.errors.datePaid}
                        fullWidth
                        label="Date Paid"
                        margin="normal"
                        name="datePaid"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="date"
                        value={formik.values.datePaid}
                        variant="outlined"
                    />
                  </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField
                        error={Boolean(formik.touched.amountPaid && formik.errors.amountPaid)}
                        helpertext={formik.touched.amountPaid && formik.errors.amountPaid}
                        type="number" 
                        name="amountPaid" 
                        label="Amount Paid"
                        fullWidth
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        variant="outlined" 
                        value={formik.values.amountPaid}
                    />
                  </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <FormControl fullWidth>
                        <InputLabel id="method">Payment Method</InputLabel>
                        <Select
                            error={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
                            helpertext={formik.touched.paymentMethod && formik.errors.paymentMethod}
                            labelId="method"
                            id="demo-simple-select"
                            margin="normal"
                            name="paymentMethod"
                            value={formik.values.paymentMethod}
                            label="Payment Method"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <MenuItem value='Cash'>Cash</MenuItem>
                            <MenuItem value='Gcash'>Gcash</MenuItem>
                            <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
                            <MenuItem value='Others'>Others</MenuItem>
                        </Select>
                    </FormControl>
                  </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                  >
                    <TextField 
                        type="text" 
                        name="note" 
                        label="Note"
                        fullWidth 
                        variant="outlined"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange} 
                        value={formik.values.note}
                    />
                  </Grid>
            </Grid>
 
             </MuiDialogContent>
             <MuiDialogActions>
             <Button 
                onClick={formik.handleSubmit} 
                variant="contained"  
                style={{marginRight: '25px'}} 
                disabled={!formik.isValid}
                autoFocus
                >
                 Save Record
             </Button>
             </MuiDialogActions>
       </Dialog>
         </form>
     </div>
   );
 }
 
 export default InvoiceRecordPayment