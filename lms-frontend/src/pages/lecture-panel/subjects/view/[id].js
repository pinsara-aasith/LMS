import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Backdrop, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, IconButton, InputLabel, LinearProgress, Link, MenuItem, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/lecture-panel/dashboard/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

import ExpandMoreIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import AttachFileIcon from '@heroicons/react/24/solid/PaperClipIcon';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const assignmentId = router.query.id
  const [loading, setLoading] = useState(true);

  const assignments = [
    {
      id: 1,
      title: 'Assignment 1: Data Structures',
      description: 'Implement various data structures and analyze their time complexity.',
      file: { name: 'data_structures_assignment.pdf', url: '#' },
      defaultExpanded: true,
    },
    {
      id: 2,
      title: 'Assignment 2: Database Design',
      description: 'Design a relational database schema for a given scenario.',
      file: { name: 'database_design_assignment.pdf', url: '#' },
      defaultExpanded: true,
    },
    {
      id: 3,
      title: 'Assignment 3: Web Development',
      description: 'Create a responsive web application using modern web development technologies.',
      file: { name: 'web_development_assignment.pdf', url: '#' },
    },
    {
      id: 4,
      title: 'Assignment 4: Algorithms and Complexity',
      description: 'Analyze the time and space complexity of various algorithms.',
      file: { name: 'algorithms_assignment.pdf', url: '#' },
    },
    {
      id: 5,
      title: 'Assignment 5: Software Testing',
      description: 'Develop and execute test cases for a software application.',
      file: { name: 'software_testing_assignment.pdf', url: '#' },
    },
    {
      id: 6,
      title: 'Assignment 6: Mobile App Development',
      description: 'Design and implement a mobile application for a specific platform.',
      file: { name: 'mobile_app_assignment.pdf', url: '#' },
    },
  ];

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
                  Data Structures And Algorithms
                </Typography>
              </Stack>
            </Stack>

            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Assignments" />

              <CardContent>
                <Container>
                  {assignments.map((assignment) => (
                    <Accordion key={assignment.id} defaultExpanded={assignment.defaultExpanded}>
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
                            <Typography variant="subtitle2" gutterBottom>
                              Attached Files:
                            </Typography>
                            <Link href={assignment.file.url} target="_blank" rel="noopener noreferrer">
                              <IconButton color="primary" component="span">
                                <AttachFileIcon />
                              </IconButton>
                              {assignment.file.name}
                            </Link>

                          </CardContent>
                        </Card>
                        <Button
                          LinkComponent={Link}
                          sx={{ mt: 3 }}
                           href={`/lecture-panel/assignments/viewUploadedWork`}
                          variant="contained"
                          color="primary"
                          startIcon={<SvgIcon fontSize="small"><BookOpenIcon /></SvgIcon>}
                        >
                          View Uploaded Work
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
