import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Container, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { getAllDepartments } from '../departments';
import { getAllFaculties } from '../faculties';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export function insertStudent(data) {
  return axios.post(`${BACKEND_URL}/api/students`, {
    first_name: data?.first_name,
    last_name: data?.last_name,
    email: data?.email,
    nic_number: data?.nic_number,
    dob: dayjs(data?.dob).format('YYYY-MM-DD'),
    country: data?.country,
    contact_no: data?.contact_no,
    city: data?.city,
    admission_date: dayjs(Date(data?.admission_date)).format('YYYY-MM-DD'),
    batch:Number(data?.batch),
    faculty_id: data?.faculty_id,
    department_id: data?.department_id,
  })
}

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllFaculties().then(d => setFaculties(d));
    getAllDepartments().then(d => setDepartments(d));
  }, [])

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      nic_number: '',
      dob: new Date().toISOString(),
      country: '',
      city: '',
      contact_no: '',
      admission_date: new Date().toISOString(),
      batch: 2022,
      faculty_id: '',
      department_id: '',
      submit: null
    },
    validationSchema: Yup.object({
      first_name: Yup
        .string()
        .required('First name is required'),
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
      batch: Yup
        .number()
        .required('Batch is required'),
      department_id: Yup
        .number()
        .required('Department id is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await insertStudent(formik.values)

        enqueueSnackbar('Student was added successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/students'), 400)

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
          Students | LMS
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
                  Students
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Students',
                    linkUrl: '/students',
                  },
                  {
                    text: 'Add New',
                    linkUrl: '/students/create',
                    active: true
                  },
                ]} />

              </Stack>
            </Stack>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Add New Student" />
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

                        <DatePicker
                          value={formik.values.admission_date}
                          onChange={value => formik.setFieldValue("admission_date", value)}
                          label="Admission Date"
                          name="admission_date"
                          renderInput={(params) => <TextField
                            fullWidth
                            {...params} />}
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
                          type="number"
                          label="Batch"
                          name="batch"
                          error={!!(formik.touched.batch && formik.errors.batch)}
                          helperText={formik.touched.batch && formik.errors.batch}
                          value={formik.values.batch}
                          onChange={formik.handleChange}
                        />

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
