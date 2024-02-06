import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Autocomplete, Backdrop, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, FormLabel, InputLabel, LinearProgress, MenuItem, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { DragDropFileUpload } from 'src/components/dragAndDropFileUpload';
import { getAllFaculties } from '../../faculties';
import { getAllDepartments } from '../../departments';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export function updateLecturer(id, data, file) {
  const formData = new FormData();
  formData.append('first_name', data?.first_name);
  formData.append('last_name', data?.last_name);
  formData.append('email', data?.email);
  formData.append('nic_number', data?.nic_number);
  formData.append('dob', dayjs(data?.dob).format('YYYY-MM-DD'));
  formData.append('user_name', data?.user_name);
  formData.append('password', data?.password);
  formData.append('country', data?.country);
  formData.append('contact_no', data?.contact_no);
  formData.append('city', data?.city);
  formData.append('admission_date', data?.admission_date);
  formData.append('batch', data?.batch);
  formData.append('faculty_id', data?.faculty_id);
  formData.append('department_id', data?.department_id);

  if (file)
    formData.append('file', file);

  return axios.post(`${BACKEND_URL}/api/lecturers/${id}/edit`, formData)
}


const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const lecturerId = router.query.id
  const [loading, setLoading] = useState(true);

  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [file, setFile] = useState();

  useEffect(() => {
    getAllFaculties().then(d => setFaculties(d));
    getAllDepartments().then(d => setDepartments(d));
  }, [])


  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      first_name: Yup
        .string()
        .required('First name is required'), 
         password: Yup
        .string()
        .required('Password is required'),
      last_name: Yup
        .string()
        .required('Last name is required'),
      email: Yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
      faculty_id: Yup
        .number()
        .required('Faculty id is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await updateLecturer(lecturerId, values, file);

        enqueueSnackbar('Lecturer was edited successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/admin-panel/lecturers'), 400)

      } catch (err) {
        console.log(err)
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

  useEffect(() => {
    setLoading(true);

    axios.get(`${BACKEND_URL}/api/lecturers/${lecturerId}`).then((res) => {
     
      formik.setValues({
        first_name: res.data?.data['first_name'] ?? '',
        last_name: res.data?.data['last_name'] ?? '',
        email: res.data?.data['email'] ?? '',
        nic_number: res.data?.data['nic_number'] ?? '',
        dob: res.data?.data['dob'] ?? '',
        user_name: res.data?.data?.user['user_name'] ?? '',
        country: res.data?.data['country'] ?? '',
        city: res.data?.data['city'] ?? '',
        contact_no: res.data?.data['contact_no'] ?? '',
        admission_date: res.data?.data['admission_date'] ?? '',
        batch: res.data?.data['batch'] ?? 0,
        faculty_id: res.data?.data['faculty_id'] ?? '',
        department_id: res.data?.data['department_id'] ?? '',
      })

      setLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lecturerId])

  return (
    <>
      <Head>
        <title>
          Lecturers | E-LMS
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
                  Lecturers
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Lecturers',
                    linkUrl: '/admin-panel/lecturers',
                  },
                  {
                    text: 'Edit',
                    linkUrl: '/admin-panel/lecturers/edit/',
                    active: true
                  },
                ]} />

              </Stack>
            </Stack>

            {loading && <LinearProgress />}

            {!loading && <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Edit Lecturer" />

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
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={5}
                        sx={{ mb: 3 }}
                      >
                        <TextField
                          fullWidth
                          type="text"
                          label="First Name"
                          name="first_name"
                          error={!!(formik.touched.first_name && formik.errors.first_name)}
                          helperText={formik.touched.first_name && formik.errors.first_name}
                          value={formik.values.first_name}
                          onChange={formik.handleChange}
                        />

                        <TextField
                          fullWidth
                          type="text"
                          label="Last Name"
                          name="last_name"
                          error={!!(formik.touched.last_name && formik.errors.last_name)}
                          helperText={formik.touched.last_name && formik.errors.last_name}
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                        />
                      </Stack>
                      <Stack
                        direction="row"
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
                              value={null}
                            >
                            </option>
                            {departments.map((d) => (
                              <option
                                key={d.id}
                                value={d.id}
                              >
                                {d.name}
                              </option>
                            ))}
                          </TextField>
                        </FormControl>

                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={5}
                        sx={{ mb: 3 }}
                      >

                        <TextField
                          fullWidth
                          type="text"
                          label="Email"
                          name="email"
                          error={!!(formik.touched.email && formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />

                        <TextField
                          fullWidth
                          type="text"
                          label="NIC"
                          name="nic_number"
                          error={!!(formik.touched.nic_number && formik.errors.nic_number)}
                          helperText={formik.touched.nic_number && formik.errors.nic_number}
                          value={formik.values.nic_number}
                          onChange={formik.handleChange}
                        />

                        <TextField
                          fullWidth
                          type="text"
                          label="Contact No"
                          name="contact_no"
                          error={!!(formik.touched.contact_no && formik.errors.contact_no)}
                          helperText={formik.touched.contact_no && formik.errors.contact_no}
                          value={formik.values.contact_no}
                          onChange={formik.handleChange}
                        />

                      </Stack>


                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={5}
                        sx={{ mb: 3 }}
                      >

                        <TextField
                          fullWidth
                          type="text"
                          label="User Name"
                          name="user_name"
                          error={!!(formik.touched.user_name && formik.errors.user_name)}
                          helperText={formik.touched.user_name && formik.errors.user_name}
                          value={formik.values.user_name}
                          onChange={formik.handleChange}
                        />

                        <TextField
                          fullWidth
                          type="password"
                          label="Password"
                          name="password"
                          error={!!(formik.touched.password && formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        />

                      </Stack>


                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={5}
                        sx={{ mb: 3 }}
                      >
                        <DatePicker
                          value={formik.values.dob}
                          label="Date of birth"
                          name="dob"
                          onChange={value => formik.setFieldValue("dob", value)}
                          renderInput={(params) => <TextField
                            name="dob"
                            fullWidth
                            {...params}
                          />}
                        />

                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={5}
                        sx={{ mb: 3 }}
                      >
                        <TextField
                          fullWidth
                          type="text"
                          label="Country"
                          name="country"
                          error={!!(formik.touched.country && formik.errors.country)}
                          helperText={formik.touched.country && formik.errors.country}
                          value={formik.values.country}
                          onChange={formik.handleChange}
                        />

                        <TextField
                          fullWidth
                          type="text"
                          label="City"
                          name="city"
                          error={!!(formik.touched.city && formik.errors.city)}
                          helperText={formik.touched.city && formik.errors.city}
                          value={formik.values.city}
                          onChange={formik.handleChange}
                        />
                      </Stack>

                    </FormControl>

                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <FormControl>
                      <FormLabel sx={{ mb: '12px' }}>Upload Timetable image (Screenshot of google calendar)</FormLabel>
                      <DragDropFileUpload file={file} onFileChange={(file) => setFile(file)} />
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
            </Card>}
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
