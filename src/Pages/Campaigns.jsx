import { Link } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";
import "./Campaigns.css";

const Campaigns = () => {
  const { campaigns } = useCampaigns() || { campaigns: [] };

  return (
    <div className="campaigns-container">
      <h1 className="campaigns-title">Explore Campaigns</h1>
      {campaigns.length === 0 ? (
        <p className="campaigns-empty">No campaigns available</p>
      ) : (
        <div className="campaigns-grid">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="campaign-card">
             <img src={`/${campaign.image}`} alt={campaign.title} />

              <div className="campaign-content">
                <h2 className="campaign-name">{campaign.title}</h2>
                <p className="campaign-description">
                  {campaign.description.substring(0, 100)}...
                </p>
                <div className="campaign-details">
                  <p><strong>Goal:</strong> ${campaign.goal}</p>
                  <p><strong>Raised:</strong> ${campaign.raised}</p>
                </div>
                <Link to={`/campaign/${campaign.id}`} className="campaign-button">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;
