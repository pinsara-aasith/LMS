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
import { getAllDepartments } from 'src/pages/admin-panel/departments';

export function updateSubject(id, data) {
  return axios.put(`${BACKEND_URL}/api/subjects/${id}`, {
    name: data?.name,
    code: data?.code,
    department_id: data?.department_id
  })
}


const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const subjectId = router.query.id
  const [loading, setLoading] = useState(true);

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments().then(d => setDepartments(d));
  }, [])


  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      department_id: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required('name is required'),
        code: Yup
          .string()
          .required('code is required'),
      department_id: Yup
        .number()
        .required('department_id is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        updateSubject(subjectId, values);

        enqueueSnackbar('Subject was edited successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/subjects'), 400)

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

    axios.get(`${BACKEND_URL}/api/subjects/${subjectId}`).then((res) => {
      formik.setValues({
        name: res.data?.data['name'] ?? '',
        code: res.data?.data['code'] ?? '',
        department_id: res.data?.data['department_id'] ?? '',
      })

      setLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId])

  return (
    <>
      <Head>
        <title>
          Subjects | LMS
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
                    linkUrl: '/subjects',
                  },
                  {
                    text: 'Edit',
                    linkUrl: '/subjects/edit/',
                    active: true
                  },
                ]} />

              </Stack>
            </Stack>

            {loading && <LinearProgress />}

            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Edit Subject" />

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
