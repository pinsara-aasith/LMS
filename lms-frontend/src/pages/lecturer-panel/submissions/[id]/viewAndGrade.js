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

const Page = () => {
  const router = useRouter();
  const assignmentId = router.query.id

  const [loading, setLoading] = useState(true);
  const [assignmentSubmission, setAssignmentSubmission] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const fetchAssignmentSubmission = async () => {
    try {
      const r = await axios.get(`${BACKEND_URL}/api/assignmentSubmissions/${assignmentId}`);
      setAssignmentSubmission(r.data.data);
    } catch (e) {

      console.error(e)
      throw e;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAssignmentSubmission();
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
                  {assignmentSubmission?.assignment?.title}
                </Typography>
              </Stack>

            </Stack>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  
                {assignmentSubmission?.assignment?.description}
                </Typography>


              </CardContent>
            </Card>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="View and grade the submission" />
              <CardContent>
                <Container component="main">
                  <CssBaseline />
                  {loading && <CircularProgress />}
                  {assignmentSubmission && <SubmissionDetails submission={assignmentSubmission} />}
                </Container>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

const SubmissionDetails = ({ submission }) => {
  // Assuming submission has text content and a file property
  const { text, file_path } = submission;

  const [grade, setGrade] = useState('');
  const [comments, setComments] = useState('');
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/api/assignmentSubmissions/${submission.id}/grade`, {
        grade: grade,
        comment: comments,
      })

      setComments('');
      setGrade('');
      setLoading(false)
      enqueueSnackbar('Submission was graded successfully!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',

        },
        autoHideDuration: 2000
      })

      router.push(`/lecturer-panel/assignments/${submission?.assignment?.id}/viewUploadedWork`)
    } catch (err) {
      enqueueSnackbar('Error!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',

        },
        autoHideDuration: 2000
      })
    }
  };


  return (
    <Container component="main">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="body2" gutterBottom>
          Text: {submission?.text || '-'}
        </Typography>
        <Typography paragraph>{text}</Typography>
        <Typography variant="body2" gutterBottom>
          Submitted File: <span style={{fontSize: '12px', fontWeight: 'bold'}}>{submission?.file_path || '-'}</span>
        </Typography>
        <Link sx={{fontSize: '13px', fontWeight: 'bold'}} href={`${BACKEND_URL}/storage/${submission?.file_path}`} target="_blank" rel="noopener noreferrer">
          Uploaded File
        </Link>
      </Paper>
      <Typography variant="body2" sx={{ mt: 6 }} gutterBottom>
        Grade Submission
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} direction={'column'}>
          <TextField
            variant="outlined"
            required
            fullWidth
            type='number'
            label="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth>
            <TextField
              variant="outlined"
              multiline
              rows={4}
              placeholder='Comments'
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Grades
          </Button>
        </Stack>
      </form>
    </Container>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
