import { createContext, useContext, useState } from "react";

// Create context
const CampaignContext = createContext();

// Custom hook for consuming context
export const useCampaigns = () => useContext(CampaignContext);

// Context Provider
export const CampaignProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([

    {
      id: 1,
      title: "Help Build Schools",
      description: "Support building schools in underprivileged areas.",
      goal: 10000,
      raised: 5000,
      image: "school.jpeg",
    },
    // {
    //   id: 2,
    //   title: "Fund a Startup",
    //   description: "Kickstart a new AI-driven startup.",
    //   goal: 50000,
    //   raised: 12000,
    //   image: "startup.jpeg",
    // },
  ]);

  const addCampaign = (newCampaign) => {
    setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1, raised: 0 }]);
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};
