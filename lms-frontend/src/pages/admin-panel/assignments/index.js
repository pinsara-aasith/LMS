import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, IconButton, LinearProgress, Link, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { BigSearch } from 'src/sections/big-search';
import NextLink from 'next/link';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useConfirm } from 'material-ui-confirm';
import { searchObjects } from 'src/utils/search-objects';
import { useSnackbar } from 'notistack';
import { Scrollbar } from 'src/components/scrollbar';
import axios from 'axios';
import { BACKEND_URL, truncate } from 'src/apis/consts';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { getFileDisplayName } from 'src/pages/lecturer-panel/assignments/[id]/viewUploadedWork';
import AttachFileIcon from '@heroicons/react/24/solid/PaperClipIcon';

export function deleteAssignment(assignmentId) {
  return axios.delete(`${BACKEND_URL}/api/assignments/${assignmentId}`)
}

export async function getAllAssignments() {
  const response = await axios.get(`${BACKEND_URL}/api/assignments`)
  return response.data?.['data']
}

const Page = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const assignments = data;

  const [loading, setLoading] = useState(true)

  const { enqueueSnackbar } = useSnackbar()
  async function retrieveAndRefreshData() {
    setLoading(true)
    try {
      const assignments = (await getAllAssignments()) || [];
      console.log("Assignments were fetched from the database", assignments)

      setData(assignments)
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

  const confirm = useConfirm()

  return (
    <>
      <Head>
        <title>
          Assignments
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
                  Assignments
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Assignments',
                    linkUrl: '/admin-panel/assignments',
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
                    href={'/admin-panel/assignments/create'}
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
            {loading && <LinearProgress />}
            <Grid
              container
              spacing={3}
            >
              {!assignments?.length && !loading && 'No Assignments'}
              {assignments.map((assignment) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={assignment.id}
                >
                  <AssignmentCard retrieveAndRefreshData={retrieveAndRefreshData} loading={loading} setLoading={setLoading} assignment={assignment} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};


export const AssignmentCard = (props) => {
  const { assignment, loading, setLoading, retrieveAndRefreshData } = props;
  const { enqueueSnackbar } = useSnackbar()

  const confirm = useConfirm()

  const handleDelete = (assignment) => {
    confirm({ description: `This will permanently delete the record` })
      .then(async () => {
        try {
          setLoading(true)
          await deleteAssignment(assignment.id)
          console.log("Record was successfully deleted...")
          enqueueSnackbar('Record was successfully deleted', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',

            },
            autoHideDuration: 2000
          })
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
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '10px'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src="/assets/errors/error-401.png"
            variant="square"
            sx={{ height: '140px', width: '140px' }}
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {assignment.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {assignment.description}
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }} gutterBottom>
          Attached Files:
        </Typography>

        {
          assignment.file_path ? (
            <>
              <Typography variant="body2" sx={{ mt: 2 }} gutterBottom>

                <Link href={`${BACKEND_URL}/storage/${assignment?.file_path}`} target="_blank" rel="noopener noreferrer">
                  <IconButton color="primary" component="span">
                    <AttachFileIcon />
                  </IconButton>
                  See uploaded file
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ mt: 2 }} gutterBottom>
                No uploaded files
              </Typography>
            </>
          )
        }
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {new Date(assignment.created_at).toLocaleString()}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <IconButton
            color="primary"
            aria-label="edit"
            href={`/admin-panel/assignments/edit/${assignment.id}`}
            LinkComponent={NextLink}
          >
            <SvgIcon>
              <PencilIcon style={{ fontSize: 24 }} /> {/* Customize the icon */}
            </SvgIcon>
          </IconButton>

          <IconButton
            color="primary"
            aria-label="delete assignment"
            LinkComponent={NextLink}
            onClick={() => handleDelete(assignment)}
          >
            <SvgIcon>
              <TrashIcon style={{ fontSize: 24 }} /> {/* Customize the icon */}
            </SvgIcon>
          </IconButton>

        </Stack>
      </Stack>
    </Card>
  );
};


// export const AssignmentsTable = (props) => {
//   const {
//     count = 0,
//     items = [],
//     onPageChange = () => { },
//     onRowsPerPageChange,
//     handleDelete,
//     page = 0,
//     rowsPerPage = 0,
//   } = props;

//   return (
//     <Card>
//       <Scrollbar>
//         <Box sx={{ minWidth: 800 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell width={170}>
//                   Assignment ID
//                 </TableCell>

//                 <TableCell>
//                   Name
//                 </TableCell>

//                 <TableCell>
//                   Assignment Code
//                 </TableCell>

//                 <TableCell>
//                   Department
//                 </TableCell>

//                 <TableCell>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {items.map((assignment) => {
//                 return (
//                   <TableRow
//                     hover
//                     key={assignment.id}
//                   >
//                     <TableCell>
//                       <Typography variant="subtitle2">
//                         {assignment.id}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>

//                       <Typography variant="subtitle2">
//                         {assignment.name}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>

//                       <Typography variant="subtitle1">
//                         {assignment.code}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       {assignment.department.name}
//                     </TableCell>

//                     <TableCell>
//                       <IconButton
//                         color="primary"
//                         aria-label="edit"
//                         href={`/admin-panel/assignments/edit/${assignment.id}`}
//                         LinkComponent={NextLink}
//                       >
//                         <SvgIcon>
//                           <PencilIcon style={{ fontSize: 24 }} /> {/* Customize the icon */}
//                         </SvgIcon>
//                       </IconButton>

//                       <IconButton
//                         color="primary"
//                         aria-label="remove"
//                         onClick={() => handleDelete(assignment)}
//                         LinkComponent={NextLink}
//                       >
//                         <SvgIcon>
//                           <TrashIcon style={{ fontSize: 24 }} /> {/* Customize the icon */}
//                         </SvgIcon>
//                       </IconButton>
//                     </TableCell>

//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </Box>
//       </Scrollbar>
//       <TablePagination
//         component="div"
//         count={count}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={onRowsPerPageChange}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </Card>
//   );
// };

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
