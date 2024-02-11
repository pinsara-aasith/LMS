import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Alert, Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, Link, List, ListItem, ListItemText, MenuItem, NativeSelect, OutlinedInput, Paper, Rating, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/common-panel/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

export async function getAllSubjects() {
  const response = await axios.get(`${BACKEND_URL}/api/me/subjects`)
  return response.data?.['data']
}

function AssignmentGrade(assignment, assignmentGrade) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

const Page = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getAllSubjects()
      .then((ns) => { setSubjects(ns) })
  }, []);

  return (
    <>
      <Head>
        <title>
          Subjects | E-LMS
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
                  Subjects Available For The Course
                </Typography>

                <StyledBreadCrumbs sequence={[
                  {
                    text: 'Subjects',
                    linkUrl: '/subjects',
                    active: true
                  },
                ]} />

              </Stack>

            </Stack>
            <Container>
              <Grid container spacing={3}>
                {subjects?.map((subject, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Link href={`/student-panel/subjects/view/${subject.id}`} color="inherit">

                          <Typography variant="h6" gutterBottom>
                            {subject.name}
                          </Typography>
                        </Link>
                        <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                          Code: {subject.code}
                        </Typography>
                        <Typography color="textSecondary" variant="subtitle2">
                          {subject?.course?.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
