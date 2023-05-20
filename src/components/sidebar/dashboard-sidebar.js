import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Badge, Box, Button, Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ListItemIcon from '@mui/material/ListItemIcon';
import GroupsIcon from '@mui/icons-material/Groups';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Cog as CogIcon } from '../../icons/cog';
import { Lock as LockIcon } from '../../icons/lock';
import { Selector as SelectorIcon } from '../../icons/selector';
import HelpIcon from '@mui/icons-material/Help';
import { User as UserIcon } from '../../icons/user';
import { UserAdd as UserAddIcon } from '../../icons/user-add';
import { Users as UsersIcon } from '../../icons/users';
import { XCircle as XCircleIcon } from '../../icons/x-circle';
import { CardMedia } from '@mui/material';
import { NavItem } from './nav-item';
import { ClientsMenu } from './clientsMenu';
import { SmsMenu } from './smsMenu';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/authSlice';
import SendIcon from '@mui/icons-material/Send';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import ViewListIcon from '@mui/icons-material/ViewList';
import AssignmentIcon from '@mui/icons-material/Assignment'
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import NextLink from 'next/link'

const items = [
  {
    href: '/dashboard',
    icon: (<DashboardIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/dashboard/applicants',
    icon: (<HelpIcon fontSize="small" />),
    title: 'Applicants'
  },
  {
    href: '/dashboard/job-orders',
    icon: (<ViewListIcon fontSize="small" />),
    title: 'Job Orders'
  },
  {
    href: '/dashboard/invoices',
    icon: (<AssignmentIcon fontSize="small" />),
    title: 'Invoices'
  },
  {
    href: '/dashboard/employees',
    icon: (<GroupsIcon fontSize="small" />),
    title: 'Employees'
  },
  {
    href: '/dashboard/email',
    icon: (<EmailIcon fontSize="small" />),
    title: 'Email'
  },
  {
    href: '/dashboard/sms',
    icon: (<MessageIcon fontSize="small" />),
    title: 'SMS'
  },
  {
    href: '/dashboard/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Profile'
  },
  {
    href: '/dashboard/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },
];
const siteSettings = [
  {
    href: '/dashboard/slider-settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Home Slider'
  },
  {
    href: '/dashboard/plans-settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Internet Plans Settings'
  },
]

const clientsItem = [
  {
    href: '/dashboard/clients/clients-all',
    icon: (<GroupsIcon fontSize="small" />),
    title: 'All Clients'
  },
  {
    href: '/dashboard/clients/clients-due',
    icon: (<GroupsIcon fontSize="small" />),
    title: 'Due Clients'
  },
  {
    href: '',
    icon: (<GroupsIcon fontSize="small" />),
    title: 'Client3'
  },
]

const smsItem = [
  {
    href: '/dashboard/sms/compose',
    icon: (<SendIcon fontSize="small" />),
    title: 'Compose'
  },
  {
    href: '/dashboard/sms/sent',
    icon: (<MarkChatReadIcon fontSize="small" />),
    title: 'Sent'
  },
]

export const DashboardSidebar = (props) => {
  const user = useSelector(selectCurrentUser)
  const applicants = useSelector(state=>state.applicants.applicants)
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });
  const [siteNavOpen, setSiteNavOpen] = useState(false)

  const handleSiteSettingsClick = () => {
    setSiteNavOpen(!siteNavOpen)
  }

  const [clientNavOpen, setClientNavOpen] = useState(false);

  const handleClick = () => {
    setClientNavOpen(!clientNavOpen);
  };

  const [smsNavOpen, setSmsNavOpen] = useState(false);

  const smshandleClick = () => {
    setSmsNavOpen(!smsNavOpen);
  };
    

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box>
            <Link
              href="/dashboard"
              passHref
            >
                <img
                  src='/static/images/rdnaksLogo2.png'
                  alt='Rdnaks Logo'
                  style={{height: '120px'}}
                />
            </Link>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Welcome {user?.name}
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Role
                  {' '}
                  : {user?.role}
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {/* {items.map((item) => ( */}
            {/* <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            /> */}
            <NavItem
              icon={<DashboardIcon fontSize="small" />}
              href='/dashboard'
              title='Dashboard'
            />
            <NavItem
              icon={<HelpIcon fontSize="small" />}
              href='/dashboard/applicants'
              title={<Badge
                badgeContent={applicants.length} 
                color="primary"
                >Applicants</Badge>}
            />
            {user?.role !== "Collector" &&
            <NavItem
              icon={<ViewListIcon fontSize="small" />}
              href='/dashboard/job-orders'
              title='Job Orders'
            />
            }
            {user?.role !== "Installer" &&
            <NavItem
              icon={<AssignmentIcon fontSize="small" />}
              href='/dashboard/invoices'
              title='Invoices'
            />
            }
            {user?.role === "Super Admin" &&
            <NavItem
              icon={<GroupsIcon fontSize="small" />}
              href='/dashboard/employees'
              title='Employees'
            />
            }
            {(user?.role === "Super Admin" || user?.role === "Encoder") &&
            <NavItem
              icon={<EmailIcon fontSize="small" />}
              href='/dashboard/email'
              title='Email'
            />
            }
            {(user?.role === "Super Admin" || user?.role === "Encoder") &&
            <NavItem
              icon={<MessageIcon fontSize="small" />}
              href='/dashboard/sms'
              title='SMS'
            />
            }
            <NavItem
              icon={<UserIcon fontSize="small" />}
              href='/dashboard/account'
              title='Profile'
            />
            <NavItem
              icon={<CogIcon fontSize="small" />}
              href='/dashboard/settings'
              title='Settings'
            />
          {/* ))} */}
          {user?.role === "Super Admin" &&
          <>
            <List
              sx={{mb: 0.5, py: 0, px: 2}}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
            <ListItemButton onClick={handleSiteSettingsClick}>
                <ListItemIcon>
                  <CogIcon />
                </ListItemIcon>
                <ListItemText primary="Site Settings" />
                {siteNavOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
              {siteSettings.map((item) => (
                <ClientsMenu
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                  open={siteNavOpen}
                />
              ))}
          </List>
          {/* <List
              sx={{mb: 0.5, py: 0, px: 2}}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Clients" />
                {clientNavOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
              {clientsItem.map((item) => (
                <ClientsMenu
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                  open={clientNavOpen}
                />
              ))}
          </List> */}
          </>
        }
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/sidebar_pro.png"
            />
          </Box>
          <NextLink
            href="#"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Request a feature
            </Button>
          </NextLink>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
