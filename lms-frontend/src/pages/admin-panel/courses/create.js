import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Container, FormControl, InputLabel, MenuItem, NativeSelect, OutlinedInput, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/admin-panel/dashboard/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { getAllDepartments } from '../departments';

export function insertCourse(data) {
  return axios.post(`${BACKEND_URL}/api/courses`, {
    name: data?.name,
    code: data?.code,
    department_id: data?.department_id
  })
}

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments().then(d => setDepartments(d));
  }, [])

  const formik = useFormik({
    initialValues: {
      department_id: '',
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
        .required('course code is required'),
      department_id: Yup.
        number()
        .required('department is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await insertCourse(formik.values)

        enqueueSnackbar('Course was added successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/admin-panel/courses'), 400)

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
          Courses | E-LMS
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
                  Courses
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Courses',
                    linkUrl: '/admin-panel/courses',
                  },
                  {
                    text: 'Add New',
                    linkUrl: '/admin-panel/courses/create',
                    active: true
                  },
                ]} />

              </Stack>

            </Stack>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Add New Course" />
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
                        label="Course Code"
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
                        label="Select Department"
                        name="department_id"
                        required
                        select
                        SelectProps={{ native: true }}
                        error={!!(formik.touched.department_id && formik.errors.department_id)}
                        helperText={formik.touched.department_id && formik.errors.department_id}
                        value={formik.values.department_id}
                        onChange={formik.handleChange}
                      >
                        <option
                          key={''}
                          value={''}
                        >
                        </option>
                        {departments.map((f) => (
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
