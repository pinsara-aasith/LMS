import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardDescription, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, NativeSelect, OutlinedInput, Rating, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { useSnackbar } from 'notistack';

export function addFeedback(data) {
  return axios.post(`${BACKEND_URL}/api/feedbacks`, {
    type: data?.type,
    rating: data?.rating,
    description: data?.description,
  })
}

const Page = () => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    addFeedback({
      description,
      rating,
      type: feedbackType
    })
    setDescription('');
    setRating(0);
    setFeedbackType('');

    enqueueSnackbar('Feedback was added successfully!', {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
        
      },
      autoHideDuration: 2000
    })
  };

  return (
    <>
      <Head>
        <title>
          Feedbacks | E-LMS
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
                  University Feedback form
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Add New Feedback',
                    linkUrl: '/feedbacks/create',
                    active: true
                  },
                ]} />

              </Stack>

            </Stack>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="New Feedback" />
              <CardContent>
                <Container>
                  <form>
                    <TextField
                      fullWidth
                      label="Select Feedback Type"
                      name="feedback_type"
                      required
                      select
                      onChange={(e) => setFeedbackType(e?.target?.value)}
                      SelectProps={{ native: true }}
                    >
                      <option
                        key={''}
                        value={null}
                      >
                      </option>
                      {['Harrasment', 'Academic', 'Financial'].map((f) => (
                        <option
                          key={f}
                          value={f}
                        >
                          {f}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      label="Please tell us about the feedback/complaint"
                      multiline
                      rows={4}
                      fullWidth
                      value={description}
                      onChange={handleDescriptionChange}
                      margin="normal"
                      variant="outlined"
                    />
                    <Box mt={2}>
                      <Typography variant="subtitle1">Rate your feeling:</Typography>
                      <Rating
                        name="rating"
                        value={rating}
                        precision={1}
                        onChange={handleRatingChange}
                        size="large"
                      />
                    </Box>
                    <Box mt={2}>
                      <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit Feedback
                      </Button>
                    </Box>
                  </form>
                </Container>
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
