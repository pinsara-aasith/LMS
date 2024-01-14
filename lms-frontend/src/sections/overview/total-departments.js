import PropTypes from 'prop-types';
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from 'src/apis/consts';

export const TotalDepartments = (props) => {
  const { sx } = props;

  const [value, setValue] = useState(0)

  async function refresh() {
    // const { data } = await axios.get(`${BACKEND_URL}/api/reports/totalEmployees`)
    // setValue(data?.data?.[0].Count)
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
              Total Departments
            </Typography>
            <Typography variant="h4">
              2
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <HomeIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

TotalDepartments.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
