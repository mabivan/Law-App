
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import {
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
  FaSearch,
  FaInstagram,
  FaBars,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

import logo from "../../assets/logo.png";
import keFlag from "../../assets/keFlag.png";
import usFlag from "../../assets/usFlag.png";
import ukFlag from "../../assets/ukFlag.png";
import ugFlag from "../../assets/ugFlag.png";
import tzFlag from "../../assets/tzFlag.png";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [date, setDate] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(formatted);
  }, []);

  const laws = [
    { key: "Criminal", text: "Criminal Law" },
    { key: "Contract", text: "Contract Law" },
    { key: "Land", text: "Land Law" },
    { key: "Family", text: "Family Law" },
    { key: "Tort", text: "Tort Law" },
    { key: "Cases", text: "Cases" },
    { key: "Constitutional", text: "Constitutional Law" },
    { key: "News", text: "Legal News" },
  ];

  const countries = [
    { code: "ug", name: "Uganda", flag: ugFlag },
    { code: "uk", name: "UK", flag: ukFlag },
    { code: "us", name: "US", flag: usFlag },
    { code: "ke", name: "Kenya", flag: keFlag },
    { code: "tz", name: "Tanzania", flag: tzFlag },
  ];

  const handleDropdownToggle = (key: string) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Don't close if clicking on a dropdown item or its children
      if (target.closest('.dropdown-item') || target.closest('.dropdown-menu')) {
        return;
      }

      // Close if clicking outside the current dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* === TOP NAVBAR === */}
      <div className="navbar-top">
        <div className="navbar-left">
          <button className="hamburger" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>

        <div className="navbar-center">
          <div className="navbar-date">{date}</div>
          <div className="searchBar">
            <input
              type="text"
              className="search-input"
              placeholder="Search Cases..."
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="navbar-right">
          <div className="socialMedia">
            <FaWhatsapp />
            <FaTwitter />
            <FaFacebook />
            <FaInstagram />
          </div>
        </div>
      </div>

      {/* === BOTTOM NAVBAR === */}
      <div className="navbar-bottom">
        <div className="nav-links">
          {laws.map((law) => (
            <div
              className="nav-link-dropdown"
              key={law.key}
              ref={openDropdown === law.key ? dropdownRef : null}
            >
              <div
                className={`nav-link ${openDropdown === law.key ? "active" : ""}`}
                onClick={() => handleDropdownToggle(law.key)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleDropdownToggle(law.key);
                  }
                }}
              >
                <span>{law.text}</span>
                {openDropdown === law.key ? (
                  <FaChevronUp className="dropdown-arrow" />
                ) : (
                  <FaChevronDown className="dropdown-arrow" />
                )}
              </div>

              {openDropdown === law.key && (
                <div className="dropdown-menu">
                  {countries.map((country) => (
                    <NavLink
                      to={`/LawCategories/${law.key}/${country.name}`}
                      className="dropdown-item"
                      key={country.code}
                      title={country.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTimeout(() => setOpenDropdown(null), 100);
                      }}
                    >
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        className="dropdown-flag"
                      />
                      <span className="dropdown-country">{country.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;