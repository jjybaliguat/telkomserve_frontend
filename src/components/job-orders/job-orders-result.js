import { useState } from 'react';
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
// import { applicants } from '../../__mocks__/customers';

export const JobOrdersResult = () => {
    const [jobOrders, setJobOrders] = useState(null)

    return <div style={{display: 'flex', alignItems: 'center', 
      justifyContent: 'center', flexDirection: 'column', paddingTop: '20px',
      }}>
      <img 
          src='/static/images/underDevelopment.svg'
          style={{height: '300px'}}
      />
      <p style={{padding: '40px', color: 'gray'}}>Job-Order Section is under development!</p>
    </div>

    if(jobOrders == null){
        return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <NoData />
        <p style={{padding: '40px', color: 'gray'}}>No job-orders yet. Check your applicants list and create job-orders</p>
      </div>
    }


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
                placeholder="Search client invoice"
                variant="outlined"
                // onChange={(e) => setQuery(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>

    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 425 }}>
          <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Invoice Number
                </TableCell>
                <TableCell>
                  Client Name
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
                  Edit
                </TableCell>
                <TableCell>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                  hover
                //   key={id}
                >
                  <TableCell>
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
                        {/* {applicants.name} */}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {/* {applicants.email} */}
                  </TableCell>
                  <TableCell>
                    {/* {applicants.address} */}
                  </TableCell>
                  <TableCell>
                    {/* {applicants.phone} */}
                  </TableCell>
                  <TableCell>
                    {/* {applicants.internetPlan} */}
                  </TableCell>
                  <TableCell>
                    {/* {applicants.accountNumber} */}
                  </TableCell>
                  <TableCell>
                    <Box sx={{display: "flex"}}>
                        <Tooltip title="delete" placement="top" arrow>
                          <IconButton aria-label="delete" color="error">
                            <DeleteIcon title="delete" 
                            // onClick={() => {
                            //     setConfirmDialog({
                            //         isOpen: true,
                            //         title: 'Are you sure yo want to delete this client?',
                            //         subTitle: "You can't undo this operation",
                            //         onConfirm: () => { handleDelete(clients._id) }
                            //     })}} fontSize="small"
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
            </TableBody>
          </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        // count={applicants?.length}
        // onPageChange={handlePageChange}
        // onRowsPerPageChange={handleLimitChange}
        // page={page}
        // rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  </>
  );
};