import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Link,
  List,
  Paper,
  SvgIcon,
  Typography
} from '@mui/material';
import NextLink from 'next/link'
import { alpha, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { Box, Container, Stack } from '@mui/system';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { getAllNotices } from 'src/pages/common-pages/noticeboard';
import { useSnackbar } from 'notistack';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '100px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Quarter 1',
        'Quarter 2',
        'Quarter 3',
        'Quarter 4',
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

const Notice = ({ title, description, severity }) => {
  return (
    <Alert sx={{ border: '0.5px solid black' }} severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  );
};

export async function getAllSubjects() {
  const response = await axios.get(`${BACKEND_URL}/api/me/subjects`)
  return response.data?.['data']
}

export const StudentDashboardPanel = (props) => {
  const { sx } = props;
  const chartOptions = useChartOptions();

  const { enqueueSnackbar } = useSnackbar();

  const [notices, setNotices] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingNotices, setLoadingNotices] = useState(true);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    setLoadingSubjects(true);
    setLoadingNotices(true);
    Promise.all([getAllSubjects(), getAllNotices()])
      .then(([subjects, notices]) => {
        setSubjects(subjects)
        setNotices(notices)
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar('Error occured while fetching dashbaord data!', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })
      }).finally(() => {
        setLoadingSubjects(false)
        setLoadingNotices(false)
      })
  }, []);

  return (
    <Card sx={sx}>
      <CardContent>
        <Grid container spacing={3}>

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
                  <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
                    <Typography variant="h6" gutterBottom>
                      Noticeboard
                    </Typography>
                    <List>

                      <Grid container spacing={1}>
                        {loadingNotices && (
                          <CircularProgress />
                        )}
                        {notices?.map((notice, index) => (
                          <Grid item xs={12} sm={4} md={4} key={index}>
                            <Alert sx={{ m: 1 }} key={index} severity={notice.type}>
                              <Typography variant="h6">{notice.title}</Typography>
                              <Typography variant="caption" color="textSecondary">{`Created on: ${new Date(notice.updated_at).toLocaleString()}`}</Typography>
                              <Typography variant="body1">{notice.description}</Typography>
                            </Alert>
                          </Grid>
                        ))}
                      </Grid>
                    </List>
                  </Paper>
                </Container>
              </Stack>
            </Container>
          </Box>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Recently Added Subjects
            </Typography>
            <Paper>

              <Container>
                <Grid sx={{ mt: 3 }} container spacing={3}>
                  {loadingSubjects && (
                    <CircularProgress />
                  )}
                  {!subjects.length && <>No subjects related to the student</>}

                  {subjects.map((subject, index) => (
                    <Grid sx={{ height: '100%' }} item xs={12} sm={4} md={4} key={index}>
                      <Card sx={{ mb: 3 }}>
                        <CardContent>

                          <Link component={NextLink} href={`/student-panel/subjects/view/${subject.id}`} color="inherit">

                            <Typography variant="h6" gutterBottom>
                              {subject.name}
                            </Typography>
                          </Link>
                          <Typography color="textSecondary" variant="subtitle2" gutterBottom>
                            Code: {subject.code}
                          </Typography>
                          <Typography color="textSecondary" variant="subtitle2">
                            {subject.course.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Paper>
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Timetable
            </Typography>
            <iframe style={{ width: '100%', height: '500px' }} src="https://calendar.google.com/calendar/embed?mode=WEEK&height=600&wkst=2&bgcolor=%23ffffff&ctz=Asia%2FColombo&showTz=0&showCalendars=0&showDate=1&showTabs=0&showPrint=0&showTitle=0&showNav=0&src=ODI2MDBkZmY4ZWFlMTg3MjdkNTNjNTA1MDIyODgwNTc2YjI0ODBhOWU5OTIyYmE1NTZjNjQzZDFkYTYzMmY1YkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5" frameBorder="0" scrolling="no"></iframe>
          </Grid> */}

        </Grid>


      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>

        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          Get Report
        </Button>
      </CardActions>
    </Card>
  );
};

StudentDashboardPanel.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
