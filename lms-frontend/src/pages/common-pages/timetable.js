import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Box, Button, Card, Container, IconButton, LinearProgress, Paper, Stack, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { BigSearch } from 'src/sections/big-search';
import { applyPagination } from 'src/utils/apply-pagination';
import NextLink from 'next/link';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useRouter } from 'next/navigation';
import { useConfirm } from 'material-ui-confirm';
import { searchObjects } from 'src/utils/search-objects';
import { useSnackbar } from 'notistack';
import { Scrollbar } from 'src/components/scrollbar';
import axios from 'axios';
import { BACKEND_URL, truncate } from 'src/apis/consts';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import Timetable from 'src/components/timetable';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';

export function deleteStudent(studentId) {
  return axios.delete(`${BACKEND_URL}/api/students/${studentId}`)
}


const useStudents = (data, page, rowsPerPage, search) => {
  return useMemo(
    () => {
      const filtered = searchObjects(data, search)
      return applyPagination(filtered, page, rowsPerPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, rowsPerPage, data, search]
  );
};

const lmsCalendarCustomize = "https://calendar.google.com/calendar/u/0/r"

const Page = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const students = useStudents(data, page, rowsPerPage, search);

  const [loading, setLoading] = useState(true)

  const { enqueueSnackbar } = useSnackbar()
  async function retrieveAndRefreshData() {
    setLoading(true)
    setTimeout(() => { setLoading(false) }, 2000)

  }


  useEffect(() => {
    retrieveAndRefreshData()
  }, [])

  return (

    <>
      <Head>
        <title>
          Students
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >

              <Stack spacing={1}>
                <Typography variant="h5">
                  Time Table
                </Typography>

              </Stack>

            </Stack>


            {loading && <LinearProgress />}
            <iframe 
            
            style={{ width: '100%', height: '600px' }}
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FColombo&mode=WEEK&showPrint=0&showDate=0&showNav=0&showTabs=0&showTz=0&showCalendars=0&showTitle=1&src=ODI2MDBkZmY4ZWFlMTg3MjdkNTNjNTA1MDIyODgwNTc2YjI0ODBhOWU5OTIyYmE1NTZjNjQzZDFkYTYzMmY1YkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
           
            {/* <Timetable /> */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
