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
  Divider,
  Grid,
  Link,
  Paper,
  SvgIcon,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';
import { Container, Stack } from '@mui/system';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

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
    <Alert sx={{border: '0.5px solid black'}} severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  );
};


const NoticeList = () => {
  const imgLink = 'your_image_link_here'; // Replace with your actual image link
  const notices = [
    {
      "title": "Important Course Update",
      "description": "There has been a change in the course schedule. Please check the updated timetable for the latest information on class timings and assignments.",
    },
    {
      "title": "Upcoming Webinar",
      "description": "Don't miss the upcoming webinar on 'Latest Trends in Technology.' Join us to gain valuable insights and interact with industry experts.",
    },
    {
      "title": "New Learning Resources Available",
      "description": "We have added new learning materials to enhance your understanding of the subject. Visit the Resources section to access the latest study materials.",
    },
    {
      "title": "Reminder: Assignment Submission",
      "description": "A friendly reminder to submit your assignments by the deadline. Late submissions will not be accepted, so make sure to complete your work on time.",
    },
    {
      "title": "System Maintenance Notification",
      "description": "The E-LMS will undergo scheduled maintenance on Saturday from 10:00 PM to 12:00 AM. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.",
    },
    {
      "title": "Guest Lecture by Industry Expert",
      "description": "We are excited to announce a guest lecture by a renowned industry expert. Join us for this insightful session on 'Career Opportunities in the Tech Industry.'",
    },
    {
      "title": "Feedback Survey",
      "description": "Your feedback is important to us. Please take a moment to complete the feedback survey and let us know about your experience with the E-LMS. Your input helps us improve!",
    },
    {
      "title": "Course Registration Deadline",
      "description": "The deadline for course registration is approaching. Ensure you have registered for the upcoming semester courses to avoid any disruptions to your learning journey.",
    },
    {
      "title": "Holiday Break Notice",
      "description": "Wishing you a joyful holiday break! Please note that there will be no classes during the upcoming holidays. Enjoy your break and come back refreshed for the next session.",
    },
    {
      "title": "Congratulations on Course Completion",
      "description": "Congratulations! You have successfully completed the 'Introduction to Programming' course. We applaud your dedication and hard work. Best wishes for your future courses!",
    }
  ];

  return (
    <div style={{ padding: 14 }} className="App">
      <Typography variant="h6" gutterBottom>
        Noticeboard
      </Typography>
      {notices.slice(0, 3).map((notice, index) => (
        <div style={{ padding: '10px' }}>
          <Notice
            key={index}
            title={notice.title}
            severity={index % 2 == 1 ? 'info': 'success'}
            description={notice.description}
          />
        </div>

      ))}
    </div>
  );
};


export const StudentDashboardPanel = (props) => {
  const { sx } = props;
  const chartOptions = useChartOptions();

  const [year, setYear] = useState(2023)
  const [sales, setSales] = useState([0, 0, 0, 0])

  async function refresh() {
    // const {data} = await axios.get(`${BACKEND_URL}/api/reports/quartelySales/${year}`)
    // let report = data?.report?.[0]
    // console.log(report, 'report')
    // if(!!report) {
    //   const _sales = [0,0,0,0]

    //   report.forEach(r => {
    //     _sales[r.Quarter - 1] += r.Revenue
    //   })

    //   setSales(_sales)
    //   console.log(_sales, "sales")
    // }
  }

  const data = [
    { name: 'Harassment', value: 300 },
    { name: 'Administration', value: 200 },
    { name: 'Academic', value: 200 },
    { name: 'Financial', value: 40 },
  ];
  const COLORS = ['#00C49F', '#FFBB28', '#0088FE', '#FF8042', '#FFF042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text style={{ fontWeight: 'bold', fontSize: '11px' }} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {data[index].name}
      </text>
    );
  };

  const subjects = [
    {
      id: 1,
      name: 'Data Structures and Algorithms',
      code: 'CSE301',
      course: 'Computer Science Engineering',
    },
    {
      id: 2,
      name: 'Database Management Systems',
      code: 'CSE401',
      course: 'Computer Science Engineering',
    },
    {
      id: 3,
      name: 'Computer Networks',
      code: 'CSE501',
      course: 'Computer Science Engineering',
    },
    {
      id: 4,
      name: 'Software Engineering',
      code: 'CSE601',
      course: 'Computer Science Engineering',
    },
    {
      id: 5,
      name: 'Artificial Intelligence',
      code: 'CSE701',
      course: 'Computer Science Engineering',
    },
    {
      id: 6,
      name: 'Web Development',
      code: 'CSE801',
      course: 'Computer Science Engineering',
    },
    {
      id: 7,
      name: 'Operating Systems',
      code: 'CSE302',
      course: 'Computer Science Engineering',
    },
    {
      id: 8,
      name: 'Computer Architecture',
      code: 'CSE402',
      course: 'Computer Science Engineering',
    },
    {
      id: 9,
      name: 'Cybersecurity',
      code: 'CSE502',
      course: 'Computer Science Engineering',
    },
  ];

  useEffect(() => {
    refresh();
  }, [])

  return (
    <Card sx={sx}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <NoticeList />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Frequently Accessed Courses
            </Typography>
            <Paper>
            <Container>
              <Grid sx={{mt:3}} container spacing={3}>
                {subjects.splice(0,3).map((subject, index) => (
                  <Grid item xs={12} sm={12} md={12} key={index}>
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
                          {subject.course}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Timetable
            </Typography>
            <iframe style={{ width: '100%', height: '500px' }} src="https://calendar.google.com/calendar/embed?mode=WEEK&height=600&wkst=2&bgcolor=%23ffffff&ctz=Asia%2FColombo&showTz=0&showCalendars=0&showDate=1&showTabs=0&showPrint=0&showTitle=0&showNav=0&src=ODI2MDBkZmY4ZWFlMTg3MjdkNTNjNTA1MDIyODgwNTc2YjI0ODBhOWU5OTIyYmE1NTZjNjQzZDFkYTYzMmY1YkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5" frameborder="0" scrolling="no"></iframe>
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

StudentDashboardPanel.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
