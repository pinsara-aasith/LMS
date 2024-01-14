import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Alert, Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, NativeSelect, OutlinedInput, Paper, Rating, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/lecture-panel/dashboard/layout';
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

  const notices = [
    {
      title: 'Important Announcement',
      description: 'Stay informed! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula justo vel odio rhoncus, sit amet faucibus magna fermentum.',
      createdDate: '2024-01-13',
      type: 'info',
    },
    {
      title: 'Upcoming Event',
      description: 'Join us for an exciting event! Curabitur commodo elit vel turpis vulputate, vel ullamcorper odio fermentum. Duis auctor vel tortor vel semper. Integer ut dictum libero.',
      createdDate: '2024-01-14',
      type: 'success',
    },
    {
      title: 'Submission Deadline Reminder',
      description: 'Don\'t miss the deadline! Sed tristique lacus at quam rhoncus, eu cursus risus ultrices. Phasellus tincidunt, turpis a lacinia posuere, odio turpis commodo eros, vel aliquam justo metus a quam.',
      createdDate: '2024-01-15',
      type: 'warning',
    },
  ];

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
            <Container>
              <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                  Noticeboard
                </Typography>
                <List>
                  {notices.map((notice, index) => (
                    <Alert sx={{m:3}} key={index} severity={notice.type}>
                      <Typography variant="h6">{notice.title}</Typography>
                      <Typography variant="caption" color="textSecondary">{`Created on: ${notice.createdDate}`}</Typography>
                      <Typography variant="body1">{notice.description}</Typography>
                    </Alert>
                  ))}
                </List>
              </Paper>
            </Container>
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
