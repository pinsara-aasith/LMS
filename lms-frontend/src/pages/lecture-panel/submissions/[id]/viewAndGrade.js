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

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();


  const sampleSubmission = {
    textContent: 'The student carefully examined the dataset, performed relevant statistical analyses, and created insightful visualizations. Their conclusions demonstrated a solid understanding of the data and its implications.',
    file: {
      name: 'Assignment1.pdf',
      url: 'https://example.com/assignment1.pdf',
    },
  };
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
              <CardHeader title="View and grade the submission" />
              <CardContent>
                <Container component="main">
                  <CssBaseline />

                  <SubmissionDetails submission={sampleSubmission} />
                </Container>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

const GradingForm = ({ onSubmit }) => {
  const [grade, setGrade] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop with the grading data
    onSubmit({ grade, comments });
  };

  return (
      <form onSubmit={handleSubmit}>
    <Stack spacing={3} direction={'column'}>
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Comments</InputLabel>
          <TextField
            variant="outlined"
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit Grades
        </Button>
    </Stack>
      </form>
  );
};

const SubmissionDetails = ({ submission }) => {
  // Assuming submission has text content and a file property
  const { textContent, file } = submission;

  const handleGradeSubmission = (gradingData) => {
    // Handle grading logic, e.g., send data to the server
    console.log('Grading Data:', gradingData);
    // You can add logic to send the grading data to the server/database
  };
  return (
    <Container component="main">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="body2" gutterBottom>
          Text:
        </Typography>
        <Typography paragraph>{textContent}</Typography>
        <Typography variant="body2" gutterBottom>
          Submitted File:
        </Typography>
        <a href={file.url} target="_blank" rel="noopener noreferrer">
          {file.name}
        </a>
      </Paper>
      <Typography variant="body2" sx={{mt: 6}} gutterBottom>
        Grade Submission
      </Typography>
      <GradingForm onSubmit={handleGradeSubmission} />
    </Container>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
