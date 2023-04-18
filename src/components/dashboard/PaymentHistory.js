import { Accordion, AccordionDetails, AccordionSummary, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import HistoryIcon from '@mui/icons-material/History';
import { toCommas } from '../../utils/toCommas';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const PaymentHistory = ({paymentHistory}) => {
    const user = useSelector(store => store.auth.user)

    const sortHistoryByDate =  paymentHistory.sort(function(a, b) {
        var c = new Date(a.datePaid);
        var d = new Date(b.datePaid);
        return d-c;
    });

    return(
        <Accordion sx={{backgroundColor: "primary.main"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: "#fff"}} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <Typography color="#fff" sx={{fontWeight: "bold"}}>
                {paymentHistory.length ? 'Recent Payments' : 'No payment received yet'}
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box 
          sx={{
            maxHeight: "0",
            padding: "0 1em",
            color: "#2c3e50",
            background: "#fff",
            transition: "all .35s",
            }}
            >
            <PerfectScrollbar>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Paid By
                            </TableCell>
                            <TableCell>
                                Client Name
                            </TableCell>
                            <TableCell>
                                Date Paid
                            </TableCell>
                            <TableCell>
                                Amount Paid
                            </TableCell>
                            <TableCell>
                                Payment Method
                            </TableCell>
                            <TableCell>
                                Note
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortHistoryByDate.slice(-15).map((record) => (
                                <TableRow
                                    hover
                                    key={record._id}
                                    sx={{cursor: "pointer"}}
                            >
                                <TableCell>
                                {user?.name === record.paidBy? `You (${dayjs(record.createdAt).fromNow()})` : `${record.paidBy}(${dayjs(record.createdAt).fromNow()})`}
                                </TableCell>
                                <TableCell>
                                {record.clientName}
                                </TableCell>
                                <TableCell sx={{minWidth: "100px"}}>
                                    {/* {dayjs(record.datePaid).format('MMMM DD YYYY')} */}
                                    {dayjs(record.datePaid).format("MMMM DD, YYYY")}
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: '#00A86B', fontSize: '14px'}}>{toCommas(record.amountPaid)}</Typography>
                                </TableCell>
                                <TableCell>
                                    {record.paymentMethod}
                                </TableCell>
                                <TableCell>
                                    {record.note}
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </TableContainer>
            </PerfectScrollbar>
          </Box>
        </AccordionDetails>
      </Accordion>
    )
}

export default PaymentHistory