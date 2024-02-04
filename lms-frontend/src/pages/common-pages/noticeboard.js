import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Alert, Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, NativeSelect, OutlinedInput, Paper, Rating, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

export async function getAllNotices() {
  const response = await axios.get(`${BACKEND_URL}/api/notices`)
  return response.data?.['data']
}

const Page = () => {
  const [notices, setNotices] = useState();

  useEffect(() => {
    getAllNotices()
      .then((ns) => { setNotices(ns) })
  }, []);

  return (
    <>
      <Head>
        <title>
          Noticeboard | E-LMS
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
                  {notices?.length ? notices?.map((notice, index) => (
                    <Alert sx={{ m: 3 }} key={index} severity={notice.type}>
                      <Typography variant="h6">{notice.title}</Typography>
                      <Typography variant="caption" color="textSecondary">{`Created on: ${new Date(notice.updated_at).toLocaleString()}`}</Typography>
                      <Typography variant="body1">{notice.description}</Typography>
                    </Alert>
                  )): <Typography variant="h6">No notices available</Typography>}
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
