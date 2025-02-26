import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Fund Your Dreams</h1>
      <p className="home-description">
        Start or support campaigns to make a difference.
      </p>
      <Link to="/create-campaign" className="home-button">
        Start a Campaign
      </Link>
    </div>
  );
};

export default Home;
