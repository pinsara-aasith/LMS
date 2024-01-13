import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Autocomplete, Backdrop, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, InputLabel, LinearProgress, MenuItem, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { getAllFaculties } from 'src/pages/admin-panel/faculties';

export function updateDepartment(id, data) {
  return axios.put(`${BACKEND_URL}/api/departments/${id}`, {
    name: data?.name,
    faculty_id: data?.faculty_id
  })
}


const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const departmentId = router.query.id
  const [loading, setLoading] = useState(true);

  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    getAllFaculties().then(d => setFaculties(d));
  }, [])


  const formik = useFormik({
    initialValues: {
      name: '',
      faculty_id: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required('name is required'),
      faculty_id: Yup
        .number()
        .required('faculty_id is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        updateDepartment(departmentId, values);

        enqueueSnackbar('Department was edited successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/departments'), 400)

      } catch (err) {
        enqueueSnackbar('Error occured!', {
          variant: 'success',
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

  useEffect(() => {
    setLoading(true);

    axios.get(`${BACKEND_URL}/api/departments/${departmentId}`).then((res) => {
      formik.setValues({
        name: res.data?.data['name'] ?? '',
        faculty_id: res.data?.data['faculty_id'] ?? '',
      })

      setLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId])

  return (
    <>
      <Head>
        <title>
          Departments | LMS
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
                    linkUrl: '/departments',
                  },
                  {
                    text: 'Edit',
                    linkUrl: '/departments/edit/',
                    active: true
                  },
                ]} />

              </Stack>
            </Stack>

            {loading && <LinearProgress />}

            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Edit Department" />

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
                    </FormControl>
                  </Stack>
                  <Stack
                    direction={'row'}
                    justifyContent={'flex-end'}
                  >
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Submit
                    </LoadingButton>
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
