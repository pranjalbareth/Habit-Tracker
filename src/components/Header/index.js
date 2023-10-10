import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@mui/material';
import './style.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#308fe829',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: '#2e75de',
  },
}));

function Header() {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeOfDay('Good Morning');
    } else if (hour >= 12 && hour < 17) {
      setTimeOfDay('Good Afternoon');
    } else {
      setTimeOfDay('Good Evening');
    }
  }, []);
  return (
    <Grid xs={9} style={{
      background: '#1a202c',
      maxWidth: '100%',
      height: '35%',
      padding: '35px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '40px'
    }}>
      <Typography style={{ fontSize: '40px', fontWeight: '800' }}>{timeOfDay}, Anirudh</Typography>
      <Box sx={{
        flexGrow: 1, gap: '16px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <BorderLinearProgress variant="determinate" value={65} />
        <Typography style={{ fontSize: '18px', fontWeight: '200' }}>65% achieved</Typography>
      </Box>
    </Grid>
  )
}

export default Header;