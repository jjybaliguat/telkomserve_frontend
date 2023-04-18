import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Badge, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { toCommas } from '../../utils/toCommas';
import HistoryIcon from '@mui/icons-material/History';
import dayjs from 'dayjs'

const PaymentHistory = ({paymentRecords}) => {
  return (
    <Box sx={{maxWidth: 1000 , margin: "0 auto", marginTop: "1rem"}}>
      <Accordion sx={{backgroundColor: "gray.light"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <Typography color="#000" sx={{fontWeight: "bold", display: "flex", alignItems: "center"}}>Payment History 
            <Badge badgeContent={paymentRecords?.length} color="primary">
              <HistoryIcon />
            </Badge>
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
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Date Paid
                        </TableCell>
                        <TableCell>
                            Amount Paid
                        </TableCell>
                        <TableCell>
                            Payment Method
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paymentRecords?.map((record) => (
                        <TableRow
                            hover
                            key={record._id}
                            sx={{cursor: "pointer"}}
                      >
                        <TableCell sx={{minWidth: 150}}>
                            {dayjs(record.datePaid).format('MMMM DD, YYYY')}
                        </TableCell>
                        <TableCell>
                            {toCommas(record.amountPaid)}
                        </TableCell>
                        <TableCell>
                            {record.paymentMethod}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
            </Table>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default PaymentHistory