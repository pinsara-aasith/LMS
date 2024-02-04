import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, CssBaseline, FormControl, Grid, InputLabel, Link, MenuItem, NativeSelect, OutlinedInput, Select, Snackbar, Stack, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';

const getFileDisplayName = (filePath) => {
  const pathParts = filePath.split('/');
  const fileName = pathParts[pathParts.length - 1];

  return fileName;
};

const SubmissionsTable = ({ submissions }) => {
  return (
    <TableContainer sx={{ width: '100%' }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Submission Date & Time</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((submission, index) => (
            <TableRow key={index}>
              <TableCell>{submission?.student?.first_name + " " + submission?.student?.last_name}</TableCell>
              <TableCell>{new Date(submission?.created_at).toLocaleString()}</TableCell>
              <TableCell>{submission?.assignment_submission_grade?.grade}</TableCell>

              <TableCell> {!!submission?.file_path ? (
                <a href={`${BACKEND_URL}/storage/${submission?.file_path}`} target="_blank" rel="noopener noreferrer">
                  Uploaded File
                </a>) : 'No File'}
              </TableCell>

              <TableCell>
                <Button href={`/lecturer-panel/submissions/${submission?.id}/viewAndGrade`} variant="outlined" color="primary">
                  View & Grade Submission
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const sampleSubmissions = [
  {
    studentName: 'Alice Johnson',
    submissionDate: '2024-01-14',
    submissionTime: '10:30:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment1.pdf',
      url: '/lecturer-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Bob Smith',
    submissionDate: '2024-01-15',
    submissionTime: '14:45:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment2.docx',
      url: '/lecturer-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Charlie Brown',
    submissionDate: '2024-01-16',
    submissionTime: '11:20:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment3.txt',
      url: '/lecturer-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Eve Taylor',
    submissionDate: '2024-01-17',
    submissionTime: '09:00:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment4.jpg',
      url: '/lecturer-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Frank Miller',
    submissionDate: '2024-01-18',
    submissionTime: '16:30:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment5.doc',
      url: '/lecturer-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Grace Turner',
    submissionDate: '2024-01-19',
    submissionTime: '13:15:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment6.pdf',
      url: '/lecturer-panel/submissions/1/viewAndGrade',
    },
  },
];

const SubmissionsView = ({ assignmentTitle, submissions }) => {
  return (
    <SubmissionsTable submissions={submissions} />
  );
};

const Page = () => {
  const router = useRouter();
  const assignmentId = router.query.id

  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState([]);
  const [assignmentSubmissions, setAssignmentSubmissions] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const fetchAssignment = async () => {
    try {
      const r = await axios.get(`${BACKEND_URL}/api/assignments/${assignmentId}`);
      setAssignment(r.data.data);
    } catch (e) {

      console.error(e)
      throw e;
    }
  };

  const fetchAssignmentSubmissions = async () => {
    try {
      const r = await axios.get(`${BACKEND_URL}/api/assignments/${assignmentId}/submissions`);
      setAssignmentSubmissions(r.data.data);
    } catch (e) {

      console.error(e)
      throw e;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAssignmentSubmissions();
        await fetchAssignment();
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        enqueueSnackbar('Error while doing network operations...', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>
          Assignments | E-LMS
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
                  {assignment?.title}
                </Typography>
              </Stack>

            </Stack>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  {assignment?.description}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="All Uploaded Work By Students" />
              <CardContent>
                <Container component="main">
                  <CssBaseline />
                  <SubmissionsView assignmentTitle="Assignment" submissions={assignmentSubmissions} />
                </Container>
              </CardContent>
            </Card>
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
