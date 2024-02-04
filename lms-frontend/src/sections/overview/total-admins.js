import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

export const TotalAdmins = (props) => {
  const { difference, positive = false, sx } = props;

  const [totalAdmins, setTotalAdmins] = useState('Loading...')

  async function refresh() {
    const { data } = await axios.get(`${BACKEND_URL}/api/totalAdmins`)
    setTotalAdmins(data?.data || 0)
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
          spacing={0}
        >
          <Stack>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Total Admins
            </Typography>
            <Typography variant="h4">
              {totalAdmins}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <UserCircleIcon />
            </SvgIcon>
          </Avatar>
        </Stack>

      </CardContent>
    </Card>
  );
};

TotalAdmins.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
