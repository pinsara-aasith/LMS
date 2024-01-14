import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const Timetable = () => {
  // Dummy data for demonstration purposes
  const timetableData = [
    ['Discrete Mathematics', 'Programming', 'Digital Logic', 'Algorithms', 'Computer Architecture'],
    ['Algorithms', 'Computer Architecture', 'Data Structures', 'Computer Networks', 'Discrete Mathematics'],
    ['Data Structures', 'Computer Networks', 'Discrete Mathematics', 'Programming', 'Digital Logic'],
    ['Algorithms', 'Computer Architecture', 'Data Structures', 'Computer Networks', 'Discrete Mathematics'],
    ['Interval', 'Interval', 'Interval', 'Interval', 'Interval'],
    ['Operating Systems', 'Database Management', 'Software Engineering', 'Computer Graphics', 'Artificial Intelligence'],
    ['Web Development', 'Network Security', 'Machine Learning', 'Operating Systems', 'Database Management'],
    ['Computer Vision', 'Parallel Computing', 'Network Protocols', 'Cybersecurity', 'Human-Computer Interaction'],
    ['Mobile App Development', 'Cloud Computing', 'Cryptography', 'Computer Organization', 'Natural Language Processing'],
    ['Embedded Systems', 'Big Data Analytics', 'Robotics', 'Computer Ethics', 'Quantum Computing']
    // Add more rows as needed
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {daysOfWeek.map((day) => (
              <TableCell key={day} align="center">{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeSlots.map((time, timeSlotIndex) => (
            <TableRow key={time}>
              <TableCell component="th" scope="row">
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '13px' }}>
                  {timeSlots.length == timeSlotIndex + 1 ? time : `${time} - ${timeSlots[timeSlotIndex + 1]}`}
                </Typography>
              </TableCell>
              {daysOfWeek.map((_, dayIndex) => (
                <TableCell key={(dayIndex * 1000) + timeSlotIndex} align="center">
                  <Typography variant="body2" sx={{ fontSize: '12px' }}>
                    {timetableData[timeSlotIndex][dayIndex]}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Timetable;
