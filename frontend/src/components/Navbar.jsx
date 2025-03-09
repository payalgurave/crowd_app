import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Box,
  Container,
  Stack,
} from '@mui/material';
import { KeyboardArrowDown, PersonOutline, Search as SearchIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import logo from '../assets/logo.svg';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}));

const StartFundraiserButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Navbar = () => {
  const [browseAnchorEl, setBrowseAnchorEl] = useState(null);
  const [fundraiseAnchorEl, setFundraiseAnchorEl] = useState(null);
  
  const handleBrowseClick = (event) => {
    setBrowseAnchorEl(event.currentTarget);
  };

  const handleFundraiseClick = (event) => {
    setFundraiseAnchorEl(event.currentTarget);
  };

  const handleBrowseClose = () => {
    setBrowseAnchorEl(null);
  };

  const handleFundraiseClose = () => {
    setFundraiseAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              mr: 4,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '0.5px',
              '&:hover': {
                color: 'primary.dark'
              }
            }}
          >
            <img src={logo} alt="Logo" style={{ height: '45px', marginRight: '12px', display: 'block' }} />
            CrowdFunding
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexGrow: 1 }}>
            <StyledButton
              endIcon={<KeyboardArrowDown />}
              onClick={handleBrowseClick}
            >
              Browse Fundraisers
            </StyledButton>
            <Menu
              anchorEl={browseAnchorEl}
              open={Boolean(browseAnchorEl)}
              onClose={handleBrowseClose}
            >
              <MenuItem onClick={handleBrowseClose} component={Link} to="/medical">
                Medical Treatment
              </MenuItem>
              <MenuItem onClick={handleBrowseClose}>Education</MenuItem>
              <MenuItem onClick={handleBrowseClose}>NGO / Charity</MenuItem>
              <MenuItem onClick={handleBrowseClose}>Emergency</MenuItem>
            </Menu>

            <StyledButton
              endIcon={<KeyboardArrowDown />}
              onClick={handleFundraiseClick}
            >
              Fundraise For
            </StyledButton>
            <Menu
              anchorEl={fundraiseAnchorEl}
              open={Boolean(fundraiseAnchorEl)}
              onClose={handleFundraiseClose}
            >
              <MenuItem onClick={handleFundraiseClose}>Medical Treatment</MenuItem>
              <MenuItem onClick={handleFundraiseClose}>Memorial</MenuItem>
              <MenuItem onClick={handleFundraiseClose}>Education</MenuItem>
              <MenuItem onClick={handleFundraiseClose}>Others</MenuItem>
            </Menu>

            <StyledButton>How It Works</StyledButton>
          </Stack>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <StartFundraiserButton
              variant="contained"
              component={Link}
              to="/create-campaign"
            >
              Start a Fundraiser
            </StartFundraiserButton>
            
            <StyledButton
              startIcon={<PersonOutline />}
              component={Link}
              to="/login"
            >
              Sign In
            </StyledButton>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;