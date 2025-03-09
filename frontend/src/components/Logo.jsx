import React from 'react';
import { Box, Typography } from '@mui/material';

const Logo = ({ variant = 'default' }) => {
  const isSmall = variant === 'small';
  const logoSize = isSmall ? 24 : 32;
  const fontSize = isSmall ? '1.2rem' : '1.5rem';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00a0e3" />
            <stop offset="100%" stopColor="#20d5d2" />
          </linearGradient>
        </defs>
        <path
          d="M16 28c-1.5-1.2-9-7.4-9-14 0-5 4-9 9-9s9 4 9 9c0 6.6-7.5 12.8-9 14zm0-20c-3.3 0-6 2.7-6 6 0 4.6 4.9 9.4 6 10.4 1.1-1 6-5.8 6-10.4 0-3.3-2.7-6-6-6z"
          fill="url(#logoGradient)"
        />
      </svg>
      <Typography
        variant="h6"
        component="span"
        sx={{
          fontWeight: 700,
          fontSize,
          background: 'linear-gradient(45deg, #00a0e3 30%, #20d5d2 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em'
        }}
      >
        FundHope
      </Typography>
    </Box>
  );
};

export default Logo;