"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        TestFlight<span className="accent">Testers</span>
      </div>
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#">Services</a>
        <a href="#">Pricing</a>
        <a href="#">FAQ</a>
        <a href="#">Contact</a>
        <a href="#" className="order-btn">
          Get Testers <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </nav>
  );
}
