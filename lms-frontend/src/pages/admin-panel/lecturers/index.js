import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Box, Button, Card, Container, IconButton, LinearProgress, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
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

export function deleteLecturer(lecturerId) {
  return axios.delete(`${BACKEND_URL}/api/lecturers/${lecturerId}`)
}

export async function getAllLecturers() {
  const response = await axios.get(`${BACKEND_URL}/api/lecturers`)
  return response.data?.['data']
}


const useLecturers = (data, page, rowsPerPage, search) => {
  return useMemo(
    () => {
      const filtered = searchObjects(data, search)
      return applyPagination(filtered, page, rowsPerPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, rowsPerPage, data, search]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const lecturers = useLecturers(data, page, rowsPerPage, search);

  const [loading, setLoading] = useState(true)

  const { enqueueSnackbar } = useSnackbar()
  async function retrieveAndRefreshData() {
    setLoading(true)
    try {
      const lecturers = (await getAllLecturers()) || [];
      console.log("Lecturers were fetched from the database", lecturers)

      setData(lecturers)
    } catch (e) {
      enqueueSnackbar('Error occured!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',

        },
        autoHideDuration: 2000
      })
      console.error(e)
    }
    setLoading(false)
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

  const handleDelete = (lecturer) => {
    confirm({ description: `This will permanently delete the record` })
      .then(async () => {
        try {
          setLoading(true)
          await deleteLecturer(lecturer.id)
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
          Lecturers
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
                  Lecturers
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Lecturers',
                    linkUrl: '/lecturers',
                    active: true
                  },
                ]} />

              </Stack>
              <div>
                <Stack
                  spacing={1}
                  direction={'row'}
                >
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    href={'/lecturers/create'}
                    LinkComponent={NextLink}
                  >
                    Add New
                  </Button>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowPathIcon />
                      </SvgIcon>
                    )}
                    onClick={() => retrieveAndRefreshData()}
                    variant="outlined"
                  >
                    Refresh
                  </Button>
                </Stack>
              </div>
            </Stack>
            <BigSearch
              search={search}
              onSearch={setSearch}
              placeholder={"Search Lecturers"}
            />

            {loading && <LinearProgress />}

            <LecturersTable
              count={data.length}
              items={lecturers}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              handleDelete={handleDelete}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const LecturersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    handleDelete,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={170}>
                  ID
                </TableCell>

                <TableCell>
                  Name
                </TableCell>

                <TableCell>
                  Contact No
                </TableCell>

                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Nic
                </TableCell>

                <TableCell>
                  Faculty
                </TableCell>

                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((lecturer) => {
                return (
                  <TableRow
                    hover
                    key={lecturer.id}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">
                        {lecturer.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {`${lecturer.first_name} ${lecturer.last_name}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                        {lecturer.contact_no}
                    </TableCell>
                    <TableCell>
                        {lecturer.email}
                    </TableCell>
                    <TableCell>
                        {lecturer.nic_number}
                    </TableCell>
                    <TableCell>
                        {lecturer.faculty.name}
                    </TableCell>

                    <TableCell>
                      {/* <IconButton
                        color="primary"
                        aria-label="edit"
                        href={`/lecturers/edit/${lecturer.id}`}
                        LinkComponent={NextLink}
                      >
                        <SvgIcon>
                          <PencilIcon style={{ fontSize: 24 }} /> 
                        </SvgIcon>
                      </IconButton> */}

                      <IconButton
                        color="primary"
                        aria-label="remove"
                        onClick={() => handleDelete(lecturer)}
                        LinkComponent={NextLink}
                      >
                        <SvgIcon>
                          <TrashIcon style={{ fontSize: 24 }} /> {/* Customize the icon */}
                        </SvgIcon>
                      </IconButton>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
