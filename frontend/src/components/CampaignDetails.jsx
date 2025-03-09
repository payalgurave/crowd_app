import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Box, Card, CardMedia, LinearProgress, Button, TextField, Divider, Avatar, Paper } from '@mui/material';
import { AccessTime, MonetizationOn, Group, Update } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateContent, setUpdateContent] = useState('');

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  const fetchCampaignDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
      setCampaign(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching campaign details:', error);
      toast.error('Failed to load campaign details');
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to donate');
        navigate('/login');
        return;
      }

      await axios.post(`http://localhost:5000/api/campaigns/${id}/support`, 
        { amount: Number(donationAmount) },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      toast.success('Thank you for your donation!');
      fetchCampaignDetails();
      setDonationAmount('');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to process donation');
    }
  };

  const handlePostUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to post updates');
        navigate('/login');
        return;
      }

      await axios.post(`http://localhost:5000/api/campaigns/${id}/updates`,
        { content: updateContent },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      toast.success('Update posted successfully!');
      fetchCampaignDetails();
      setUpdateContent('');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to post update');
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography>Loading campaign details...</Typography>
        </Box>
      </Container>
    );
  }

  if (!campaign) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography>Campaign not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            {campaign.image && (
              <CardMedia
                component="img"
                height="400"
                image={campaign.image}
                alt={campaign.title}
              />
            )}
            <Box sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {campaign.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {campaign.description}
              </Typography>

              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom>Campaign Progress</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100)} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">
                    ${campaign.currentAmount} raised
                  </Typography>
                  <Typography variant="body2">
                    ${campaign.targetAmount} goal
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime color="primary" sx={{ mr: 1 }} />
                    <Typography>{campaign.daysRemaining} days left</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MonetizationOn color="primary" sx={{ mr: 1 }} />
                    <Typography>{campaign.supporters?.length || 0} donations</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Group color="primary" sx={{ mr: 1 }} />
                    <Typography>Created by {campaign.creator?.name}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Campaign Updates</Typography>
            {campaign.updates?.map((update, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {new Date(update.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">{update.content}</Typography>
              </Paper>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Make a Donation</Typography>
            <TextField
              fullWidth
              label="Amount ($)"
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleDonate}
              disabled={!donationAmount || campaign.status !== 'active'}
            >
              Donate Now
            </Button>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Recent Supporters</Typography>
            {campaign.supporters?.slice(0, 5).map((supporter, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>{supporter.user?.name?.[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle2">{supporter.user?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Donated ${supporter.amount}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Card>

          {campaign.creator?._id === localStorage.getItem('userId') && (
            <Card sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>Post Update</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Update Content"
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handlePostUpdate}
                disabled={!updateContent}
              >
                Post Update
              </Button>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CampaignDetails;