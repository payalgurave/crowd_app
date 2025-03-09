import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, ProgressBar, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'education',
    targetAmount: '',
    deadline: '',
    imageUrl: '',
    story: '',
    rewards: [{ level: '', description: '', minimumAmount: '' }]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRewardChange = (index, field, value) => {
    const updatedRewards = [...formData.rewards];
    updatedRewards[index][field] = value;
    setFormData(prev => ({
      ...prev,
      rewards: updatedRewards
    }));
  };

  const addReward = () => {
    setFormData(prev => ({
      ...prev,
      rewards: [...prev.rewards, { level: '', description: '', minimumAmount: '' }]
    }));
  };

  const removeReward = (index) => {
    setFormData(prev => ({
      ...prev,
      rewards: prev.rewards.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/campaigns', formData);
      navigate(`/campaign/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create campaign');
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderBasicInfo = () => (
    <Form.Group className="mb-4">
      <Form.Label>Campaign Title</Form.Label>
      <Form.Control
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <Form.Label className="mt-3">Category</Form.Label>
      <Form.Select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
      >
        <option value="education">Education</option>
        <option value="medical">Medical</option>
        <option value="environment">Environment</option>
        <option value="technology">Technology</option>
        <option value="community">Community</option>
      </Form.Select>
      <Form.Label className="mt-3">Target Amount ($)</Form.Label>
      <Form.Control
        type="number"
        name="targetAmount"
        value={formData.targetAmount}
        onChange={handleInputChange}
        required
      />
      <Form.Label className="mt-3">Deadline</Form.Label>
      <Form.Control
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
  );

  const renderDetails = () => (
    <Form.Group className="mb-4">
      <Form.Label>Campaign Image URL</Form.Label>
      <Form.Control
        type="url"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleInputChange}
        placeholder="https://example.com/image.jpg"
      />
      <Form.Label className="mt-3">Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <Form.Label className="mt-3">Story</Form.Label>
      <Form.Control
        as="textarea"
        rows={5}
        name="story"
        value={formData.story}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
  );

  const renderRewards = () => (
    <div className="mb-4">
      {formData.rewards.map((reward, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Form.Group>
              <Form.Label>Reward Level</Form.Label>
              <Form.Control
                type="text"
                value={reward.level}
                onChange={(e) => handleRewardChange(index, 'level', e.target.value)}
                placeholder="e.g., Bronze, Silver, Gold"
              />
              <Form.Label className="mt-2">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={reward.description}
                onChange={(e) => handleRewardChange(index, 'description', e.target.value)}
              />
              <Form.Label className="mt-2">Minimum Amount ($)</Form.Label>
              <Form.Control
                type="number"
                value={reward.minimumAmount}
                onChange={(e) => handleRewardChange(index, 'minimumAmount', e.target.value)}
              />
            </Form.Group>
            {index > 0 && (
              <Button
                variant="danger"
                size="sm"
                className="mt-3"
                onClick={() => removeReward(index)}
              >
                Remove Reward
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
      <Button variant="secondary" onClick={addReward}>
        Add Reward Level
      </Button>
    </div>
  );

  const renderPreview = () => (
    <div className="preview-section">
      <Card className="mb-4">
        <Card.Img
          variant="top"
          src={formData.imageUrl || 'https://via.placeholder.com/800x400'}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title className="h3">{formData.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted text-capitalize">
            Category: {formData.category}
          </Card.Subtitle>
          <ProgressBar now={0} label="0%" className="mb-3" />
          <div className="d-flex justify-content-between mb-3">
            <div>
              <strong>$0</strong> raised
            </div>
            <div>
              <strong>${formData.targetAmount}</strong> goal
            </div>
          </div>
          <Card.Text>{formData.description}</Card.Text>
          <hr />
          <h5>Story</h5>
          <Card.Text>{formData.story}</Card.Text>
          <hr />
          <h5>Reward Levels</h5>
          {formData.rewards.map((reward, index) => (
            <Card key={index} className="mb-2">
              <Card.Body>
                <Card.Title>{reward.level}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Pledge ${reward.minimumAmount} or more
                </Card.Subtitle>
                <Card.Text>{reward.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </div>
  );

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Create Your Campaign</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="step-indicators mb-4 d-flex justify-content-between">
            {['Basic Info', 'Details', 'Rewards', 'Preview'].map((stepName, index) => (
              <div
                key={index}
                className={`step-indicator ${step === index + 1 ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setStep(index + 1)}
              >
                {stepName}
              </div>
            ))}
          </div>

          <Form onSubmit={handleSubmit}>
            {step === 1 && renderBasicInfo()}
            {step === 2 && renderDetails()}
            {step === 3 && renderRewards()}
            {step === 4 && renderPreview()}

            <div className="d-flex justify-content-between mt-4">
              {step > 1 && (
                <Button variant="secondary" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < 4 ? (
                <Button variant="primary" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button
                  variant="success"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Launch Campaign'}
                </Button>
              )}
            </div>
          </Form>
        </Col>
      </Row>

      <style jsx>{`
        .step-indicator {
          padding: 8px 16px;
          border-radius: 20px;
          background-color: #f8f9fa;
          transition: all 0.3s ease;
        }
        .step-indicator.active {
          background-color: #007bff;
          color: white;
        }
        .preview-section {
          max-width: 800px;
          margin: 0 auto;
        }
      `}</style>
    </Container>
  );
};

export default CreateCampaign;