import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Footer.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import keFlag from "../../assets/keFlag.png";
import usFlag from "../../assets/usFlag.png";
import ukFlag from "../../assets/ukFlag.png";
import ugFlag from "../../assets/ugFlag.png";
import tzFlag from "../../assets/tzFlag.png";

const Footer: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement | null>(null);

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-top">
        <nav className="footer-nav">
          <ul className="footer-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            
            {laws.map((law) => (
              <li key={law.key} className="footer-dropdown" ref={openDropdown === law.key ? dropdownRef : null}>
                <div 
                  className="footer-dropdown-toggle"
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
                    <FaChevronUp className="footer-dropdown-arrow" />
                  ) : (
                    <FaChevronDown className="footer-dropdown-arrow" />
                  )}
                </div>
                
                {openDropdown === law.key && (
                  <div className="footer-dropdown-menu">
                    {countries.map((country) => (
                      <NavLink
                        to={`/LawCategories/${law.key}/${country.name}`}
                        className="footer-dropdown-item"
                        key={`${law.key}-${country.code}`}
                        onClick={() => setOpenDropdown(null)}
                      >
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="footer-dropdown-flag"
                        />
                        <span>{country.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="footer-bottom">
        <div className="copyright">
          © Trinity Advocates All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;