import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.svg';
import '../styles/modern.css';

const Home = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);

  useEffect(() => {
    const fetchFeaturedCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns');
        setFeaturedCampaigns(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchFeaturedCampaigns();
  }, []);

  return (
    <div>
      {/* Header with Logo and Website Name */}
      <header className="d-flex justify-content-between align-items-center p-3 shadow-sm bg-white sticky-top">
        <div className="d-flex align-items-center">
          <img src={logo} alt="FundHope Logo" style={{ height: '30px', width: 'auto', marginRight: '10px' }} />
          <h2 className="mb-0 text-primary" style={{ fontSize: '1.5rem' }}>FundHope - Crowdfunding</h2>
        </div>
        <nav className="d-flex align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="dropdown">
              <button className="btn btn-link text-decoration-none dropdown-toggle" type="button" id="browseFundraisersDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Browse Fundraisers
              </button>
              <ul className="dropdown-menu" aria-labelledby="browseFundraisersDropdown">
                <li><Link to="/medical" className="dropdown-item">Medical Crowdfunding</Link></li>
                <li><Link to="/cancer" className="dropdown-item">Cancer Crowdfunding</Link></li>
                <li><Link to="/education" className="dropdown-item">Education Crowdfunding</Link></li>
                <li><Link to="/sports" className="dropdown-item">Sports Crowdfunding</Link></li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn btn-link text-decoration-none dropdown-toggle" type="button" id="fundraiseForDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Fundraise For
              </button>
              <ul className="dropdown-menu" aria-labelledby="fundraiseForDropdown">
                <li><Link to="/ngo-fundraising" className="dropdown-item">NGO Fundraising</Link></li>
                <li><Link to="/sponsor" className="dropdown-item">Sponsor A Child</Link></li>
                <li><Link to="/corporates" className="dropdown-item">Corporate Fundraising</Link></li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn-link text-decoration-none">Contact</Link>
            <Link to="/login" className="btn btn-link text-decoration-none">Login</Link>
            <Link to="/signup" className="btn btn-primary">Create Account</Link>
          </div>
        </nav>
      </header>
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Make Your Dreams Reality</h1>
          <p className="hero-subtitle">Join our community of creators and supporters to bring innovative projects to life.</p>
          <Link to="/create-campaign" className="btn btn-primary">
            Start Your Campaign
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Campaigns</h2>
          <div className="row g-4">
            {featuredCampaigns.map((campaign) => (
              <div className="col-12 col-md-4" key={campaign._id}>
                <div className="campaign-card">
                  <img
                    src={campaign.image || 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'}
                    className="card-img-top"
                    alt={campaign.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{campaign.title}</h5>
                    <p className="card-text text-muted">{campaign.description.substring(0, 150)}...</p>
                    <div className="mt-auto">
                      <div className="progress mb-3">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${(campaign.currentAmount / campaign.targetAmount) * 100}%`,
                            background: 'linear-gradient(45deg, #fb6840, #ff8f6b)'
                          }}
                          aria-valuenow={(campaign.currentAmount / campaign.targetAmount) * 100}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold" style={{ color: '#fb6840' }}>${campaign.currentAmount} raised</span>
                        <Link to={`/campaigns/${campaign._id}`} className="btn btn-secondary">
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/campaigns" className="btn btn-secondary">
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>

      <section className="start-fundraiser-section py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-center mb-5">Start a Fundraiser in three simple steps</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="step-card text-center p-4">
                <div className="step-icon mb-3">
                  <i className="bi bi-pencil-square fs-1 text-primary"></i>
                </div>
                <h3 className="h5">Start your fundraiser</h3>
                <p className="text-muted">It'll take only 2 minutes. Just tell us a few details about you and the ones you are raising funds for.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card text-center p-4">
                <div className="step-icon mb-3">
                  <i className="bi bi-share fs-1 text-primary"></i>
                </div>
                <h3 className="h5">Share your fundraiser</h3>
                <p className="text-muted">All you need to do is share the fundraiser with your friends and family. In no time, support will start pouring in.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card text-center p-4">
                <div className="step-icon mb-3">
                  <i className="bi bi-cash-stack fs-1 text-primary"></i>
                </div>
                <h3 className="h5">Withdraw Funds</h3>
                <p className="text-muted">The funds raised can be withdrawn directly to your bank account, even if the target amount hasn't been reached.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link to="/create-campaign" className="btn btn-primary btn-lg">
              Start Fundraising Now
            </Link>
          </div>
        </div>
      </section>

      <section className="why-choose-section py-5 bg-white">
        <div className="container">
          <h2 className="section-title text-center mb-5">Why FundHope?</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3 text-primary">
                  <i className="bi bi-trophy fs-1"></i>
                </div>
                <h3 className="h5">High Project Success Rate</h3>
                <p className="text-muted">Our platform has helped thousands of creators achieve their fundraising goals successfully.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3 text-primary">
                  <i className="bi bi-people fs-1"></i>
                </div>
                <h3 className="h5">Growing Community of Donors</h3>
                <p className="text-muted">Join our expanding network of generous supporters making dreams come true.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3 text-primary">
                  <i className="bi bi-tools fs-1"></i>
                </div>
                <h3 className="h5">User-Friendly Campaign Tools</h3>
                <p className="text-muted">Access intuitive tools to create, manage and promote your fundraising campaign effectively.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="feature-card text-center p-4">
                <div className="feature-icon mb-3 text-primary">
                  <i className="bi bi-credit-card fs-1"></i>
                </div>
                <h3 className="h5">Flexible Payment Options</h3>
                <p className="text-muted">Support projects through various secure payment methods for convenience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section bg-dark text-white py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <h5 className="mb-4">Causes</h5>
              <ul className="list-unstyled">
                <li><Link to="/medical" className="text-white-50 text-decoration-none">Medical crowdfunding</Link></li>
                <li><Link to="/cancer" className="text-white-50 text-decoration-none">Cancer Crowdfunding</Link></li>
                <li><Link to="/transplant" className="text-white-50 text-decoration-none">Transplant Crowdfunding</Link></li>
                <li><Link to="/education" className="text-white-50 text-decoration-none">Education Crowdfunding</Link></li>
                <li><Link to="/sports" className="text-white-50 text-decoration-none">Sports Crowdfunding</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5 className="mb-4">How it works?</h5>
              <ul className="list-unstyled">
                <li><Link to="/ngo-fundraising" className="text-white-50 text-decoration-none">Fundraising for NGOs</Link></li>
                <li><Link to="/sponsor" className="text-white-50 text-decoration-none">Sponsor A Child</Link></li>
                <li><Link to="/tips" className="text-white-50 text-decoration-none">Fundraising Tips</Link></li>
                <li><Link to="/what-is-crowdfunding" className="text-white-50 text-decoration-none">What is Crowdfunding?</Link></li>
                <li><Link to="/corporates" className="text-white-50 text-decoration-none">Corporates</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5 className="mb-4">About Us</h5>
              <ul className="list-unstyled">
                <li><Link to="/team" className="text-white-50 text-decoration-none">Team FundHope</Link></li>
                <li><Link to="/news" className="text-white-50 text-decoration-none">In The News</Link></li>
                <li><Link to="/stories" className="text-white-50 text-decoration-none">Success Stories</Link></li>
                <li><Link to="/careers" className="text-white-50 text-decoration-none">Careers</Link></li>
                <li><Link to="/blog" className="text-white-50 text-decoration-none">FundHope Blog</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5 className="mb-4">Support</h5>
              <ul className="list-unstyled">
                <li><Link to="/medical-finance" className="text-white-50 text-decoration-none">Medical Finance</Link></li>
                <li><Link to="/faq" className="text-white-50 text-decoration-none">FAQs & Help Center</Link></li>
                <li><Link to="/trust" className="text-white-50 text-decoration-none">Trust & Safety</Link></li>
                <li><Link to="/plans" className="text-white-50 text-decoration-none">Plans & Pricing</Link></li>
                <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="row mt-4 pt-4 border-top">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <div className="me-4">
                  <h6 className="mb-1">2.5M+</h6>
                  <small className="text-white-50">Followers</small>
                </div>
                <div className="social-links">
                  <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
                  <a href="#" className="text-white me-3"><i className="bi bi-linkedin"></i></a>
                  <a href="#" className="text-white me-3"><i className="bi bi-youtube"></i></a>
                  <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="text-white"><i className="bi bi-whatsapp"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-1">For any queries</p>
              <p className="mb-0">Email: info@fundhope.org</p>
              <p className="mb-0">Contact No: +91 9930088522</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
