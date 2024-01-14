import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid, Paper, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/student-panel/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { AdminDashboardPanel } from 'src/sections/overview/admin-dashboard-panel';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const now = new Date();

const Page = () => {
  const router = useRouter();
  // useEffect(() => {
  //   router.push('/student-panel/assignments')
  // }, [])

  return (
    <>
      <Head>
        <title>
          Overview | E-LMS
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth="xl">

          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              lg={12}
            >
              <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h5" gutterBottom>
                  Welcome Arshad Ameen!
                </Typography>

                <Box mt={2}>
                  <Typography variant="subtitle1">Happy Learning!</Typography>
                </Box>
              </Paper>

            </Grid>

            <Grid
              xs={12}
              lg={12}
            >
              <AdminDashboardPanel
                sx={{ height: '100%' }}
              />
            </Grid>
            {/* <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid> */}

          </Grid>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
