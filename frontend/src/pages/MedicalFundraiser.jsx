import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(6),
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

const MedicalFundraiser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <HeroSection>
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Start a FREE Medical Fundraiser & Raise Funds for Medical Treatments
          </Typography>
          <Typography variant="h5" gutterBottom>
            Get immediate financial help for medical emergencies
          </Typography>
        </Container>
      </HeroSection>

      <Container>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <FormContainer>
              <Typography variant="h4" gutterBottom sx={{ color: '#00a0e3' }}>
                Need Money Urgently?
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+91</InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#00a0e3',
                    '&:hover': {
                      backgroundColor: '#0086bd',
                    },
                  }}
                >
                  Start Your Fundraiser
                </Button>
              </Box>
            </FormContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Why Choose Us for Medical Fundraising?
              </Typography>
              <Typography variant="body1" paragraph>
                • Quick and easy setup process
              </Typography>
              <Typography variant="body1" paragraph>
                • 24x7 expert support available
              </Typography>
              <Typography variant="body1" paragraph>
                • Receive donations directly in your bank account
              </Typography>
              <Typography variant="body1" paragraph>
                • Share your campaign easily on social media
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom>
                Success Stories
              </Typography>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="body1">
                  "Thanks to the platform, we raised ₹8 lakhs for my father's heart surgery in just 10 days!"
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1, color: 'text.secondary' }}>
                  - Priya S., Mumbai
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MedicalFundraiser;