import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, CardMedia, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './CampaignList.module.css';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchCampaigns();
  }, []); // Remove category and status dependencies

  const fetchCampaigns = async () => {
    try {
      let url = 'http://localhost:5000/api/campaigns';
      const params = new URLSearchParams();
      if (category) params.append('category', category);
      if (status) params.append('status', status);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await axios.get(url);
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleSubmit = () => {
    fetchCampaigns();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }} className={styles.container}>
        <Typography variant="h4" component="h1" gutterBottom className={styles.title}>
          All Campaigns
        </Typography>

        <Box className={styles.filterContainer}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Art">Art</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Community">Community</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ height: 56, ml: 2 }}
          >
            Apply Filters
          </Button>
        </Box>

        <Grid container spacing={4}>
          {campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={campaign._id}>
              <Card className={styles.campaignCard} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {campaign.image && (
                  <div className={styles.cardMedia}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={campaign.image}
                      alt={campaign.title}
                    />
                  </div>
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {campaign.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {campaign.description.substring(0, 150)}...
                  </Typography>
                  <Box className={styles.campaignStats}>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      ${campaign.currentAmount} raised of ${campaign.targetAmount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {campaign.daysRemaining} days remaining
                    </Typography>
                  </Box>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{
                        width: `${Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <Button
                    component={Link}
                    to={`/campaigns/${campaign._id}`}
                    variant="contained"
                    color="primary"
                    className={styles.viewButton}
                    fullWidth
                  >
                    View Campaign
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CampaignList;