import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  SvgIcon,
  CardContent,
  InputAdornment,
  Grid,
  Divider,
  TableContainer,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { ShoppingBag } from '../../icons/shopping-bag';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import Router, { useRouter } from  'next/router'
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../svgIcons/NoData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { selectCurrentUser, setPageLimit } from '../../redux/authSlice';
import { useDeleteinvoiceMutation, useGetallinvoiceMutation } from '../../redux/invoiceApiSlice';
import { deleteInvoiceAction, setFilter, setInvoiceAction, setSort } from '../../redux/invoiceAction';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import Notification from '../dialogs/Notification';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(relativeTime)
dayjs.extend(isTomorrow)
dayjs.extend(isToday)
// import { applicants } from '../../__mocks__/customers';

export const InvoiceListResult = () => {
    // const [invoices, setInvoices] = useState(null)
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    const [limit, setLimit] = useState(10)
    const [getallinvoice] = useGetallinvoiceMutation()
    const [deleteinvoice] = useDeleteinvoiceMutation()
    const invoices = useSelector(store => store.invoice.invoices)
    const [invoiceList, setInvoiceList] = useState(invoices)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState("")
    const filter = useSelector(store=>store.invoice.filter)
    const [status, setStatus] = useState("all")
    const today = dayjs().date()

    function getDate(num){
      const daysinMonth = dayjs().daysInMonth()
      const lastDay_lastMonth = dayjs().date(0).date()
      const ans = today + num
      if(ans > daysinMonth){
        return ans - daysinMonth
      }else if(ans <= 0){
        return ans + lastDay_lastMonth
      }
      else{
        return ans
      }
    }


    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };

    useEffect(()=>{
      if(!filter || filter === "all"){
        if(status === 'all'){
          setInvoiceList(invoices)
        }else{
        setInvoiceList(invoices.filter((invoice)=>invoice.status === status))
        }
      }else if(filter === "overdue"){
        setInvoiceList(invoices?.filter((invoice) => invoice.dueDate <= new Date().toISOString() && invoice.status === "UNPAID"))
      }
      else{
        const newList = []
        invoices.map((item)=> {
          if(filter == dayjs(item.dueDate).date() && dayjs(item.dueDate).month() === dayjs().month()){
            newList.push(item)
          }
        })
        if(status === 'all'){
          setInvoiceList(newList)
        }else{
          setInvoiceList(newList.filter((invoice)=>invoice.status === status))
        }
      }
      }, [filter, status])

      // useEffect(()=> {
      //   // console.log(status);
      //   if(status === "all"){
      //     setInvoiceList(invoiceList)
      //   }else if(status === "PAID"){
      //     console.log(status);
      //     setInvoiceList(invoiceList.filter((invoice)=>invoice.status === "PAID"))
      //   }else if(status === "UNPAID"){
      //     setInvoiceList(invoiceList.filter((invoice)=>invoice.status === "UNPAID"))
      //   }else if(status === "PARTIAL"){
      //     setInvoiceList(invoiceList.filter((invoice)=>invoice.status === "PARTIAL"))
      //   }
      // }, [status])

    const handleDelete = async(id) => {
      const response = await deleteinvoice(id)
      if(response){
        dispatch(deleteInvoiceAction(id))
        setNotify({
          isOpen: true,
          message: 'Invoice Deleted Successfully',
          type: 'success'
        })
      }else{
        setNotify({
          isOpen: true,
          message: 'Failed Deleting',
          type: 'error'
        })
      }

      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    }
    // return <div style={{display: 'flex', alignItems: 'center', 
    //   justifyContent: 'center', flexDirection: 'column', paddingTop: '20px',
    //   }}>
    //   <img 
    //       src='/static/images/underDevelopment.svg'
    //       style={{height: '300px'}}
    //   />
    //   <p style={{padding: '40px', color: 'gray'}}>Invoice Section is under development!</p>
    // </div>

if(!invoices?.length || !invoices){
        return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <NoData />
        <p style={{padding: '40px', color: 'gray'}}>No invoice yet. Click the plus icon to create invoice</p>
      </div>
 }     

