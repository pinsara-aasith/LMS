import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Container, FormControl, InputLabel, MenuItem, NativeSelect, OutlinedInput, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { getAllCourses } from '../courses';

export function insertSubject(data) {
  return axios.post(`${BACKEND_URL}/api/subjects`, {
    name: data?.name,
    code: data?.code,
    course_id: data?.course_id
  })
}

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then(d => setCourses(d));
  }, [])

  const formik = useFormik({
    initialValues: {
      course_id: '',
      name: '',
      code: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required('name is required'),
      code: Yup
        .string()
        .required('subject code is required'),
      course_id: Yup.
        number()
        .required('course is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await insertSubject(formik.values)

        enqueueSnackbar('Subject was added successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/admin-panel/subjects'), 400)

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
          Subjects | E-LMS
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
                  Subjects
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Subjects',
                    linkUrl: '/admin-panel/subjects',
                  },
                  {
                    text: 'Add New',
                    linkUrl: '/admin-panel/subjects/create',
                    active: true
                  },
                ]} />

              </Stack>

            </Stack>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Add New Subject" />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={5}
                    sx={{ mb: 3 }}
                  >
                    <FormControl
                      variant="filled"
                      fullWidth

                    >
                      <TextField
                        fullWidth
                        type="text"
                        label="Name"
                        name="name"
                        error={!!(formik.touched.name && formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl
                      variant="filled"
                      fullWidth

                    >
                      <TextField
                        fullWidth
                        type="text"
                        label="Subject Code"
                        name="code"
                        error={!!(formik.touched.code && formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                        value={formik.values.code}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl
                      variant="filled"
                      fullWidth
                    >
                      <TextField
                        fullWidth
                        label="Select Course"
                        name="course_id"
                        required
                        select
                        SelectProps={{ native: true }}
                        error={!!(formik.touched.course_id && formik.errors.course_id)}
                        helperText={formik.touched.course_id && formik.errors.course_id}
                        value={formik.values.course_id}
                        onChange={formik.handleChange}
                      >
                        <option
                          key={''}
                          value={''}
                        >
                        </option>
                        {courses.map((f) => (
                          <option
                            key={f.id}
                            value={f.id}
                          >
                            {f.name}
                          </option>
                        ))}
                      </TextField>
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
