import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Box, Button, Card, Container, IconButton, LinearProgress, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/lecture-panel/dashboard/layout';
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

export function deleteStudent(studentId) {
  return axios.delete(`${BACKEND_URL}/api/students/${studentId}`)
}

export async function getAllStudents() {
  const response = await axios.get(`${BACKEND_URL}/api/students`)
  return response.data?.['data']
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

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const confirm = useConfirm()

  const handleDelete = (student) => {
    confirm({ description: `This will permanently delete the record` })
      .then(async () => {
        try {
          setLoading(true)
          await deleteStudent(student.id)
          console.log("Record was successfully deleted...")

        } catch (e) {
          console.error(e)
        }

        retrieveAndRefreshData()
      })
      .catch(() => {
        enqueueSnackbar('Error occured', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })
        console.log("Deletion cancelled.")
      });
  };

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
                  Events
                </Typography>

              </Stack>
             
            </Stack>
            


            {loading && <LinearProgress />}
            <iframe 
            
            style={{ width: '100%', height: '600px' }}
            src="https://calendar.google.com/calendar/embed?title=E-LMS%20Calendar&height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FColombo&src=ZjA4NGEzMzZmNjFkMzYyNTgxYTRhOTI2ZDQ1MGQwY2ZmMWVjZDVmYjE5ZDg2MTg2ZDNkYmY1ZTRjMmU4OThkYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OGE3MDk2YzBhZDE4YmVjODcyNTQxYTE3MmZmOTk2MTdjZGM2ODNhNGY1ZTk3YjVmZjk4MmUyY2U0ODRjZTEwNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NjZlN2JiNzQ0ZTE2NjhjZjExZTYyNGFjOWI0ZTdlNGY3YmJlZGE3ZmM2Y2Q4NWJhZTJhZGVjYTEwNjMyYzcxMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NWQzNzZjYWZmNmEwNDE1ZWZmM2JjYzNmYWVhZGZhMjI2ZDQ3YjY4ZWYxZWJiOGNhMjcyNWRjNTY0NDVhZDQzOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZmFtaWx5MTA0NTkxODM5OTEyODE1NzcwNDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=ZW4ubGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D81B60&color=%23B39DDB&color=%23F09300&color=%23C0CA33&color=%2333B679&color=%23795548&color=%230B8043" width="800" height="600" frameborder="0" scrolling="no"></iframe>
           
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