if(user?.role === "Super Admin" || user?.role === "Encoder" || user?.role === "Collector"){
  return (
    invoices?.length &&
      <>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
       <Notification
        notify={notify}
        setNotify={setNotify}
       />
      <Box sx={{ mb: 3 }}>
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
            Invoices
          </Typography>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex'}}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            color="action"
                            fontSize="small"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Search client by name"
                    variant="outlined"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  md={3}
                  xs={6}
                >
                  <FormControl fullWidth>
                    <InputLabel id="sortBy">Filter Due Date</InputLabel>
                      <Select
                        labelId="sortBy"
                        id="demo-simple-select"
                        value={filter}
                        label="Age"
                        onChange={(e) => dispatch(setFilter(e.target.value))}
                      >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="overdue">Over Due</MenuItem>
                        <MenuItem value={`${getDate(-1)}`}>Due yesterday</MenuItem>
                        <MenuItem value={`${getDate(0)}`}>Due today</MenuItem>
                        <MenuItem value={`${getDate(1)}`}>Due tomorrow</MenuItem>
                      </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={3}
                  xs={6}
                >
                  <FormControl fullWidth>
                    <InputLabel id="sortBy">Filter Status</InputLabel>
                      <Select
                        labelId="status"
                        id="demo-simple-select"
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="PAID">Paid</MenuItem>
                        <MenuItem value="UNPAID">Unpaid</MenuItem>
                        <MenuItem value="PARTIAL">Partial</MenuItem>
                      </Select>
                  </FormControl>
                </Grid>
              </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
  
      <Card>
        <PerfectScrollbar>
          <Box>
            <TableContainer>
            <Table sx={{ minWidth: 600 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Invoice Number
                  </TableCell>
                  <TableCell>
                    Client Name
                  </TableCell>
                  <TableCell>
                    Acoount Number
                  </TableCell>
                  <TableCell>
                    Amount
                  </TableCell>
                  <TableCell>
                    Due Date
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {invoiceList?.filter((invoice) =>
                  invoice?.client?.name.toLowerCase().includes(query)).slice(page*limit, page*limit+limit).map((invoice) => (
                  <TableRow
                  hover
                  key={invoice._id}
                  sx={{cursor: "pointer"}}
                >
                  <TableCell sx={{minWidth: 100}} onClick={() => Router.push(`invoice/${invoice._id}`)}>
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell onClick={() => Router.push(`invoice/${invoice._id}`)}>
                    {invoice.client.name}
                  </TableCell>
                  <TableCell onClick={() => Router.push(`invoice/${invoice._id}`)}>
                  {invoice.client.accountNumber}
                  </TableCell>
                  <TableCell onClick={() => Router.push(`invoice/${invoice._id}`)}>
                    {invoice.total}
                  </TableCell>
                  <TableCell sx={{minWidth: 100}} onClick={() => Router.push(`invoice/${invoice._id}`)}>
                    {dayjs(invoice.dueDate).isToday() ? "today" : dayjs(invoice.dueDate).isTomorrow()? "tomorrow" : dayjs(invoice.dueDate).fromNow()}
                  </TableCell>
                  <TableCell onClick={() => Router.push(`invoice/${invoice._id}`)}>
                    <Button variant="contained" color={`${invoice.status === "PAID"? "success" : invoice.status === "PARTIAL"? "warning" : "error"}`} sx={{padding: "0"}}>{invoice.status}</Button>
                  </TableCell>
                  <TableCell>
                    <Box sx={{display: "flex"}}>
                      <Tooltip title="Edit" placement="top" arrow>
                            <IconButton aria-label="edit" sx={{color: "info.main"}}
                              onClick={()=> window.location.href = `/dashboard/invoice/edit/${invoice._id}`}
                              disabled={invoice.status === "PAID"}
                              >
                              <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="delete" placement="top" arrow>
                          <IconButton aria-label="delete" color="error"
                          onClick={() => {
                            setConfirmDialog({
                                isOpen: true,
                                title: 'Are you sure yo want to delete this invoice?',
                                subTitle: "You can't undo this operation",
                                onConfirm: () => { handleDelete(invoice._id) }
                            })}} fontSize="small"
                            >
                            <DeleteIcon title="delete" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={invoices?.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={(e) => setLimit(e.target.value)}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
  }else{
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',height: "100vh", flexDirection: 'column'}}>
        <h1>Unauthorized!</h1>
        <p style={{padding: '40px', color: 'gray'}}>Sorry, you are not allowed to access this resource!</p>
      </div>
  }
}
// CustomerListResults.propTypes = {
//   // applicants: PropTypes.array.isRequired
// };
