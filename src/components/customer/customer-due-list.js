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
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { getInitials } from '../../utils/get-initials';
import { useDispatch, useSelector } from 'react-redux';
import { getFetchedClients, getPageLimit, setPageLimit } from '../../redux/authSlice';
// import { clients } from '../../__mocks__/customers';

Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}
const CustomerDueList = ({ ...rest }) => {
  const dispatch = useDispatch()
  const clients = useSelector(getFetchedClients)
  const limit = useSelector(getPageLimit)
//   const sort = useSelector(getSortName)
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState("")

  // const emptyRows = limit-Math.min(limit, clients?.length-page*limit)

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
          {`Due Clients as of ${format(new Date(), "MMM dd, yyyy")}`}
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
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
                  placeholder="Search client"
                  variant="outlined"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Grid>
            </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>

    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {clients?.filter((clients) =>
                clients.name.toLowerCase().includes(query)).slice(page*limit, page*limit+limit).map((clients, id) => (
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
                      <Avatar
                        src={clients.photo}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(clients.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {clients.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {clients.email}
                  </TableCell>
                  <TableCell>
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
                    {/* {format(clients.createdAt, 'dd/MM/yyyy')}s */}
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
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={clients?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={(e) => dispatch(setPageLimit(e.target.value))}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  </>
  );
};

export default CustomerDueList
// CustomerListResults.propTypes = {
//   // clients: PropTypes.array.isRequired
// };
