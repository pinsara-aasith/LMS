import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import HomeModernIcon from '@heroicons/react/24/solid/HomeModernIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

export const TotalFaculties = (props) => {
  const { difference, positive = false, sx } = props;

  const [totalFaculties, setTotalFaculties] = useState('Loading...')

  async function refresh() {
    const { data } = await axios.get(`${BACKEND_URL}/api/totalFaculties`)
    setTotalFaculties(data?.data || 0)
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
              Total Faculties
            </Typography>
            <Typography variant="h4">
              {totalFaculties}
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
              <HomeModernIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        
      </CardContent>
    </Card>
  );
};

TotalFaculties.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};

