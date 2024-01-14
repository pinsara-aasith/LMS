import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, CssBaseline, FormControl, Grid, InputLabel, Link, MenuItem, NativeSelect, OutlinedInput, Select, Snackbar, Stack, SvgIcon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/lecture-panel/dashboard/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';

const SubmissionsTable = ({ submissions }) => {
  return (
    <TableContainer sx={{ width: '100%' }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Submission Date</TableCell>
            <TableCell>Submission Time</TableCell>
            <TableCell>Grades</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((submission, index) => (
            <TableRow key={index}>
              <TableCell>{submission.studentName}</TableCell>
              <TableCell>{submission.submissionDate}</TableCell>
              <TableCell>{submission.submissionTime}</TableCell>
              <TableCell>{submission.grades}</TableCell>
              <TableCell>
                {/* Assuming submission has a file property with the file information */}
                <a href={submission.file.url} target="_blank" rel="noopener noreferrer">
                  {submission.file.name}
                </a>
              </TableCell>

              <TableCell>
                <Button href={'/lecture-panel/submissions/1/viewAndGrade'} variant="outlined" color="primary">
                  View & Grade Submission
                </Button>
                {/* Add other actions like download, delete, etc. as needed */}
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
      url: '/lecture-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Bob Smith',
    submissionDate: '2024-01-15',
    submissionTime: '14:45:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment2.docx',
      url: '/lecture-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Charlie Brown',
    submissionDate: '2024-01-16',
    submissionTime: '11:20:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment3.txt',
      url: '/lecture-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Eve Taylor',
    submissionDate: '2024-01-17',
    submissionTime: '09:00:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment4.jpg',
      url: '/lecture-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Frank Miller',
    submissionDate: '2024-01-18',
    submissionTime: '16:30:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment5.doc',
      url: '/lecture-panel/submissions/1/viewAndGrade',
    },
  },
  {
    studentName: 'Grace Turner',
    submissionDate: '2024-01-19',
    submissionTime: '13:15:00',
    grades: 'Not Graded',
    file: {
      name: 'Assignment6.pdf',
      url: '/lecture-panel/submissions/1/viewAndGrade',
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
  const { enqueueSnackbar } = useSnackbar();

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
                  Assignment 1: Data Structures
                </Typography>
              </Stack>

            </Stack>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  Implement various data structures and analyze their time complexity.
                </Typography>


              </CardContent>
            </Card>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="All Uploaded Work By Students" />
              <CardContent>
                <Container component="main">
                  <CssBaseline />
                  <SubmissionsView assignmentTitle="Assignment" submissions={sampleSubmissions} />
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
