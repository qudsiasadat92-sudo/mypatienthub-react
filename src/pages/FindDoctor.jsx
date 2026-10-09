import { useState } from "react";
import AppLayout from "../components/AppLayout.jsx";
import Accordion from "../components/Accordion.jsx";
import doctorsBySpecialty from "../data/doctors.js";

const SERVICES = [
  { emoji: "🩺", title: "Primary Care and Internal MD", text: "our Doctors Partner with you to help you to reach your welness" },
  { emoji: "❤️", title: "Emergency Care", text: "we provide emergency care for adults and children" },
  { emoji: "💗", title: "Imaging Services", text: "From Xray to MR scan we offer..." },
  { emoji: "🩹", title: "Urgent Care", text: "we offer urgent care for none..." },
];

export default function FindDoctor() {
  const [term, setTerm] = useState("");
  const [zip, setZip] = useState("");

  const groups = doctorsBySpecialty.map((group) => ({
    title: group.specialty,
    rows: group.doctors.map((doc) => ({
      flag: "🇦🇫",
      name: doc.name,
      fee: doc.fee,
      match: doc.match,
      tags: [doc.specialty, doc.city],
    })),
  }));

  function handleSearch() {
    alert(`Demo search for "${term || "all doctors"}" in "${zip || "all areas"}".`);
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
    <AppLayout active="Find Doctor" crumb="Searchdoctor" title="Searchdoctor">
      <section className="doctor-hero">
        <div className="path">🏠 / Searchdoctor</div>

        <div className="hero-search">
          <span>🔍</span>
          <input type="text" placeholder="Type here..." />
        </div>

        <h1>Find a Doctor</h1>
        <p className="sub">Search Doctors and schedule an appointment</p>

        <div className="doctor-search-fields">
          <input
            type="text"
            placeholder="Search a doctor by name, specility"
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
        <h2>Find Doctors By Specialty</h2>
        <p className="intro">Select a Specialty to View all Doctors and schedule an Appointment</p>
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
