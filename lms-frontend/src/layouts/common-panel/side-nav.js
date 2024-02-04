import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  makeStyles,
  useMediaQuery
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

import studentSideBarConfig from '../student-panel/dashboard/config';
import adminSideBarConfig from '../admin-panel/dashboard/config';
import lecturerSideBarConfig from '../lecturer-panel/dashboard/config';

import { SideNavItem } from './side-nav-item';
import { useAuthContext } from 'src/contexts/auth-context';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const { authData } = useAuthContext();

  let sideBarConfigs = [];

  if (pathname.startsWith('/student-panel')) {
    sideBarConfigs = studentSideBarConfig
  } else if (pathname.startsWith('/admin-panel')) {
    sideBarConfigs = adminSideBarConfig
  } else if (pathname.startsWith('/lecturer-panel')) {
    sideBarConfigs = lecturerSideBarConfig
  }

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255)',
              color: 'black',
              borderRadius: 1,
              cursor: 'pointer',
              mt: 2,
              p: '12px'
            }}
          >
            {/* <Card sx={{ maxWidth: 345, marginBottom: '20px' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/assets/auth-illustration.jpg"
                  alt="green iguana"
                />
              </CardActionArea>
            </Card> */}
            <Card style={{
              textAlign: 'center',
            }}>
              <Avatar style={{
                width: 100,
                height: 100,
                margin: 'auto',
                marginTop: 3,
              }} alt="User Avatar" src="/assets/avatars/avatar-marcus-finn.png" />

              <CardContent sx={{ p: 1 }}>
                <Typography variant="h6">
                  {authData?.user?.name}
                </Typography>
                <Typography color="textSecondary" variant="body2" sx={{ textTransform: 'capitalize' }}>
                  {authData?.user?.role}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {authData?.user?.email}
                </Typography>
              </CardContent>
            </Card>

            <Typography sx={{ marginTop: '10px' }}
              align="center"
              variant="h6">
              E-LMS
            </Typography>
            <Typography
              align="center"
              variant="subtitle2">
              Learning Management System
            </Typography>
          </Box>

        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {sideBarConfigs.map((sideBarItem) => {
              let active = false;
              if (sideBarItem.title == 'Dashboard') {
                active = (pathname === sideBarItem.path);
              } else {
                active = sideBarItem.path ? (pathname === sideBarItem.path || pathname.startsWith(sideBarItem.path)) : false;
              }

              return (
                <SideNavItem
                  active={active}
                  disabled={sideBarItem.disabled}
                  external={sideBarItem.external}
                  icon={sideBarItem.icon}
                  key={sideBarItem.title}
                  path={sideBarItem.path}
                  title={sideBarItem.title}
                />
              );
            })}
          </Stack>
        </Box>

      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
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
          backgroundColor: 'neutral.800',
          color: 'common.white',
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

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
