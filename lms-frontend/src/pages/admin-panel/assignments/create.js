import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, NativeSelect, OutlinedInput, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
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
import { DragDropFileUpload } from 'src/components/dragAndDropFileUpload';


export function insertAssignment(data, file) {
  const formData = new FormData();
  formData.append('title', data?.title);
  formData.append('description', data?.description);
  formData.append('subject_id', data?.subject_id);

  if (file)
    formData.append('file', file);

  return axios.post(`${BACKEND_URL}/api/assignments`, formData)
  
}

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState(null);

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
        await insertAssignment(formik.values, file)

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
                    <DragDropFileUpload file={file} onFileChange={setFile} />

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
