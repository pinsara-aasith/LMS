import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Container, FormControl, Grid, InputLabel, Link, MenuItem, NativeSelect, OutlinedInput, Select, Snackbar, Stack, SvgIcon, TextField, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/student-panel/dashboard/layout';
import { StyledBreadCrumbs } from 'src/components/breadcrumbs';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';


function DragDropFileUpload({ onFileUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setDragOver(false);
      const files = event.dataTransfer.files;
      if (files && files[0]) {
        handleFileChange(files[0]);
      }
    },
    []
  );

  const handleFileChange = (file) => {
    setFile(file);
    setLoading(true);
    onFileUpload(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = useCallback(
    (event) => {
      const files = event.target.files;
      if (files && files[0]) {

        handleFileChange(files[0]);
      }
    },
    []
  );
  return (
    <Box>
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#eee' : '#fafafa',
          position: 'relative',
        }}
      >
        <input
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="raised-button-file">
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <SvgIcon>
                <CloudUploadIcon style={{ fontSize: 60 }} />
              </SvgIcon>
            </IconButton>
            <Typography>Drag and drop files here or click to select files</Typography>
          </Box>
        </label>
        {loading && (
          <CircularProgress
            size={24}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Paper>

      {imagePreview && (<Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#eee' : '#fafafa',
          position: 'relative',
        }}
      >
        <Grid container justifyContent="center" style={{ marginTop: 16 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box
              component="img"
              src={imagePreview}
              alt={file?.name}
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Paper>
      )}
    </Box>
  );
}

const Page = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Head>
        <title>
          Assignments | E-LMS
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
                  Assignment 1: Data Structures
                </Typography>
              </Stack>

            </Stack>
            <Card>
              <CardContent>
            <Typography variant="body1">
            Implement various data structures and analyze their time complexity.
                </Typography>
            

              </CardContent>
            </Card>
            <Card sx={{ overflow: 'visible' }}>
              <CardHeader title="Upload your work" />
              <CardContent>
                <form>
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={5}
                    sx={{ mb: 3 }}
                  >
                    <DragDropFileUpload onFileUpload={() => { }} />

                    <FormControl
                      variant="filled"
                      fullWidth
                    >
                      <TextField
                        multiline
                        rows={8}
                        fullWidth
                        type="text"
                        label="Write something about the assignment"
                        name="description"
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
