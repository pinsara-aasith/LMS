import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Backdrop, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, IconButton, InputLabel, LinearProgress, Link, MenuItem, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import NextLink from 'next/link';

import ExpandMoreIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import AttachFileIcon from '@heroicons/react/24/solid/PaperClipIcon';
import CloudArrowUpIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';

const Page = () => {
  const router = useRouter();

  const subjectId = router.query.id

  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const fetchSubject = async () => {
    try {
      const subjectResponse = await axios.get(`${BACKEND_URL}/api/subjects/${subjectId}`);
      setSubject(subjectResponse.data.data);
    } catch (e) {

      console.error(e)
      throw e;
    }
  };

  const fetchAssignments = async () => {
    try {
      const assignmentsResponse = await axios.get(`${BACKEND_URL}/api/subjects/${subjectId}/assignments/`);
      setAssignments(assignmentsResponse.data.data);
    } catch (e) {
      console.error(e)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSubject();
        await fetchAssignments();
        setLoading(false);
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
    };

    fetchData();
  }, []);

  const getFileDisplayName = (filePath) => {
    const pathParts = filePath.split('/');
    const fileName = pathParts[pathParts.length - 1];

    return fileName;
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
                  {subject?.name}
                </Typography>
              </Stack>
            </Stack>

            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Assignments" />

              <CardContent>
                <Container>
                  {loading && (
                    <CircularProgress />
                  )}
                  {!assignments.length && <>No Assignments</>}
                  {assignments.map((assignment, i) => (
                    <Accordion key={assignment.id} defaultExpanded={i > assignments.length - 3 || i == 0}>
                      <AccordionSummary expandIcon={<SvgIcon fontSize="small">
                        <ExpandMoreIcon />
                      </SvgIcon>} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography variant="h6">{assignment.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Card>
                          <CardContent>
                            <Typography variant="body1" gutterBottom>
                              {assignment.description}
                            </Typography>
                            {
                              assignment.file_path && (
                                <>
                                  <Typography variant="subtitle2" sx={{mt: 2}} gutterBottom>
                                    Attached Files:
                                  </Typography>
                                  <Link href={`${BACKEND_URL}/storage/${assignment?.file_path}`} target="_blank" rel="noopener noreferrer">
                                    <IconButton color="primary" component="span">
                                      <AttachFileIcon />
                                    </IconButton>
                                    {getFileDisplayName(assignment.file_path)}
                                  </Link>
                                </>
                              )
                            }

                          </CardContent>
                        </Card>
                        <Button
                          LinkComponent={NextLink}
                          sx={{ mt: 3 }}
                          href={`/student-panel/assignments/${assignment.id}/uploadYourWork`}
                          variant="contained"
                          color="primary"
                          startIcon={<SvgIcon fontSize="small"><CloudArrowUpIcon /></SvgIcon>}
                        >
                          Upload Your Work
                        </Button>

                      </AccordionDetails>
                    </Accordion>
                  ))}
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
