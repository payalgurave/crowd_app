import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Campaigns from "./Pages/Campaigns.jsx";
import CreateCampaign from "./Pages/CreateCampaign.jsx";
import CampaignDetails from "./Pages/CampaignDetail.jsx"; 
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

import { CampaignProvider } from "./context/CampaignContext.jsx";

function App() {
  return (
    <CampaignProvider> {/* ✅ Wrap entire app */}
  
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/campaign/:id" element={<CampaignDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
    
    </CampaignProvider>
  );
}

export default App;
