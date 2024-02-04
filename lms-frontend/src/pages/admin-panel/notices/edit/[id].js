import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Autocomplete, Backdrop, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, InputLabel, LinearProgress, MenuItem, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

export function updateNotice(id, data) {
  return axios.put(`${BACKEND_URL}/api/notices/${id}`, {
    title: data?.title,
    description: data?.description
  })
}


const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const noticeId = router.query.id
  const [loading, setLoading] = useState(true);


  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup
        .string()
        .required('title is required'),
      description: Yup
        .string()
        .required('description is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        updateNotice(noticeId, values);

        enqueueSnackbar('Notice was edited successfully!', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })

        setTimeout(() => router.push('/admin-panel/notices'), 400)

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

    axios.get(`${BACKEND_URL}/api/notices/${noticeId}`).then((res) => {
      formik.setValues({
        title: res.data?.data['title'] ?? '',
        description: res.data?.data['description'] ?? '',
      })

      setLoading(false)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noticeId])

  return (
    <>
      <Head>
        <title>
          Notices | E-LMS
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
                  Notices
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Notices',
                    linkUrl: '/admin-panel/notices',
                  },
                  {
                    text: 'Edit',
                    linkUrl: '/admin-panel/notices/edit/',
                    active: true
                  },
                ]} />

              </Stack>
            </Stack>

            {loading && <LinearProgress />}

            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Edit Notice" />

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
                        label="Title"
                        title="title"
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
                        title="description"
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
