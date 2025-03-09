import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, LinearProgress } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const CampaignCard = ({ campaign }) => {
  const progress = (campaign.currentAmount / campaign.goal) * 100;

  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={campaign.image || 'https://via.placeholder.com/300x140'}
        alt={campaign.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <Chip
            label={campaign.category}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={campaign.status}
            size="small"
            color={campaign.status === 'Active' ? 'success' : 'default'}
          />
          {campaign.isVerified && (
            <Chip
              label="Verified"
              size="small"
              color="info"
              variant="outlined"
            />
          )}
        </Box>
        <Typography gutterBottom variant="h6" component="div">
          {campaign.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {campaign.description}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              ${campaign.currentAmount} raised
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${campaign.goal} goal
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {formatDistanceToNow(new Date(campaign.deadline), { addSuffix: true })}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {campaign.backers} backers
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CampaignCard;