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
import { deleteInvoiceAction, setInvoiceAction } from '../../redux/invoiceAction';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import Notification from '../dialogs/Notification';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// import { applicants } from '../../__mocks__/customers';

export const InvoiceListResult = () => {
    // const [invoices, setInvoices] = useState(null)
    const dispatch = useDispatch()
    const user = useSelector(selectCurrentUser)
    const [limit, setLimit] = useState(10)
    const [getallinvoice] = useGetallinvoiceMutation()
    const [deleteinvoice] = useDeleteinvoiceMutation()
    const invoices = useSelector(store => store.invoice.invoices)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState("")
    // const overDue = invoices?.filter((invoice) => invoice.dueDate <= new Date().toISOString())

    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };

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
          <Box sx={{ m: 1 }}>
            {/* <Button
              startIcon={(<UploadIcon fontSize="small" />)}
              sx={{ mr: 1 }}
            >
              Import
            </Button> */}
            {/* <Button
              startIcon={(<DownloadIcon fontSize="small" />)}
              sx={{ mr: 1 }}
            >
              Export
            </Button>
            <Button
              color="primary"
              variant="contained"
              // onClick={() => { setOpenPopup(true)}}
            >
              Create Job Order
            </Button> */}
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
              <Box sx={{ maxWidth: 300 }}>
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
                  placeholder="Search client invoice"
                  variant="outlined"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Box>
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
                 {invoices?.filter((invoice) =>
                  invoice.client?.name.toLowerCase().includes(query)).slice(page*limit, page*limit+limit).map((invoice) => (
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
                    {dayjs(invoice.dueDate).fromNow()}
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
