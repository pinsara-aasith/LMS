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

  const [year, setYear] = useState(2023)
  const [sales, setSales] = useState(0)

  async function refresh() {
    // const { data } = await axios.get(`${BACKEND_URL}/api/reports/quartelySales/${year}`)
    // let report = data?.report?.[0]
    // console.log(report, 'report')

    // if (!!report) {
    //   let _sales = 0

    //   report.forEach(r => {
    //     _sales += r.Revenue
    //   })

    //   setSales(_sales)
    // }

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
              4
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
