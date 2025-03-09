import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, MenuItem, Stepper, Step, StepLabel, Grid } from '@mui/material';
import CampaignCard from './CampaignCard';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    goal: '',
    deadline: '',
    category: '',
    status: 'Active',
    image: '',
    rewards: [],
    story: '',
    currentAmount: 0,
    backers: 0,
    isVerified: false
  });

  const categories = [
    'Technology',
    'Art',
    'Music',
    'Film',
    'Games',
    'Publishing',
    'Fashion',
    'Food',
    'Social Cause',
    'Education'
  ];

  const steps = ['Basic Info', 'Campaign Details', 'Preview & Submit'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add campaign creation logic here
    console.log('Campaign Data:', campaignData);
    navigate('/campaigns');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Campaign Title"
                  name="title"
                  value={campaignData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={campaignData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Short Description"
                  name="description"
                  value={campaignData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Funding Goal ($)"
                  name="goal"
                  value={campaignData.goal}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Campaign Deadline"
                  name="deadline"
                  value={campaignData.deadline}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Campaign Image URL"
                  name="image"
                  value={campaignData.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Campaign Story"
                  name="story"
                  value={campaignData.story}
                  onChange={handleChange}
                  placeholder="Tell your campaign's story..."
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Campaign Preview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <CampaignCard campaign={campaignData} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" gutterBottom>
                  Please review your campaign details before submitting.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ mt: 2 }}
                >
                  Submit Campaign
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Campaign
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep !== steps.length - 1 && (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ ml: 1 }}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCampaign;