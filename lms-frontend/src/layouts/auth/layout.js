import PropTypes from 'prop-types';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import Image from 'next/image';

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 6 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '39px',
                lineHeight: '32px',
                mb: 1,
                mt: 4
              }}
              variant="h1"
            >
              Welcome to{' '}
              <Box
                component="a"
                sx={{ color: '#15B79E' }}
                target="_blank"
              >
                E-LMS
              </Box>
            </Typography>
            
            {/* <img
            style={{marginTop: '50px'}}
              alt=""
              src="/assets/auth-illustration.jpg"
            /> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};