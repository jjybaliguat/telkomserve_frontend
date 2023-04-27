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
import Router from  'next/router'
import { useDispatch, useSelector } from 'react-redux';
import NoData from '../svgIcons/NoData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { selectCurrentUser } from '../../redux/authSlice';
import { useDeleteemployeeMutation, useGetallemployeeMutation } from '../../redux/employeeApiSlice';
import Empty from '../svgIcons/Empty';
import { deleteEmployeeAction, setEmployeeAction } from '../../redux/employeesAction';
import { getInitials } from '../../utils/get-initials';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import Notification from '../dialogs/Notification';
// import { applicants } from '../../__mocks__/customers';

Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}

export const EmployeeListResult = () => {
    const dispatch = useDispatch()
    const [getallemployee] = useGetallemployeeMutation()
    const [deleteemployee] = useDeleteemployeeMutation()
    const employees = useSelector(store => store.employees.employees)
    const user = useSelector(selectCurrentUser)
    const [page, setPage] = useState(0)
    const [query, setQuery] = useState("")
    const [limit, setLimit] = useState(5)
    const [openPopup, setOpenPopup] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [loading, setLoading] = useState(false)

    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };

// if(!employees.length){
//         return <div style={{display: 'flex', alignItems: 'center', 
//             justifyContent: 'center', flexDirection: 'column', paddingTop: '20px',
//             }}>
//         <Empty />
//         <p style={{padding: '40px', color: 'gray'}}>No Employees Found!</p>
//       </div>
//  }

useEffect(()=> {
  getAllEmployee()
},[])

  async function getAllEmployee(){
    const response = await getallemployee()
    dispatch(setEmployeeAction(response.data))
  }

  const handleDelete = async (id) => {

    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
  })
  const data = await deleteemployee(id)
  if(data){
    dispatch(deleteEmployeeAction({id}))
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'success'
    })
  }
  }

if((user?.role === "Super Admin" || user?.role === "Encoder")){
  return (
    <>
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
          Employees
        </Typography>
        <Box sx={{ m: 1 }}>
          {/* <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button> */}
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
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
                placeholder="Search employee"
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Employee Name
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                {user?.role === "Super Admin" &&
                <TableCell>
                  Actions
                </TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {employees?.sortBy('name').filter((employee) =>
                (employee._id !== "642aa59766e4b8ea8d8d700a" && employee.name?.toLowerCase().includes(query))).slice(page*limit, page*limit+limit).map((employee, id) => (
                  <TableRow
                  hover
                  key={id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={employee.photo}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(employee.photo)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {employee.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {employee.role}
                  </TableCell>
                  <TableCell>
                    {employee.phone}
                  </TableCell>
                  <TableCell>
                    {employee.email}
                  </TableCell>
                  {user?.role === "Super Admin" &&
                  <TableCell>
                    <Box sx={{display: "flex"}}>
                        <Tooltip title="delete" placement="top" arrow>
                          <IconButton aria-label="delete" color="error">
                            <DeleteIcon title="delete" 
                            onClick={() => {
                                setConfirmDialog({
                                    isOpen: true,
                                    title: 'Are you sure yo want to delete this Employee?',
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => { handleDelete(employee._id) }
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
                  }
                </TableRow>
                ))
              }
            </TableBody>
          </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={employees?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={(e) => setLimit(e.target.value)}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
    <ConfirmDialog
      confirmDialog={confirmDialog}
      setConfirmDialog={setConfirmDialog}
    />
     <Notification
      notify={notify}
      setNotify={setNotify}
     />
  </>
  );
  }else{
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',height: "100vh", flexDirection: 'column'}}>
        <img src="/assets/errors/error-401.png" height={300} />
        <p style={{padding: '40px', color: 'gray'}}>Sorry, you are not allowed to access this resource!</p>
      </div>
  }
};

// CustomerListResults.propTypes = {
//   // applicants: PropTypes.array.isRequired
// };
