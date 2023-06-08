import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Box } from "@mui/system"
import { Autocomplete, Badge, Button, Card, CardContent, Collapse, Grid, IconButton, InputBase, List, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import { toCommas } from '../../utils/toCommas'
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';
import { initialState } from "../../utils/initialState"
import { useCreateinvoiceMutation, useGettotalcountMutation } from "../../redux/invoiceApiSlice"
import {format} from 'date-fns'
import { addInvoiceAction} from "../../redux/invoiceAction"
import dayjs from 'dayjs'
import { useDeleteoneMutation, useFetchallMutation } from "../../redux/toCreateInvoiceSlice"
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const Invoice = () => {
    const dispatch = useDispatch()
    const [createinvoice] = useCreateinvoiceMutation()
    const [fetchall] = useFetchallMutation()
    const [deleteone] = useDeleteoneMutation()
    const [gettotalcount] = useGettotalcountMutation()
    const user = useSelector(store => store.auth.user)
    const router = useRouter()
    const clients = useSelector(store => store.clients.clients)
    const [clientList, setClientList] = useState(clients)
    const [toCreateInvoiceList, setToCreateInvoiceList] = useState(null)
    const invoices = useSelector(store => store.invoice.invoices)
    // const invoice = useSelector(store => store.invoice.singleInvoice)
    const [ client, setClient] = useState(null)
    const [invoiceData, setInvoiceData] = useState(initialState)
    const today = new Date();
    const monthNow = today.getMonth()
    const yearNow = today.getFullYear()
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "MM/dd/yyyy"));
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [vat, setVat] = useState(0)
    const [status, setStatus ] = useState('UNPAID')
    const [type, setType] = useState('INVOICE')
    const [ rates, setRates] = useState(0)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const toggleOpen = () => setOpen(!open)

  useEffect(() => {
      getTotalcount()
      fetchInvoiceToCreate()
  },[router])

  const fetchInvoiceToCreate = async() => {
    try {
      const response = await fetchall()
      const list = []
      response.data?.map((item) => {
        const client = clients?.find((client)=> client._id === item.clientId)
        if(client){
          list.push(client)
        }
      })
      setToCreateInvoiceList(list) 
      if(!list.length){
        setClientList(clients)
      }else{
        setClientList(list)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getTotalcount = async() => {
    try {
      const response = await gettotalcount()
      setInvoiceData({...invoiceData, invoiceNumber: (Number(response.data) + 1).toString().padStart(3, '0')})
    } catch (error) {
      console.log(error);
    }
}

useEffect(() => {
  //Get the subtotal
  const subTotal =()=> {
  var arr = document.getElementsByName("amount");
  var subtotal = 0;
  for(var i = 0; i < arr.length; i++) {
      if(arr[i].value) {
          subtotal += +arr[i].value;
      }
      // document.getElementById("subtotal").value = subtotal;
      setSubTotal(subtotal)
  }
}

subTotal()

}, [invoiceData])

useEffect(() => {
  const total =() => {
      
      //Tax rate is calculated as (input / 100 ) * subtotal + subtotal 
      const overallSum = rates /100 * subTotal + subTotal
      //VAT is calculated as tax rates /100 * subtotal
      setVat(rates /100 * subTotal)
      setTotal(overallSum)
  }
  total()
}, [invoiceData, rates, subTotal])

  const handleAddField = (e) => {
    e.preventDefault()
    setInvoiceData((prevState) => ({...prevState, items: [...prevState.items,  {description: '', price: '', amount: '', discount: ''}]}))
}

const handleRemoveField =(index) => {
  const values = invoiceData.items
  values.splice(index, 1)
  setInvoiceData((prevState) => ({...prevState, values}))
  // console.log(values)
}

const handleChange =(index, e) => {
  const values = [...invoiceData.items]
  values[index][e.target.name] = e.target.value
  setInvoiceData({...invoiceData, items: values})
}

const handleRates =(e) => {
  setRates(e.target.value)
  setInvoiceData((prevState) => ({...prevState, tax: e.target.value}))
}
    const clientsProps = {
        options: clientList,
        getOptionLabel: (option) => option?.name
      };
    
    const CustomPaper = (props) => {
        return <Paper elevation={3} {...props} />;
    };

    const handleSubmit =  async(e) => {
      e.preventDefault()
        setLoading(true)
        const response = await createinvoice({
          ...invoiceData, 
          subTotal: subTotal,
          total: total, 
          vat: vat, 
          rates: rates,  
          dueDate: selectedDate, 
          invoiceNumber: `${
              invoiceData.invoiceNumber < 100 ? 
              (Number(invoiceData.invoiceNumber)).toString().padStart(3, '0') 
              : Number(invoiceData.invoiceNumber)
          }`,
          client, 
          type: type, 
          status: status, 
          paymentRecords: [], 
          creator: user._id
        }
          )

          if(response.data){
            await deleteone(client?._id)
            setLoading(false)
            dispatch(addInvoiceAction(response.data))
            setInvoiceData(initialState)
            router.push(`/dashboard/invoice/${response.data._id}`)
          }

      }

if((user?.role === "Super Admin" || user?.role === "Encoder" || user?.role === "Collector")){
    return(
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 3 }}>
              <Box sx={{marginBottom: "2rem"}}>
                <Card sx={{maxWidth: 1000 , margin: "0 auto"}}>
                  <CardContent>
                    <ListItemButton onClick={toggleOpen}>
                      <ListItemText primary={
                      <Badge 
                      badgeContent={toCreateInvoiceList?.length} 
                      color="primary"
                      >
                        Client pending invoice creation 
                      </Badge>
                      } />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      {toCreateInvoiceList && 
                        toCreateInvoiceList?.map((client, index)=>{
                          return (
                            <List component="div" disablePadding key={index}
                            sx={{ ml: 10, listStyleType: 'number', display: "list-item", }}
                            >
                              <ListItemText primary={`${client?.name} - (due date - ${client?.dueDate})`} />
                            </List>
                          )
                        })
                      }
                    </Collapse>
                  </CardContent>
                </Card>
              </Box>
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
                                <h1>{type}</h1>
                                Invoice #:
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
                                > {invoiceData.invoiceNumber}</span>
                                <br/>
                                </div>
                            </Grid>
                        </Grid >
                        <Grid container justifyContent="space-between" mt={5}>
                            <Grid item style={{width: '50%'}}>
                                <Typography variant="h6">Bill To: </Typography>
                                {client && (
                                  <div style={{marginLeft: 20}}>
                                      <Typography>Client Name: <b>{client.name}</b></Typography>
                                      <Typography>Account Number: <b>{client.accountNumber}</b></Typography>
                                      <Typography>Address: <b>{client.address}</b></Typography>
                                      <Typography>Phone: <b>{client.phone}</b></Typography>
                                      <Typography>Internet Plan: <b>{client.internetPlan}</b></Typography>
                                      <Button color="primary" size="small" style={{textTransform: 'none'}} onClick={()=> setClient(null)}>Change</Button>
                                  </div>
                                )
                                  }
                                <div style={client? {display: 'none'} :  {display: 'block'}}>
                                  <Autocomplete
                                            {...clientsProps}
                                            PaperComponent={CustomPaper}
                                                renderInput={(params) => <TextField {...params}
                                                // required={!invoice && true} 
                                                label="Select Customer" 
                                                margin="normal" 
                                                variant="outlined"
                                                required
                                                />}
                                            value={clients?.name}
                                            onChange={(event, value) => {setClient(value); setSelectedDate(`${monthNow}/${value?.dueDate}/${yearNow}`)}}
                                            
                                    />
                                </div>
                            
                            </Grid>
                            <Grid item style={{textAlign: 'right'}}>
                                <Typography variant="h6" gutterBottom>Status</Typography>
                                <Typography variant="h5" color="error" gutterBottom>UNPAID</Typography>
                                <Typography variant="overline" gutterBottom>Date</Typography>
                                <Typography variant="body2" gutterBottom>{dayjs().format("MMM DD, YYYY")}</Typography>
                                <Typography variant="overline" gutterBottom>Due Date</Typography>
                                <Typography variant="body2" gutterBottom>{selectedDate? dayjs(selectedDate).format("MMM DD, YYYY"): dayjs().date().format("MMM DD, YYYY")}</Typography>
                                <Typography variant="overline" gutterBottom>Amount</Typography>
                                <Typography variant="h6" gutterBottom>PHP {toCommas(total)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container mt={5}>
                            <Typography>Client Installation balance: {client?.installationBalance}</Typography><br />
                                <Box sx={{ minWidth: 300 }}>
                                <PerfectScrollbar>
                                <TableContainer>
                                <Table>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Description</TableCell>
                                        <TableCell >Price</TableCell>
                                        <TableCell >Disc(%)</TableCell>
                                        <TableCell >Amount</TableCell>
                                        <TableCell >Action</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {invoiceData?.items?.map((itemField, index) => (
                                        <TableRow hover key={index}>
                                          <TableCell  scope="row" style={{width: '40%' }}> <InputBase style={{width: '100%'}} outline="none" sx={{ ml: 1, flex: 1 }} type="text" name="description" onChange={e => handleChange(index, e)} value={itemField.description} placeholder="Item name or description" required/> </TableCell>
                                          <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="text" name="price" onChange={e => handleChange(index, e)} value={itemField.price} required/> </TableCell>
                                          <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="discount" onChange={e => handleChange(index, e)}  placeholder="0" value={itemField.discount} /> </TableCell>
                                          <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="amount" onChange={e => handleChange(index, e)} value={(itemField.price) - (itemField.price) * itemField.discount / 100} disabled /> </TableCell>
                                          <TableCell align="right"> 
                                              <IconButton onClick={() => handleRemoveField(index)}>
                                                  <DeleteIcon style={{width: '20px', height: '20px'}}/>
                                              </IconButton>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                                </PerfectScrollbar>
                              </Box>
                            <Tooltip title="Add Item" placement="top" arrow>
                                <Fab size="small" color="primary" aria-label="add" onClick={handleAddField}>
                                    <AddIcon />
                                </Fab>
                            </Tooltip>
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
                                    <Typography>{rates}</Typography>
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
                        <Grid container mt={5}>
                              <Grid item style={{marginRight: 10}}>
                                  <TextField 
                                      type="text" 
                                      step="any" 
                                      name="rates" 
                                      id="rates" 
                                      value={rates} 
                                      onChange={handleRates} 
                                      placeholder="e.g 10" 
                                      label="Tax Rates(%)"
                                      
                                  />
                              </Grid>
                              <Grid item style={{marginRight: 1}} sx={{display: "flex", alignItems: "center"}}>
                              <TextField
                                id="datetime-local"
                                label="Due Date"
                                type="date"
                                // defaultValue={new Date()}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                required
                                onChange={(e) => setSelectedDate(e.target.value)}
                              />
                              <Typography>Client Due Date: {client?.dueDate}</Typography>
                              </Grid>
                        </Grid>
                      <div>
                        <div style={{
                          margin: "50px 20px",
                          textAlign: "left",
                          }}>
                            <h4>Note/Payment Info</h4>
                            <textarea
                              aria-label="empty textarea"
                              placeholder="Provide additional details or terms of service"
                              onChange={(e) => setInvoiceData({...invoiceData, notes: e.target.value})}
                              value={invoiceData.notes}
                              style={{ width:"100%", height: "100px", fontSize: "1rem", padding: 10}}
                            />
                        </div>
                      </div>
                      <Grid container justifyContent="flex-end">
                        <Button
                            variant="contained"
                            style={{justifyContentContent: 'center'}}
                            type="submit"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                        >
                            {loading? "Saving..." : "Save and Continue"}
                        </Button>
                      </Grid>
                    </CardContent>
                </Card>
            </Box>
          </form>
        </Box>
    )
  }else{
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',height: "100vh", flexDirection: 'column'}}>
        <img src="/assets/errors/error-401.png" height={300} />
        <p style={{padding: '40px', color: 'gray'}}>Sorry, you are not allowed to access this resource!</p>
      </div>
  }
}