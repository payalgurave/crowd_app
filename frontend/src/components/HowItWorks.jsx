import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/modern.css';

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      <div className="container py-5">
        <h1 className="text-center mb-5">How FundHope Works</h1>

        {/* Process Overview */}
        <div className="row mb-5">
          <div className="col-md-8 mx-auto text-center">
            <p className="lead">
              FundHope makes it easy to raise money for the causes you care about.
              Whether you're raising funds for medical expenses, education, or a creative project,
              we're here to help you succeed.
            </p>
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="display-4 text-primary mb-3">
                  <i className="bi bi-pencil-square"></i>
                </div>
                <h3 className="h4 mb-3">1. Create Your Campaign</h3>
                <p className="text-muted mb-4">
                  Set up your fundraising page in minutes. Add your story, photos,
                  and fundraising goal. Our platform makes it simple to share your
                  cause with the world.
                </p>
                <ul className="list-unstyled text-start">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Easy setup process</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Customizable campaign page</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Multiple category options</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="display-4 text-primary mb-3">
                  <i className="bi bi-share"></i>
                </div>
                <h3 className="h4 mb-3">2. Share Your Story</h3>
                <p className="text-muted mb-4">
                  Spread the word about your campaign through social media, email,
                  and messaging. Our built-in sharing tools make it easy to reach
                  potential donors.
                </p>
                <ul className="list-unstyled text-start">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Social media integration</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Email campaign tools</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Campaign updates feature</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body text-center p-4">
                <div className="display-4 text-primary mb-3">
                  <i className="bi bi-cash-stack"></i>
                </div>
                <h3 className="h4 mb-3">3. Collect & Withdraw</h3>
                <p className="text-muted mb-4">
                  Receive donations securely through our platform. Track your progress
                  and withdraw funds directly to your bank account, even before reaching
                  your goal.
                </p>
                <ul className="list-unstyled text-start">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Secure payment processing</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Real-time donation tracking</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Flexible withdrawals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Success Tips */}
        <div className="bg-light rounded-3 p-5 mb-5">
          <h2 className="text-center mb-4">Tips for Success</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="h1 text-primary mb-3">
                  <i className="bi bi-camera"></i>
                </div>
                <h4>Use Quality Media</h4>
                <p className="text-muted">Add compelling photos and videos to tell your story effectively</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="h1 text-primary mb-3">
                  <i className="bi bi-chat-dots"></i>
                </div>
                <h4>Engage Regularly</h4>
                <p className="text-muted">Keep donors updated with regular campaign updates</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="h1 text-primary mb-3">
                  <i className="bi bi-people"></i>
                </div>
                <h4>Build Community</h4>
                <p className="text-muted">Engage with supporters and thank them for their contributions</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="h1 text-primary mb-3">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h4>Set Clear Goals</h4>
                <p className="text-muted">Establish realistic fundraising goals and milestones</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-5">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                      How long does it take to create a campaign?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Creating a campaign takes just a few minutes. Our user-friendly interface guides you through each step,
                      from setting up your story to adding images and setting your fundraising goal.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                      What fees does FundHope charge?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      FundHope charges a small platform fee to cover operating costs and payment processing.
                      Our fees are transparent and competitive, ensuring more of your donations go directly to your cause.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                      When can I withdraw my funds?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can withdraw your funds at any time, even if you haven't reached your goal.
                      Withdrawals typically process within 2-5 business days, depending on your bank.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="mb-4">Ready to Start Your Campaign?</h2>
          <Link to="/create-campaign" className="btn btn-primary btn-lg">
            Start Fundraising Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;