import Router from 'next/router';
import PropTypes from 'prop-types';
import { Button, MenuItem, MenuList, Popover } from '@mui/material';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import ReactToPrint from 'react-to-print';
import { Download as DownloadIcon } from '../../icons/download';

export const ExportOptionsPopOver = (props) => {
  const { anchorEl, onClose, open, csvRef, printRef, ...other } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '200px' }
      }}
      {...other}
    >
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '8px 0px'
          }
        }}
      >
        {/* <MenuItem>
        <ReactToPrint
            trigger={() => (
                <Button
                startIcon={(<DownloadIcon fontSize="small" />)}
                >
                    Print/Download
                </Button>
            )}
            content={() => printRef}
        />
        </MenuItem> */}
        <MenuItem>
            <DownloadTableExcel
              filename="clients_list"
              sheet="clients"
              currentTableRef={csvRef}
            >
               <Button 
               startIcon={(<DownloadIcon fontSize="small" />)}
               >
                Export CSV
               </Button>
            </DownloadTableExcel>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

ExportOptionsPopOver.propTypes = {
  anchorEl: PropTypes.any,
  csvRef: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
