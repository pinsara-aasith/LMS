import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, NativeSelect, OutlinedInput, Rating, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/student-panel/dashboard/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';

const Page = () => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    console.log('Feedback Submitted:', { content, rating });
    setContent('');
    setRating(0);
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
                      value={content}
                      onChange={handleContentChange}
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
