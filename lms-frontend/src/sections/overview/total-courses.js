import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

export const TotalCourses = (props) => {
  const { difference, positive = false, sx } = props;

  const [totalCourses, setTotalCourses] = useState('Loading...')

  async function refresh() {
    const { data } = await axios.get(`${BACKEND_URL}/api/totalCourses`)
    setTotalCourses(data?.data || 0)
  }

  useEffect(() => {
    refresh();
  }, [])


  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Total Courses
            </Typography>
            <Typography variant="h4">
              {totalCourses}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <BookOpenIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        
      </CardContent>
    </Card>
  );
};

TotalCourses.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object
};

