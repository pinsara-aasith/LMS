import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { TotalAdmins } from 'src/sections/overview/total-admins';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { AdminDashboardPanel } from 'src/sections/overview/admin-dashboard-panel';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { TotalFaculties } from 'src/sections/overview/total-faculties';
import { TotalDepartments } from 'src/sections/overview/total-departments';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { TotalCourses } from 'src/sections/overview/total-courses';

const now = new Date();

const Page = () => (
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
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={1}
        >
          <Grid
            xs={12}
            sm={3}
          >
            <TotalAdmins
              difference={12}
              positive
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            sm={3}
          >
            <TotalFaculties
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          
          <Grid
            xs={12}
            sm={3}
          >
            <TotalDepartments
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            sm={3}
          >
            <TotalCourses
              sx={{ height: '100%' }}
            />
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
          <Grid
            xs={12}
            md={12}
            lg={12}
          >
            <OverviewLatestOrders sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
