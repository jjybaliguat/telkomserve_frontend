import { useEffect, useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { DownloadTableExcel } from 'react-export-table-to-excel';
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
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TableContainer,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { getInitials } from '../../utils/get-initials';
import { useDispatch, useSelector } from 'react-redux';
import {deleteClientsAction, getFetchedClients, getPageLimit, getSortName, selectCurrentUser, setPageLimit, setSort, updateClientsAction } from '../../redux/authSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useDeleteclientMutation, useGetallclientsMutation, useRegisterclientMutation } from '../../redux/authApiSlice';
import Popup from '../dialogs/Popup';
import Notification from '../dialogs/Notification';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import AddClientFormDialog from '../dialogs/AddClientFormDialog';
import { addClientAction, deleteClientAction, setClientsAction } from '../../redux/clientSlice';
import Router from  'next/router'
import format from 'date-fns/format';
import { ExportOptionsPopOver } from './export-popup';
// import { clients } from '../../__mocks__/customers';

// export async function getServerSideProps() {
//   const data = await axios.get('')
//   const fetched = data.data.clients
//   // dispatch(setClientsAction(fetched))
//   return {
//     props: {
//       clients: fetched
//     }
//   }
// }

Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}

const CustomerListResults = () => {
  const csvRef = useRef(null);
  const exportRef = useRef(null);
  const printRef = useRef(null);
  const [openExportPopup, setOpenExportPopup] = useState(false)
  const dispatch = useDispatch()
  const clients = useSelector(store => store.clients.clients)
  const user = useSelector(selectCurrentUser)
  const [deleteclient] = useDeleteclientMutation()
  const [registerclient] = useRegisterclientMutation()
  const [getallclients] = useGetallclientsMutation()
  const limit = useSelector(getPageLimit)
  const sort = useSelector(getSortName)
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [loading, setLoading] = useState(false)

  // const emptyRows = limit-Math.min(limit, clients?.length-page*limit)

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async (id) => {

      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    const data = await deleteclient(id)
    if(data){
      dispatch(deleteClientAction({id}))
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'success'
      })
    }
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
          Clients
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
                onClick={() => setOpenExportPopup(true)}
                ref={exportRef}
              >
                Export
              </Button>
              <ExportOptionsPopOver
                anchorEl={exportRef.current}
                csvRef={csvRef.current}
                printRef={printRef.current}
                open={openExportPopup}
                onClose={() => setOpenExportPopup(false)}
              />
          {/* <Button
            color="primary"
            variant="contained"
            onClick={() => { setOpenPopup(true)}}
          >
            Add Client
          </Button> */}
        </Box>
      </Box>
      <Box sx={{ mt: 3}}>
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
                xs={8}
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
                  placeholder="Search client"
                  variant="outlined"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={4}
              >
                <FormControl fullWidth>
                  <InputLabel id="sortBy">Sort By</InputLabel>
                    <Select
                      labelId="sortBy"
                      id="demo-simple-select"
                      value={sort}
                      label="Age"
                      onChange={(e) => dispatch(setSort(e.target.value))}
                    >
                      <MenuItem value='createdAt'>createdAt</MenuItem>
                      <MenuItem value='name'>name</MenuItem>
                      <MenuItem value='dueDate'>Due date</MenuItem>
                      <MenuItem value='installationDate'>Installation Date</MenuItem>
                    </Select>
                </FormControl>
              </Grid>
            </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
     {clients?.length?             
    <Card ref={printRef}>
        <Box sx={{minWidth: 300, padding: "1.5rem" }}>
        <TableContainer>
        <PerfectScrollbar>
          <Table ref={csvRef} size="small">
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === clients?.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < clients?.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Internet Plan
                </TableCell>
                <TableCell>
                  Account Number
                </TableCell>
                <TableCell>
                  Due Date
                </TableCell>
                <TableCell>
                  Installation Date
                </TableCell>
                {user?.role === "Super Admin" || user?.role === "Encoder" ?
                  <TableCell>
                    Actions
                  </TableCell> : ""
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {clients?.sortBy(sort).filter((clients) =>
                clients?.name?.toLowerCase().includes(query)).slice(page*limit, page*limit+limit).map((clients, id) => (
                <TableRow
                  hover
                  key={id}
                  selected={selectedCustomerIds.indexOf(id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(id) !== -1}
                      onChange={(event) => handleSelectOne(event, id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={clients.photo}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(clients.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {clients.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {clients.email}
                  </TableCell>
                  <TableCell sx={{minWidth: 200}}>
                    {clients.address}
                  </TableCell>
                  <TableCell>
                    {clients.phone}
                  </TableCell>
                  <TableCell>
                    {clients.internetPlan}
                  </TableCell>
                  <TableCell>
                    {clients.accountNumber}
                  </TableCell>
                  <TableCell>
                    {clients.dueDate}
                  </TableCell>
                  <TableCell>
                    {format(new Date(clients.installationDate), "MM-dd-yyyy")}
                  </TableCell>
                  {user?.role === "Super Admin" || user?.role === "Encoder" ?
                    <TableCell>
                      <Box sx={{display: "flex"}}>
                        <Tooltip title="delete" placement="top" arrow>
                          <IconButton aria-label="delete" color="error">
                            <DeleteIcon title="delete" onClick={() => {
                                setConfirmDialog({
                                    isOpen: true,
                                    title: 'Are you sure yo want to delete this client?',
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => { handleDelete(clients._id) }
                                })}} fontSize="small"/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="view full info" placement="top" arrow>
                          <IconButton aria-label="edit" sx={{color: "info.main"}}
                            onClick={() => {Router.push(`/dashboard/clients/${clients._id}`)}}>
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell> : ""
                  }
                </TableRow>
              ))}
              {/* {emptyRows > 0 && (
                <TableRow style={{height: 76*emptyRows}}>
                  <TableCell/>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
          </PerfectScrollbar>
          </TableContainer>
        </Box>
      <TablePagination
        component="div"
        count={clients?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={(e) => dispatch(setPageLimit(e.target.value))}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
    </Card>
      :
      <Card sx={{padding: 15}}>
        <Typography variant='h5' align='center'>No Clients Available, click Add Client</Typography>
      </Card>
      }
      
    {/* <AddClientFormDialog
      openPopup={openPopup} 
      setOpenPopup={setOpenPopup} 
      addClient={addClient}
      loading={loading}>
    </AddClientFormDialog> */}
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
};

export default CustomerListResults

// CustomerListResults.propTypes = {
//   // clients: PropTypes.array.isRequired
// };
