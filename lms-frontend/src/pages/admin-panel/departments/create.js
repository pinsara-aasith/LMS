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
import { getAllFaculties } from '../faculties';

export function insertDepartment(data) {
  return axios.post(`${BACKEND_URL}/api/departments`, {
    name: data?.name,
    faculty_id: data?.faculty_id
  })
}

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    getAllFaculties().then(d => setFaculties(d));
  }, [])

  const formik = useFormik({
    initialValues: {
      faculty_id: null,
      name: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required('name is required'),
      faculty_id: Yup.
        number()
        .required('faculty is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await insertDepartment(formik.values)

        enqueueSnackbar('Department was added successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/departments'), 400)

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
          Departments | E-LMS
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
                  Departments
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Departments',
                    linkUrl: '/admin-panel/departments',
                  },
                  {
                    text: 'Add New',
                    linkUrl: '/admin-panel/departments/create',
                    active: true
                  },
                ]} />

              </Stack>

            </Stack>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Add New Department" />
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
                        label="Select Faculty"
                        name="faculty_id"
                        required
                        select
                        SelectProps={{ native: true }}
                        error={!!(formik.touched.faculty_id && formik.errors.faculty_id)}
                        helperText={formik.touched.faculty_id && formik.errors.faculty_id}
                        value={formik.values.faculty_id}
                        onChange={formik.handleChange}
                      >
                        <option
                          key={''}
                          value={null}
                        >
                        </option>
                        {faculties.map((f) => (
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
