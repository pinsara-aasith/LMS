import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Box, Button, Card, Container, IconButton, LinearProgress, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/admin-panel/dashboard/layout';
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

export function deleteFaculty(facultyId) {
  return axios.delete(`${BACKEND_URL}/api/faculties/${facultyId}`)
}

export async function getAllFaculties() {
  const response = await axios.get(`${BACKEND_URL}/api/faculties`)
  return response.data?.['data']
}


const useFaculties = (data, page, rowsPerPage, search) => {
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

  const faculties = useFaculties(data, page, rowsPerPage, search);

  const [loading, setLoading] = useState(true)

  const { enqueueSnackbar } = useSnackbar()
  async function retrieveAndRefreshData() {
    setLoading(true)
    try {
      const faculties = (await getAllFaculties()) || [];
      console.log("Faculties were fetched from the database", faculties)

      setData(faculties)
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

  const handleDelete = (faculty) => {
    confirm({ description: `This will permanently delete the record` })
      .then(async () => {
        try {
          setLoading(true)
          await deleteFaculty(faculty.id)
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
          Faculties
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
                  Faculties
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Faculties',
                    linkUrl: '/admin-panel/faculties',
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
                    href={'/faculties/create'}
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
              placeholder={"Search Faculties"}
            />

            {loading && <LinearProgress />}

            <FacultiesTable
              count={data.length}
              items={faculties}
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

export const FacultiesTable = (props) => {
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
                  Faculty ID
                </TableCell>

                <TableCell>
                  Name
                </TableCell>

                <TableCell>
                  Description
                </TableCell>

                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((faculty) => {
                return (
                  <TableRow
                    hover
                    key={faculty.id}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">
                        {faculty.id}
                      </Typography>
                    </TableCell>
                    <TableCell>

                      <Typography variant="subtitle2">
                        {faculty.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {truncate(faculty.description, 50)}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        href={`/admin-panel/faculties/edit/${faculty.id}`}
                        LinkComponent={NextLink}
                      >
                        <SvgIcon>
                          <PencilIcon style={{ fontSize: 24 }} /> {/* Customize the icon */}
                        </SvgIcon>
                      </IconButton>

                      <IconButton
                        color="primary"
                        aria-label="remove"
                        onClick={() => handleDelete(faculty)}
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
