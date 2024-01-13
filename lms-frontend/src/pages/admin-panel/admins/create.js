import { useCallback, useMemo, useState } from 'react';
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

export function insertAdmin(data) {
  return axios.post(`${BACKEND_URL}/api/admins`, {
    name: data?.name,
    email: data?.email,
    password: data?.password
  })
}

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .required('name is required'),
      email: Yup
        .string().email()
        .required('email is required'),
      password: Yup
        .string()
        .required('password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await insertAdmin(formik.values)

        enqueueSnackbar('Admin was added successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/admins'), 400)

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
          Admins | LMS
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
                  Admins
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Admins',
                    linkUrl: '/admins',
                  },
                  {
                    text: 'Add New',
                    linkUrl: '/admins/create',
                    active: true
                  },
                ]} />

              </Stack>

            </Stack>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Add New Admin" />
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
                        label="Email"
                        name="email"
                        error={!!(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                    </FormControl>
                    <FormControl
                      variant="filled"
                      fullWidth

                    >
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
