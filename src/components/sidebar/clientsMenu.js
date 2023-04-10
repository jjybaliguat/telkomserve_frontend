import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import NextLink from 'next/link';
import { Button, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const ClientsMenu  = (props) => {
  const { href, icon, title, open, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;

  return (
    <Collapse in={open} 
      timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton sx={{ pl: 4 }}>
            <NextLink
                href={href}
                passHref
            >
                <Button
                // component="a"
                startIcon={icon}
                disableRipple
                sx={{
                    backgroundColor: active && 'rgba(255,255,255, 0.08)',
                    borderRadius: 1,
                    color: active ? 'secondary.main' : 'neutral.300',
                    fontWeight: active && 'fontWeightBold',
                    justifyContent: 'flex-start',
                    px: 3,
                    // textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                    color: active ? 'secondary.main' : 'neutral.400'
                    },
                    '&:hover': {
                    backgroundColor: 'rgba(255,255,255, 0.08)'
                    }
                }}
                >
                <Box sx={{ flexGrow: 1 }}>
                    {title}
                </Box>
              </Button>
            </NextLink>
          </ListItemButton>
        </List>
      </Collapse>
  );
}