import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import Router from  'next/router'
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../svgIcons/NoData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { useDeletejoborderMutation, useGetalljoborderMutation } from 'src/redux/jobOrderApiSlice';
import { deleteJobOrderAction, setJobOrder } from 'src/redux/jobOrderAction';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import Notification from '../dialogs/Notification';
// import { applicants } from '../../__mocks__/customers';

export const JobOrdersResult = () => {
    const dispatch = useDispatch()
    const joborders = useSelector(store => store.joborders.jobOrders)
    const [getalljoborder] = useGetalljoborderMutation()
    const [deletejoborder] = useDeletejoborderMutation()
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState("")
    const [limit, setLimit] = useState(10)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };

    useEffect(()=>{
      getAllJobOrders()
    }, [])

    const getAllJobOrders = async() => {
      const response = await getalljoborder()
      if(response.data){
        dispatch(setJobOrder(response.data))
      }
    }


    const handleDelete = async(id) => {
      const response = await deletejoborder(id)
      if(response){
        dispatch(deleteJobOrderAction(id))
        setNotify({
          isOpen: true,
          message: 'Job Order Deleted Successfully',
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

    if(!joborders.length || !joborders){
        return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <NoData />
        <p style={{padding: '40px', color: 'gray'}}>No job-orders yet. Check your applicants list and create job-orders</p>
      </div>
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
          Job-Orders
        </Typography>
        <Box sx={{ m: 1 }}>
          {/* <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button> */}
          <Button
            color="primary"
            variant="contained"
            onClick={() => Router.push("/dashboard/job-order")}
          >
            Create Job Order
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
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
                placeholder="Search Job Order by applicant name"
                variant="outlined"
                onChange={(e) => setQuery(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>

    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 425 }}>
          <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  Job-Order Number
                </TableCell>
                <TableCell>
                  Applicant Name
                </TableCell>
                <TableCell>
                  Installation Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {joborders.filter((joborder)=>
                joborder?.applicant?.name.toLowerCase().includes(query)).slice(page*limit, page*limit+limit).map((joborder)=>(
                <TableRow
                  hover
                  key={joborder._id}
                  sx={{cursor: "pointer"}}
                >
                  <TableCell onClick={() => Router.push(`/dashboard/job-order/${joborder._id}`)}>
                    {joborder?.jobOrderNumber}
                  </TableCell>
                  <TableCell onClick={() => Router.push(`/dashboard/job-order/${joborder._id}`)}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {joborder?.applicant?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell onClick={() => Router.push(`/dashboard/job-order/${joborder._id}`)}>
                    {moment(joborder?.installationDate).format("MMM Do YYYY")}
                  </TableCell>
                  <TableCell onClick={() => Router.push(`/dashboard/job-order/${joborder._id}`)}>
                  <Button variant="contained" color={`${joborder.status === "DONE"? "success" : "warning"}`} sx={{padding: "0"}}>{joborder.status}</Button>
                  </TableCell>
                  <TableCell>
                    <Box sx={{display: "flex"}}>
                        <Tooltip title="delete" placement="top" arrow>
                          <IconButton aria-label="delete" color="error">
                            <DeleteIcon title="delete" 
                            onClick={() => {
                                setConfirmDialog({
                                    isOpen: true,
                                    title: 'Are you sure yo want to delete this job Order?',
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => { handleDelete(joborder._id) }
                                })}} fontSize="small"
                                />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="view full info" placement="top" arrow>
                          <IconButton aria-label="edit" sx={{color: "info.main"}}
                            // onClick={() => {Router.push(`/dashboard/clients/${applicants._id}`)}}
                            >
                            <EditIcon />
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
        count={joborders?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={(e) => setLimit(e.target.value)}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  </>
  );
};