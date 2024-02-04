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
  Paper,
  SvgIcon,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL, truncate } from 'src/apis/consts';
import { Stack } from '@mui/system';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { getAllNotices } from 'src/pages/common-pages/noticeboard';
import { getAllFeedbacks } from 'src/pages/admin-panel/feedbacks';

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
      {truncate(description, 150)}
    </Alert>
  );
};


const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loadingNotices, setLoadingNotices] = useState(true);


  useEffect(() => {
    getAllNotices()
      .then((notices) => {
        setNotices(notices)
      })
      .catch((err) => {
        enqueueSnackbar('Error occured while fetching dashbaord data!', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })
      }).finally(() => {
        setLoadingNotices(false)
      })
  }, []);

  return (
    <div style={{ padding: 14 }} className="App">
      <Typography sx={{ textAlign: 'center' }} variant="h6" gutterBottom>
        Noticeboard
      </Typography>
      {loadingNotices && (
        <CircularProgress />
      )}
      {notices.slice(0, 3).map((notice, index) => (
        <div
          key={index}
          style={{ padding: '10px' }}>
          <Notice
            key={index}
            title={notice.title}
            severity={'success'}
            description={notice.description}
          />
        </div>

      ))}
    </div>
  );
};


export const AdminDashboardPanel = (props) => {
  const { sx } = props;

  const [feedBackData, setFeedbackData] = useState([
    { name: 'harassment', value: 0 },
    { name: 'administration', value: 0 },
    { name: 'academic', value: 0 },
    { name: 'financial', value: 0 },
  ]);

  const COLORS = ['#00C49F', '#FFBB28', '#0088FE', '#FF8042', '#FFF042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.03;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text style={{ fontWeight: 'bold', fontSize: '10px' }} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {feedBackData[index]?.name} ({feedBackData[index]?.value})
      </text>
    );
  };

  useEffect(() => {
    getAllFeedbacks()
      .then((feedbacks) => {
        feedBackData?.forEach(fD => fD.value = 0)

        feedbacks?.forEach(f => {
          let matchingFeedbackType = feedBackData?.find(fD => f?.type == fD?.name);
          if (!matchingFeedbackType) return;
          matchingFeedbackType.value += 1

        })

        console.log(feedbacks)
        console.log(feedBackData)
        setFeedbackData([...feedBackData]);

      })
      .catch((err) => {
        enqueueSnackbar('Error occured while fetching dashbaord data!', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',

          },
          autoHideDuration: 2000
        })
      })
  }, []);

  return (
    <Card sx={sx}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <NoticeList />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" sx={{ textAlign: 'center' }} gutterBottom>
              Feedbacks
            </Typography>
            <Paper>
              <div style={{ width: "100%", height: 500 }}>
                <ResponsiveContainer>
                  <PieChart width={400} height={400}>
                    <Pie
                      cx="50%"
                      cy="50%"
                      data={feedBackData}
                      label={renderCustomizedLabel}
                      labelLine={false}
                      fill="#8884d8"
                      dataKey="value"
                      innerRadius={70}
                      outerRadius={170}
                    >
                      {feedBackData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Paper>
          </Grid>
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

AdminDashboardPanel.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
