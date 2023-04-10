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
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { getInitials } from '../../utils/get-initials';
import Router from  'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { useGetallapplicantsMutation } from '../../redux/authApiSlice';
import { setApplicantsAction } from '../../redux/applicantSlice';
import Empty from '../svgIcons/Empty';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
// import { applicants } from '../../__mocks__/customers';

export const ApplicantsListResults = ({ ...rest }) => {
  const dispatch = useDispatch()
  const [getallapplicants] = useGetallapplicantsMutation()
  const applicants = useSelector(store => store.applicants.applicants)
  const [selectedApplicantIds, setSelectedApplicantIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("")
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  // const emptyRows = limit-Math.min(limit, applicants?.length-page*limit)

  useEffect(() => {
    getAllApplicants()
  }, [])

  async function getAllApplicants() {
    try {
      const data = await getallapplicants()
      const fetched = data.data.applicants
      dispatch(setApplicantsAction(fetched))
    } catch (error) {
      console.log(error);
    }
  }


  const handleSelectAll = (event) => {
    let newselectedApplicantIds;

    if (event.target.checked) {
      newselectedApplicantIds = applicants?.map((applicants, id) => id);
    } else {
      newselectedApplicantIds = [];
    }

    setSelectedApplicantIds(newselectedApplicantIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedApplicantIds.indexOf(id);
    let newselectedApplicantIds = [];

    if (selectedIndex === -1) {
      newselectedApplicantIds = newselectedApplicantIds.concat(selectedApplicantIds, id);
    } else if (selectedIndex === 0) {
      newselectedApplicantIds = newselectedApplicantIds.concat(selectedApplicantIds.slice(1));
    } else if (selectedIndex === selectedApplicantIds.length - 1) {
      newselectedApplicantIds = newselectedApplicantIds.concat(selectedApplicantIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedApplicantIds = newselectedApplicantIds.concat(
        selectedApplicantIds.slice(0, selectedIndex),
        selectedApplicantIds.slice(selectedIndex + 1)
      );
    }

    setSelectedApplicantIds(newselectedApplicantIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  if(applicants.length === 0){
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
      <Empty />
      <p style={{padding: '40px', color: 'gray'}}>No Applicants As of Now</p>
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
          Applicants
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
          <Button
            color="primary"
            variant="contained"
            // onClick={() => { setOpenPopup(true)}}
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
                placeholder="Search Applicants"
                variant="outlined"
                onChange={(e) => setQuery(e.target.value)}
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
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedApplicantIds.length === applicants?.length}
                    color="primary"
                    indeterminate={
                      selectedApplicantIds.length > 0
                      && selectedApplicantIds.length < applicants?.length
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicants?.filter((applicants) =>
                applicants.name.toLowerCase().includes(query)).slice(page*limit, page*limit+limit).map((applicants, id) => (
                <TableRow
                  hover
                  key={id}
                  selected={selectedApplicantIds.indexOf(id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedApplicantIds.indexOf(id) !== -1}
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
                      <Avatar
                        src={applicants.photo}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(applicants.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body2"
                      >
                        {applicants.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {applicants.email}
                  </TableCell>
                  <TableCell>
                    {applicants.address}
                  </TableCell>
                  <TableCell>
                    {applicants.phone}
                  </TableCell>
                  <TableCell>
                    {applicants.internetPlan}
                  </TableCell>
                  <TableCell>
                    {applicants.accountNumber}
                  </TableCell>
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
                            onClick={() => {Router.push(`/dashboard/clients/${applicants._id}`)}}
                            >
                            <InfoIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                  </TableCell>
                </TableRow>
              ))}
              {/* {emptyRows > 0 && (
                <TableRow style={{height: 76*emptyRows}}>
                  <TableCell/>
                </TableRow>
              )} */}
            </TableBody>
          </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={applicants?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  </>
  );
};

// CustomerListResults.propTypes = {
//   // applicants: PropTypes.array.isRequired
// };
