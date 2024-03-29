import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../../redux/authSlice';
import { useLogoutMutation } from '../../redux/authApiSlice';



export const AccountPopover = (props) => {
  const user = useSelector(selectCurrentUser)
  const { anchorEl, onClose, open, ...other } = props;
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()

  const handleSignOut = async() => {
    try {
      await logout()
      dispatch(logOut())
      Router.push('/admin')
    } catch (error) {
      console.log(error);
    }
  };

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
        sx: { width: '300px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user?.email}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
