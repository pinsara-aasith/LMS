import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, Link, MenuItem, NativeSelect, OutlinedInput, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { Paper, IconButton } from '@mui/material';
import AttachFileIcon from '@heroicons/react/24/solid/PaperClipIcon';
import { useRouter } from 'next/router';
import { DragDropFileUpload } from 'src/components/dragAndDropFileUpload';



const Page = () => {
  const router = useRouter();
  const assignmentId = router.query.id

  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const fetchAssignment = async () => {
    try {
      const subjectResponse = await axios.get(`${BACKEND_URL}/api/assignments/${assignmentId}`);
      setAssignment(subjectResponse.data.data);
    } catch (e) {

      console.error(e)
      throw e;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAssignment();
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

  const handleTextChange = (event) => {
    setText(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    if (file)
      formData.append('file', file);

    axios.post(`${BACKEND_URL}/api/assignments/${assignmentId}/submissions`, formData)
      .then(response => {
        if(response.status == 200) {
          enqueueSnackbar('Your assignment was uploaded successfully...', {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
  
            },
            autoHideDuration: 2000
          })

          setButtonDisabled(true)
  
        }
      })
      .catch(error => {
        // Handle error
        enqueueSnackbar('Error while doing network operations...', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        console.error('Error:', error);
      });
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
                  {assignment?.title}
                </Typography>
              </Stack>

            </Stack>
            <Card>
              <CardContent>
                <Typography variant="body1">
                  {assignment?.description}
                </Typography>
                {loading && (
                  <CircularProgress />
                )}

                {
                  assignment?.file_path && (
                    <>
                      <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                        Attached Files:
                      </Typography>
                      <Link href={assignment?.file_path} target="_blank" rel="noopener noreferrer">
                        <IconButton color="primary" component="span">
                          <AttachFileIcon />
                        </IconButton>
                        {getFileDisplayName(assignment?.file_path)}
                      </Link>
                    </>
                  )
                }
              </CardContent>
            </Card>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Upload your work" />
              <CardContent>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={5}
                    sx={{ mb: 3 }}
                  >
                    <DragDropFileUpload onFileChange={(file) => setFile(file)} />

                    <FormControl
                      variant="filled"
                      fullWidth
                    >
                      <TextField
                        multiline
                        rows={8}
                        fullWidth
                        type="text"
                        label="Write something about the assignment"
                        name="description"
                        value={text}
                        onChange={handleTextChange}
                      />
                    </FormControl>
                  </Stack>
                  <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={buttonDisabled}
                      type="submit"
                    >
                      {buttonDisabled ? 'Submitted' :'Submit'}
                    </Button>
                  </Stack>

                </form>
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
