"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["services", "pricing", "faq", "contact"];
      let current = "";
      
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = id;
          }
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">TestFlight<span className="accent">Testers</span></Link>
      </div>
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a 
          href="#services" 
          onClick={(e) => scrollToSection(e, "services")}
          className={activeSection === "services" ? "active" : ""}
        >
          Services
        </a>
        <a 
          href="#pricing" 
          onClick={(e) => scrollToSection(e, "pricing")}
          className={activeSection === "pricing" ? "active" : ""}
        >
          Pricing
        </a>
        <a 
          href="#faq" 
          onClick={(e) => scrollToSection(e, "faq")}
          className={activeSection === "faq" ? "active" : ""}
        >
          FAQ
        </a>
        <a 
          href="#contact" 
          onClick={(e) => scrollToSection(e, "contact")}
          className={activeSection === "contact" ? "active" : ""}
        >
          Contact
        </a>
        <a href="#pricing" className="order-btn" onClick={(e) => scrollToSection(e, "pricing")}>
          Get Testers <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </nav>
  );
}
