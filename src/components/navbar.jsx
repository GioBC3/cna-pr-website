import React, { useState, useEffect } from 'react';
import './Navbar.scss';

const Navbar = () => {
  const defaultNavbarData = {
    logo: "/assets/logo.png",
    links: [
      {
        text: "About",
        url: "#",
        dropdown: [
          {
            text: "Our CNA",
            url: "#",
            dropdown: [
              { text: "Journey", url: "/about/our-cna/journey" },
              { text: "Mission", url: "/about/our-cna/mission" },
              { text: "Vision", url: "/about/our-cna/vision" },
              { text: "Founders", url: "/about/our-cna/founders" },
            ]
          },
          { text: "Our Community", url: "/about/our-community" },
          { text: "Our Team", url: "/about/our-team" },
          { text: "Facilities", url: "/about/facilities" },
          { text: "Contact Us", url: "/about/contact-us" }
        ]
      },
      { text: "School", url: "/school" },
      { text: "Enroll Now", url: "/enroll" },
      { text: "CNA Events", url: "/events" },
      { text: "RenWeb", url: "/renweb" }
    ]
  };

  const [navbarData, setNavbarData] = useState(defaultNavbarData);

  useEffect(() => {
    fetch('/src/data/navbar.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No custom navbar data found');
        }
      })
      .then((data) => setNavbarData(data))
      .catch(() => {
        console.log('Using default navbar data');
      });
  }, []);

  // Función recursiva para renderizar los enlaces y subenlaces
  const renderLinks = (links) => {
    return links.map((link, index) => (
      <li key={index} className={link.dropdown ? "navbar__item--dropdown" : ""}>
        <a href={link.url}>{link.text}</a>
        {link.dropdown && (
          <ul className="navbar__dropdown">
            {renderLinks(link.dropdown)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="/" className="navbar__logo">
          <img src={navbarData.logo} alt="Logo" />
        </a>
        <ul className="navbar__menu">
          {renderLinks(navbarData.links)}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
