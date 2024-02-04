import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
import { alpha, darken, makeStyles } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import React, { useState } from 'react';
import { items } from '../admin-panel/dashboard/config';
import { usePathname } from 'next/navigation';
import SearchIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';


const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.65),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    fontWeight: 'bold',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '60ch',
      },
    },
  }));


  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const accountPopover = usePopover();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Assignment',
      description: 'You have a new assignment in "Mathematics 101".',
    },
    {
      id: 2,
      title: 'Upcoming Quiz',
      description: 'Reminder: Quiz on "History 202" is scheduled for tomorrow.',
    },
    {
      id: 3,
      title: 'Course Enrollment',
      description: 'You have been enrolled in the course "Computer Science 301".',
    },
  ]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllRead = () => {
    // Add logic to mark all notifications as read
    setNotifications(0);
    handleMenuClose();
  };

  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => darken(theme.palette.primary.dark, 0.1),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>

          <Toolbar sx={{ flexGrow: 1 }}>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            </Box>

            <Box>
              <Search>
                <SearchIconWrapper>
                  <SvgIcon>
                    <SearchIcon />
                  </SvgIcon>
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              {/* {items.filter(i => !i.disableFromTop).map((page) => {
                let active = false;
                if (page.path == '/admin-panel/') {
                  active = (pathname === page.path);
                } else {
                  active = page.path ? (pathname === page.path || pathname.startsWith(page.path)) : false;
                }
                return (
                  <Button
                  href={page.path}
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, mx: 0.8, color: 'white', display: 'block', background: active && 'rgba(255,255,255,0.1)' }}
                  >
                    {page.title}
                  </Button>
                )
              })} */}

            </Box>


          </Toolbar>


          <Stack
            direction="row"
            spacing={2}
          >
            <Tooltip title="Notifications">
              <IconButton
                aria-controls="notifications-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}>

                <SvgIcon fontSize="small">
                  <BellIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton onClick={() => {
                window.sessionStorage.removeItem('user')
                router.push('/auth/login')
              }}>
                <SvgIcon fontSize="small">
                  <ArrowTopRightOnSquareIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip> */}
            {/* <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            /> */}
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.id}>
             {!notification.read && (
              <Badge color="secondary" variant="dot" invisible={notification.read}>
                &nbsp;
              </Badge>
            )}
            <div style={{marginLeft: '20px'}}>
              <Typography variant="subtitle1">{notification.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {notification.description}
              </Typography>
            </div>
           
            <div>
              {/* <IconButton
                onClick={() => handleMarkAsRead(notification.id)}
              >
                Mark as Read
              </IconButton> */}
            </div>
          </MenuItem>
        ))}

        {/* Mark all as read */}
        <MenuItem onClick={handleMarkAllRead}>
          <Typography variant='body2'>Mark all as read</Typography></MenuItem>
      </Menu>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
