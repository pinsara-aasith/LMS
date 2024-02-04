import { Breadcrumbs, Typography, Link, Paper, IconButton, SvgIcon, CircularProgress, Grid } from '@mui/material';
import { Box } from '@mui/system';
import NextLink from 'next/link';
import CloudUploadIcon from '@heroicons/react/24/solid/CloudArrowUpIcon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

export function DragDropFileUpload({ file, onFileChange }) {
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    onFileChange(file);

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
              alt={'File cannot be previewed'}
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        </Grid>
      </Paper>
      )}
    </Box>
  );
}