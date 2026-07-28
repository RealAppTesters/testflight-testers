"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
        <a href="#services" onClick={(e) => scrollToSection(e, "services")}>
          Services
        </a>
        <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")}>
          Pricing
        </a>
        <a href="#faq" onClick={(e) => scrollToSection(e, "faq")}>
          FAQ
        </a>
        <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
          Contact
        </a>
        <a href="#pricing" className="order-btn" onClick={(e) => scrollToSection(e, "pricing")}>
          Get Testers <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </nav>
  );
}
