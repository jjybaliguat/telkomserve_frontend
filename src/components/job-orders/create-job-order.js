import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { Box, Container } from "@mui/system"
import { Autocomplete, Button, Card, CardContent, Grid, IconButton, InputBase, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material"
import moment from 'moment'
import { toCommas } from '../../utils/toCommas'
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';
import { jobInitialState } from "../../utils/initialState"
import {format} from 'date-fns'
import { useCreatejoborderMutation, useGetjoborderscountMutation } from "src/redux/jobOrderApiSlice"
import { addJobOrderAction } from "src/redux/jobOrderAction"
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const CreateJobOrder = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const applicants = useSelector(store=>store.applicants.applicants)
    const [getjoborderscount] = useGetjoborderscountMutation()
    const [createjoborder] = useCreatejoborderMutation()
    const [applicant, setApplicant] = useState(null)
    const [jobOrderData, setJobOrderData] = useState(jobInitialState)
    const today = new Date();
    const monthNow = today.getMonth()
    const yearNow = today.getFullYear()
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "MM/dd/yyyy"));
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [vat, setVat] = useState(0)
    const [status, setStatus ] = useState('ONGOING')
    const [ rates, setRates] = useState(0)
    const [loading, setLoading] = useState(false)

    const applicantsProps = {
        options: applicants,
        getOptionLabel: (option) => option.name
      };
    
    const CustomPaper = (props) => {
        return <Paper elevation={3} {...props} />;
    };

    const handleSubmit =  async(e) => {
      e.preventDefault()
      setLoading(true)
      try {
        const response = await createjoborder({
            ...jobOrderData,
            subTotal: subTotal,
            total: total, 
            vat: vat, 
            rates: rates,
            installationDate: selectedDate,
            jobOrderNumber: `${
                jobOrderData.jobOrderNumber < 100 ? 
                (Number(jobOrderData.jobOrderNumber)).toString().padStart(3, '0') 
                : Number(jobOrderData.jobOrderNumber)
            }`,
            applicant,
            refNumber: jobOrderData.refNumber,
            status: status, 
          })
          dispatch(addJobOrderAction(response.data))
          setJobOrderData(jobInitialState)
          setLoading(false)
          router.push(`/dashboard/job-order/${response.data._id}`)
      } catch (error) {
        console.log(error);
      }
      }

      useEffect(() => {
        getTotalcount()
    },[router])
  
    const getTotalcount = async() => {
      try {
        const response = await getjoborderscount()
        setJobOrderData({...jobOrderData, jobOrderNumber: (Number(response.data) + 1).toString().padStart(3, '0')})
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
      
      }, [jobOrderData])

      useEffect(() => {
        const total =() => {
            //Tax rate is calculated as (input / 100 ) * subtotal + subtotal 
            const overallSum = rates /100 * subTotal + subTotal
            //VAT is calculated as tax rates /100 * subtotal
            setVat(rates /100 * subTotal)
            setTotal(overallSum)
        }
        total()
      }, [jobOrderData, rates, subTotal])

      const handleAddField = (e) => {
        e.preventDefault()
        setJobOrderData((prevState) => ({...prevState, items: [...prevState.items,  {description: '', price: '', amount: '', discount: ''}]}))
    }
    
    const handleRemoveField =(index) => {
      const values = jobOrderData.items
      values.splice(index, 1)
      setJobOrderData((prevState) => ({...prevState, values}))
      // console.log(values)
    }

    const handleChange =(index, e) => {
        const values = [...jobOrderData.items]
        values[index][e.target.name] = e.target.value
        setJobOrderData({...jobOrderData, items: values})
      }
      
      const handleRates =(e) => {
        setRates(e.target.value)
        setJobOrderData((prevState) => ({...prevState, tax: e.target.value}))
      }

    return(
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mt: 3 }}>
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
                                {applicant && (
                                  <div style={{marginLeft: 20}}>
                                      <Typography>Applicant Name: <b>{applicant.name}</b></Typography>
                                      <Typography>Account Number: <b>{applicant.accountNumber}</b></Typography>
                                      <Typography>Address: <b>{applicant.address}</b></Typography>
                                      <Typography>Phone: <b>{applicant.phone}</b></Typography>
                                      <Typography>Internet Plan: <b>{applicant.internetPlan}</b></Typography>
                                      <Button color="primary" size="small" style={{textTransform: 'none'}} onClick={()=> setApplicant(null)}>Change</Button>
                                  </div>
                                )
                                  }
                                <div style={applicant? {display: 'none'} :  {display: 'block'}}>
                                  <Autocomplete
                                            {...applicantsProps}
                                            PaperComponent={CustomPaper}
                                                renderInput={(params) => <TextField {...params}
                                                // required={!invoice && true} 
                                                label="Select Customer" 
                                                margin="normal" 
                                                variant="outlined"
                                                />}
                                            value={applicant?.name}
                                            onChange={(event, value) => {setApplicant(value)}}
                                            
                                    />
                                </div>
                            
                            </Grid>
                            <Grid item style={{textAlign: 'right'}}>
                                <Typography variant="h6" gutterBottom>Status</Typography>
                                <Typography variant="h5" color="error" gutterBottom>{status}</Typography>
                                <Typography variant="overline" gutterBottom>Date</Typography>
                                <Typography variant="body2" gutterBottom>{moment().format("MMM Do YYYY")}</Typography>
                                {/* <Typography variant="overline" gutterBottom>Installation Date</Typography> */}
                                <div style={{marginTop: "1rem"}}>
                                <TextField
                                id="datetime-local"
                                label="Installation Date"
                                type="date"
                                required
                                defaultValue={new Date()}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) => setSelectedDate(e.target.value)}
                              />
                                </div>
                                {/* <Typography variant="body2" gutterBottom>{selectedDate? moment(selectedDate).format("MMM Do YYYY"): moment(today).format("MMM Do YYYY")}</Typography> */}
                                <Typography variant="overline" gutterBottom>Amount</Typography>
                                <Typography variant="h6" gutterBottom>PHP {toCommas(total)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container mt={5}>
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
                                      {jobOrderData.items.map((itemField, index) => (
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
                                    <Typography>Job-Order Summary</Typography>
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
                              onChange={(e) => setJobOrderData({...jobOrderData, notes: e.target.value})}
                              value={jobOrderData.notes}
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
}