import { useParams } from "react-router-dom";
import { useCampaigns } from "../context/CampaignContext";

const CampaignDetail = () => {
  const { id } = useParams(); // Get campaign ID from URL
  const { campaigns } = useCampaigns(); // Get campaigns from context

  const campaign = campaigns.find((c) => c.id === id); // Find the selected campaign

  if (!campaign) return <h2 className="text-center text-red-500">Campaign Not Found</h2>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{campaign.title}</h1>
      <img src={campaign.image} alt={campaign.title} className="w-full h-80 object-cover mt-4" />
      <p className="text-gray-700 mt-4">{campaign.description}</p>
      <p className="mt-2"><strong>Created by:</strong> {campaign.creator}</p>
      <div className="mt-4 p-4 border rounded bg-gray-100">
        <p><strong>Goal:</strong> ${campaign.goal}</p>
        <p><strong>Raised:</strong> ${campaign.raised}</p>
      </div>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">Donate</button>
    </div>
  );
};

export default CampaignDetail;
