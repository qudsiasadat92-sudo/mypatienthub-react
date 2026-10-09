import { useState } from "react";
import AppLayout from "../components/AppLayout.jsx";
import Accordion from "../components/Accordion.jsx";
import clinicsByCategory from "../data/clinics.js";

const SERVICES = [
  { emoji: "🏥", title: "Walk-in Consultation", text: "Visit any partner clinic without a prior appointment" },
  { emoji: "🦷", title: "Dental Care", text: "Routine checkups, cleaning and dental treatments" },
  { emoji: "💉", title: "Vaccination", text: "Flu shots, travel vaccines and child immunisation" },
  { emoji: "🧪", title: "Lab & Diagnostic Tests", text: "Blood tests, scans and health screening packages" },
];

export default function FindClinic() {
  const [term, setTerm] = useState("");
  const [zip, setZip] = useState("");

  const groups = clinicsByCategory.map((group) => ({
    title: group.category,
    rows: group.clinics.map((clinic) => ({
      flag: "🇦🇫",
      name: clinic.name,
      fee: clinic.fee,
      match: clinic.match,
      tags: [clinic.city],
    })),
  }));

  function handleSearch() {
    alert(`Demo search for "${term || "all clinics"}" in "${zip || "all areas"}".`);
  }

  function handleCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Your browser does not support geolocation.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => alert("Current location received (demo)."),
      () => alert("Location access was denied.")
    );
  }

  return (
    <AppLayout active="Find Clinic" crumb="Searchclinic" title="Searchclinic">
      <section className="doctor-hero">
        <div className="path">🏠 / Searchclinic</div>

        <div className="hero-search">
          <span>🔍</span>
          <input type="text" placeholder="Type here..." />
        </div>

        <h1>Find a Clinic</h1>
        <p className="sub">Search Clinics near you and schedule a visit</p>

        <div className="doctor-search-fields">
          <input
            type="text"
            placeholder="Search a clinic by name, category"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Zip Code or Neigborhood"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>

        <div className="doctor-search-actions">
          <button className="pill-btn" onClick={handleCurrentLocation}>
            CURRENT
          </button>
          <button className="pill-btn" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </section>

      <section className="specialty-block">
        <h2>Find Clinics By Category</h2>
        <p className="intro">Select a Category to View all Clinics and book a visit</p>
        <Accordion groups={groups} />
      </section>

      <section className="specialty-block">
        <h2>Special Services</h2>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div className="service-card" key={service.title}>
              <div className="emoji">{service.emoji}</div>
              <div>
                <h4>{service.title}</h4>
                <p>{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div>
          © 2026, made with ❤ by <strong>MyPiHUB</strong> for a better web.
        </div>
        <div className="links">
          <a href="#!">MyPatientHUB</a>
          <a href="#!">About Us</a>
          <a href="#!">Blog</a>
        </div>
      </footer>
    </AppLayout>
  );
}
