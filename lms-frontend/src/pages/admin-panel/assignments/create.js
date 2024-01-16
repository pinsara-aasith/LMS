import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, NativeSelect, OutlinedInput, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/admin-panel/dashboard/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { getAllDepartments } from '../departments';
import { getAllSubjects } from '../subjects';
import { Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';

export function insertAssignment(data) {
  return axios.post(`${BACKEND_URL}/api/assignments`, {
    title: data?.title,
    description: data?.description,
    subject_id: data?.subject_id
  })
}

function DragDropFileUpload({ onFileUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragOver(false);
      const files = event.dataTransfer.files;
      if (files && files[0]) {
        handleFileChange(files[0]);
      }
    },
    []
  );

  const handleFileChange = (file) => {
    setFile(file);
    setLoading(true);
    onFileUpload(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = useCallback(
    (event) => {
      const files = event.target.files;
      if (files && files[0]) {
        
        handleFileChange(files[0]);
      }
    },
    []
  );
console.log(file)
  return (
    <Box>
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#eee' : '#fafafa',
          position: 'relative',
        }}
      >
        <input
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="raised-button-file">
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <SvgIcon>
                <CloudUploadIcon style={{ fontSize: 60 }} />
              </SvgIcon>
            </IconButton>
            <Typography>Drag and drop files here or click to select files</Typography>
          </Box>
        </label>
        {loading && (
          <CircularProgress
            size={24}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Paper>

      {imagePreview && (<Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#eee' : '#fafafa',
          position: 'relative',
        }}
      >
        <Grid container justifyContent="center" style={{ marginTop: 16 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              component="img"
              src={imagePreview}
              alt={file?.name}
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Paper>
      )}
    </Box>
  );
}

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getAllSubjects().then(d => setSubjects(d));
  }, [])

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      subject_id: '',
      submit: null
    },
    validationSchema: Yup.object({
      title: Yup
        .string()
        .required('title is required'),
      description: Yup
        .string()
        .required('description is required'),
      subject_id: Yup.
        number()
        .required('subject is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await insertAssignment(formik.values)

        enqueueSnackbar('Assignment was added successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/admin-panel/assignments'), 400)

      } catch (err) {
        console.error(err);
        enqueueSnackbar('Error occured!', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  let [file, setFile] = React.useState();

  const handleFileUpload = (f) => {
    setFile(f);
    console.log(f);
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
                  Assignments
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Assignments',
                    linkUrl: '/admin-panel/assignments',
                  },
                  {
                    text: 'Add New',
                    linkUrl: '/admin-panel/assignments/create',
                    active: true
                  },
                ]} />

              </Stack>

            </Stack>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Add New Assignment" />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={5}
                    sx={{ mb: 3 }}
                  >
                    <DragDropFileUpload onFileUpload={handleFileUpload} />

                    <FormControl
                      variant="filled"
                      fullWidth
                    >

                      <TextField
                        fullWidth
                        label="Select Subject"
                        name="subject_id"
                        required
                        select
                        SelectProps={{ native: true }}
                        error={!!(formik.touched.subject_id && formik.errors.subject_id)}
                        helperText={formik.touched.subject_id && formik.errors.subject_id}
                        value={formik.values.subject_id}
                        onChange={formik.handleChange}
                      >
                        <option
                          key={''}
                          value={null}
                        >
                        </option>
                        {subjects.map((f) => (
                          <option
                            key={f.id}
                            value={f.id}
                          >
                            {f.name}
                          </option>
                        ))}
                      </TextField>
                    </FormControl>

                    <FormControl
                      variant="filled"
                      fullWidth

                    >
                      <TextField
                        fullWidth
                        type="text"
                        label="Title"
                        name="title"
                        error={!!(formik.touched.title && formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                      />
                    </FormControl>

                    <FormControl
                      variant="filled"
                      fullWidth
                    >
                      <TextField
                        multiline
                        rows={5}
                        fullWidth
                        type="text"
                        label="Description"
                        name="description"
                        error={!!(formik.touched.description && formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        value={formik.values.description}
                        onChange={formik.handleChange}
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
                      type="submit"
                    >
                      Submit
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
