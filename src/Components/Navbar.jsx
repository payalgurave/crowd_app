import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for mobile menu
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo / Brand Name */}
        <Link to="/" className="logo">
          CrowdFunding
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <NavLink to="/" label="Home" />
          <NavLink to="/campaigns" label="Campaigns" />
          <NavLink to="/create-campaign" label="Start a Campaign" />
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu (Hidden on Desktop) */}
      {isOpen && (
        <div className="mobile-menu">
          <MobileNavLink to="/" label="Home" setIsOpen={setIsOpen} />
          <MobileNavLink to="/campaigns" label="Campaigns" setIsOpen={setIsOpen} />
          <MobileNavLink to="/create-campaign" label="Start a Campaign" setIsOpen={setIsOpen} />
        </div>
      )}
    </nav>
  );
};

// ✅ Reusable NavLink Component (for styling consistency)
const NavLink = ({ to, label }) => (
  <Link to={to} className="nav-link">
    {label}
  </Link>
);

// ✅ Mobile NavLink Component (Closes menu on click)
const MobileNavLink = ({ to, label, setIsOpen }) => (
  <Link to={to} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
    {label}
  </Link>
);

export default Navbar;
