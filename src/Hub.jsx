import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const NAV = [
  ["Dashboard", "/dashboard", "dashboard"],
  ["Appointments", "/appointment", "calendar"],
  ["Find Doctor", "/searchdoctor", "doctor"],
  ["Find Clinic", "/findhospital", "clinic"],
  ["Chat", "/chat", "chat"],
  ["Find MarketPlace", "/marketplace", "market"],
  ["Find Pharmacy", "/pharmacyplace", "pharmacy"],
  ["My Dependents", "/mydependents", "dependents"],
  ["My Account", "/myaccount", "account"],
  ["Settings", "/accountsetting", "settings"],
];
const ICONS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18M7 14h4M7 17h4" />
    </>
  ),
  doctor: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2M12 15v6M9 18h6" />
    </>
  ),
  clinic: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 21v-6h6v6M9 8h6M12 5v6" />
    </>
  ),
  chat: (
    <>
      <path d="M4 4h16v13H9l-5 4V4Z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  market: (
    <>
      <path d="M3 10h18l-2-6H5l-2 6ZM5 10v11h14V10M9 21v-7h6v7" />
    </>
  ),
  pharmacy: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M12 7v10M7 12h10" />
    </>
  ),
  dependents: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M15 15a4 4 0 0 1 6 4v2" />
    </>
  ),
  account: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M8 15h4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  logout: (
    <>
      <path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 7l5 5-5 5M8 12h11" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
};
function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || ICONS.dashboard}
    </svg>
  );
}
import { DOCTORS } from "./data/doctors.js";
import { CLINICS } from "./data/clinics.js";
import { PHARMACIES } from "./data/pharmacies.js";
import { DonutChart, TrendChart, WellnessChart, AppointmentChart } from "./components/DashboardCharts.jsx";
const localToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const initialAppts = [
  {
    date: "2026-10-15",
    name: "Dr. Farzana Ahmadi",
    kind: "Consultation",
    status: "Upcoming",
  },
  {
    date: "2026-10-18",
    name: "Dr. Ahmad Wali",
    kind: "Examination",
    status: "Upcoming",
  },
  {
    date: "2026-09-25",
    name: "Dr. Maryam Sadat",
    kind: "Checkup",
    status: "Previous",
  },
];
const read = (k, f) => {
  try {
    const saved=JSON.parse(localStorage.getItem(k));if(saved==null)return f;if(Array.isArray(f))return Array.isArray(saved)&&saved.every(x=>x&&typeof x==='object'&&Object.keys(f[0]||{}).every(key=>typeof x[key]===typeof f[0][key]))?saved:f;if(f&&typeof f==='object'){if(!saved||typeof saved!=='object'||Array.isArray(saved))return f;return {...f,...saved}}return typeof saved===typeof f?saved:f;
  } catch {
    return f;
  }
};
function useStored(k, f) {
  const [v, set] = useState(() => read(k, f));
  useEffect(() => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      console.warn(
        "Local storage unavailable; changes remain in this session.",
      );
    }
  }, [k, v]);
  return [v, set];
}
export function hasDemoSession() {
  try {
    return (
      sessionStorage.getItem("hub-session") === "active" ||
      localStorage.getItem("hub-session") === "active"
    );
  } catch {
    return false;
  }
}
function startDemo(remember, email) {
  try {
    const profile = read('hub-profile', {});
    localStorage.setItem('hub-profile', JSON.stringify({...profile, email}));
    const billing = read('hub-billing', []);
    if (billing.length) localStorage.setItem('hub-billing', JSON.stringify(billing.map(x => ({...x, email}))));
    sessionStorage.setItem("hub-session", "active");
    if (remember) localStorage.setItem("hub-session", "active");else localStorage.removeItem('hub-session');
  } catch { throw new Error('Your browser could not save the session. Enable browser storage and try again.'); }
}
function endDemo() {
  try {
    sessionStorage.removeItem("hub-session");
    localStorage.removeItem("hub-session");
  } catch {}
}
function useDialog(open, close) {
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const dialog = document.querySelector('[role="dialog"]');
    const selectors = 'button:not(:disabled),a[href],input,select,textarea';
    dialog?.querySelector(selectors)?.focus();
    const key = e => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab' || !dialog) return;
      const controls = [...dialog.querySelectorAll(selectors)];
      const first = controls[0], last = controls[controls.length-1];
      if (e.shiftKey && document.activeElement === first) {e.preventDefault();last?.focus();}
      else if (!e.shiftKey && document.activeElement === last) {e.preventDefault();first?.focus();}
    };
    document.addEventListener('keydown',key);
    return () => { document.removeEventListener('keydown',key); previous?.focus(); };
  },[open]);
}
function Photo({ path, alt = "", size = 48 }) {
  const [bad, setBad] = useState(false);
  useEffect(() => setBad(false), [path]);
  return bad ? (
    <span className="photo-fallback" style={{ width: size, height: size }}>
      {alt.slice(0, 1) || "✚"}
    </span>
  ) : (
    <img
      className="photo"
      width={size}
      height={size}
      src={"/images/" + path}
      alt={alt}
      loading="lazy"
      onError={() => setBad(true)}
    />
  );
}
function Btn({ children, onClick, secondary = false, ...rest }) {
  return (
    <button
      type="button"
      className={secondary ? "btn muted" : "btn"}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
function Panel({ children, className = "", ...props }) {
  return (
    <section {...props} className={"panel " + className}>
      {children}
    </section>
  );
}
function Field({ label, children }) {
  return (
    <label className="field">
      {label && <span>{label}</span>}
      {children}
    </label>
  );
}
export function Shell({ name, hero = false, children }) {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth <= 850),
    [search, setSearch] = useState(""),
    [notice, setNotice] = useState("");
  const nav = useNavigate(),
    location = useLocation();
  const matches = NAV.filter(
    ([label]) =>
      search.trim() &&
      label.toLowerCase().includes(search.trim().toLowerCase()),
  );
  return (
    <div className={"shell " + (collapsed ? "collapsed" : "")}>
      <aside className="sidebar">
        <button
          className="sidebar-close"
          aria-label="Close navigation"
          onClick={() => setCollapsed(true)}
        >
          ×
        </button>
        <Link to="/dashboard" className="brand">
          <img
            className="brand-logo"
            src="/images/branding/reference-logo.png"
            alt="MyPatientHUB logo"
          />
          <b>MyPatientHUB</b>
        </Link>
        <nav aria-label="Main navigation">
          {NAV.map(([label, to, icon]) => (
            <Link
              key={to}
              title={label}
              aria-current={location.pathname === to ? "page" : undefined}
              className={
                "navlink " + (location.pathname === to ? "selected" : "")
              }
              to={to}
              onClick={() => setCollapsed(window.innerWidth <= 850)}
            >
              <span className="navicon">
                <Icon name={icon} />
              </span>
              <span className="nav-label">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="promo download-promo">
          <b>?</b><strong>Download</strong><small>MyPIHUB Mobile App</small>
          <div className="app-downloads"><button type="button" aria-label="Apple app download" onClick={()=>setNotice('The iOS app download is not available in this academic project.')}><img src="/images/branding/apple.svg" alt="Apple"/></button><button type="button" aria-label="Android app download" onClick={()=>setNotice('The Android app download is not available in this academic project.')}><img src="/images/branding/android.svg" alt="Android"/></button></div>
        </div>
      </aside>
      <div className="workspace">
        <header className={"topbar " + (hero ? "top-hero" : "")}>
          <div className="crumb">
            <div>
              <Link to="/dashboard" aria-label="Dashboard">
                ⌂
              </Link>{" "}
              / {name}
            </div>
            <b>{name}</b>
          </div>
          <button
            className="hamburger"
            aria-label="Toggle navigation"
            aria-expanded={!collapsed}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon name="menu" size={22} />
          </button>
          <div className="topright">
            <div className="navigation-search">
              <label className="header-search">
                <Icon name="search" />
                <input
                  aria-label="Search pages"
                  placeholder="Search pages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              {search.trim() && (
                <div className="search-suggestions">
                  {matches.length ? (
                    matches.map(([label, to]) => (
                      <Link key={to} to={to} onClick={() => setSearch("")}>
                        {label}
                      </Link>
                    ))
                  ) : (
                    <span>No matching pages</span>
                  )}
                </div>
              )}
            </div>
            <button
              className="logout-action"
              onClick={() => {
                endDemo();
                nav("/");
              }}
            >
              <Icon name="logout" size={15} />
              {hasDemoSession() ? "Log out" : "Sign in"}
            </button>
            <Link aria-label="Settings" to="/accountsetting">
              <Icon name="settings" />
            </Link>
            <button
              aria-label="Notifications"
              onClick={() =>
                setNotice(notice ? "" : "You are all caught up. No new notifications.")
              }
            >
              <Icon name="bell" />
            </button>
          </div>
        </header>
        {notice && (
          <p className="inline-notice" role="status">
            {notice}
          </p>
        )}
        <main className="main">{children}</main>
        <footer>
          © 2026 MyPatientHUB Afghanistan{" "}
          <span>Your health, closer to home</span>
        </footer>
      </div>
    </div>
  );
}
export function Login() {
 const [email,setEmail]=useState(''),[pass,setPass]=useState(''),[remember,setRemember]=useState(false),[showPassword,setShowPassword]=useState(false),[error,setError]=useState('');
 const nav=useNavigate(),location=useLocation();const destination=location.state?.from||'/dashboard';
 return <div className="login-page"><div className="login-hero"><img className="login-brand" src="/images/branding/reference-logo.png" alt="MyPatientHUB"/><h1>Welcome to<br/>MyPatientHUB</h1><p>Your health, your doctors, your clinics.</p></div><form className="login-card" noValidate onSubmit={e=>{e.preventDefault();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())||!pass.trim()){setError('Enter a valid email address and a password.');return}try{startDemo(remember,email.trim())}catch(err){setError(err.message);return}nav(destination,{replace:true,state:location.state?.booking||null})}}><span className="login-eyebrow">PATIENT PORTAL</span><h3>Welcome back</h3><p className="login-intro">Sign in to manage your healthcare.</p><Field label="Email address"><input type="email" placeholder="Enter your email" autoComplete="username" value={email} onChange={e=>{setEmail(e.target.value);setError('')}} required/></Field><Field label="Password"><div className="password-field"><input type={showPassword?'text':'password'} placeholder="Enter your password" autoComplete="off" value={pass} onChange={e=>{setPass(e.target.value);setError('')}} required/><button type="button" aria-label={showPassword?'Hide password':'Show password'} onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide':'Show'}</button></div></Field><label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/>Remember me</label>{error&&<p className="error" role="alert">{error}</p>}<Btn type="submit">SIGN IN</Btn></form><div className="login-footer">© 2026 MyPatientHUB · Afghanistan</div></div>
}
export function Dashboard() {
  const [appts] = useStored("hub-appts", initialAppts);
  const shares=[
    {title:'Promotion by Clinics',labels:CLINICS.slice(0,5).map(x=>x.name),values:[28,18,15,23,16],to:'/findhospital'},
    {title:'Promotion by Pharmacies',labels:PHARMACIES.slice(0,5),values:[18,26,20,17,19],to:'/pharmacyplace'},
    {title:'Marketplace Overview',labels:['Kabul Healthy Food','Herat Fresh Market','Parwan Organic Market','Mazar Healthy Kitchen'],values:[25,3,12,60],to:'/marketplace'},
  ];
  return <>
    <section className="wellness-banner"><div><span className="eyebrow">YOUR HEALTH, EVERY DAY</span><h2>Welcome to MyPatientHUB</h2><p>Find care near you and keep your healthcare organized.</p><Link className="btn" to="/searchdoctor">FIND A DOCTOR</Link></div><img src="/images/editorial/healthy-living.jpg" alt="Healthy foods and a stethoscope"/></section>
    <p className="chart-data-note">Health and promotion charts use sample data. Appointment totals reflect saved bookings.</p>
    <div className="dashboard-summary">{shares.map(x=><Panel key={x.title}><h3>{x.title}</h3><DonutChart values={x.values} labels={x.labels}/><div className="share-legend">{x.labels.map((label,i)=><div key={label}><span className="legend-dot" style={{background:['#d91ba9','#5367e8','#16bda3','#ffb647','#8e64cd'][i]}}/><span>{label}</span><b>{x.values[i]}%</b></div>)}</div><Link className="btn muted" to={x.to}>MORE DETAILS</Link></Panel>)}</div>
    <div className="two-col dashboard-grid">
      <Panel><h3>Health Index</h3><TrendChart kind="health" color="#5367e8"/></Panel>
      <Panel><h3>Symptom Trend</h3><TrendChart kind="symptom" color="#d91ba9"/></Panel>
      <Panel><h3>Wellness Overview</h3><WellnessChart/></Panel>
      <Panel><h3>Appointments</h3><AppointmentChart appointments={appts}/></Panel>
      <Panel className="dashboard-map"><h3>Afghanistan Locations</h3><AfghanMap/></Panel>
      <div className="stack"><Panel><h3>Previous Appointments</h3><AppointmentList items={appts.filter(x=>x.date<localToday())}/></Panel><Panel><h3>Upcoming Appointments</h3><AppointmentList items={appts.filter(x=>x.date>=localToday())}/></Panel></div>
    </div>
    <Panel><h3>Doctors</h3><div className="table-scroll"><table className="data-table"><thead><tr><th>DOCTOR</th><th>SPECIALTY</th><th>FEE</th><th>CITY</th></tr></thead><tbody>{DOCTORS.slice(0,4).map(d=><tr key={d.name}><td><Photo path={'doctors/'+d.img} alt={d.name} size={35}/>{d.name}</td><td>{d.specialty}</td><td>AFN {d.fee}</td><td>{d.city}</td></tr>)}</tbody></table></div></Panel>
  </>;
}
function AppointmentList({ items, onCancel }) {
  return (
    <div className="appointment-list">
      {items.length ? (
        items.map((a, i) => {
          const d = DOCTORS.find((d) => d.name === a.name);
          return (
            <div key={a.id || a.date + a.name + i}>
              <Photo
                path={d ? "doctors/" + d.img : "clinics/" + (CLINICS.find(c=>c.name===a.name)?.img || "kabul-family.jpg")}
                alt={"Sample image for " + a.name}
                size={50}
              />
              <div>
                <b>{a.name}</b>
                <small>{a.kind}</small>
              </div>
              <small>{a.date}</small>{onCancel&&<button type="button" className="cancel-booking" aria-label={'Cancel booking with '+a.name} onClick={()=>onCancel(a)}>Cancel</button>}
            </div>
          );
        })
      ) : (
        <p>No appointments yet.</p>
      )}
    </div>
  );
}
function AfghanMap({ cityNames }) {
  const cities = [
    ["Kabul", 34.5553, 69.2075],
    ["Charikar", 35.0136, 69.1714],
    ["Herat", 34.3529, 62.204],
    ["Mazar-e-Sharif", 36.7069, 67.1122],
    ["Kandahar", 31.6289, 65.7372],
    ["Jalalabad", 34.426, 70.451],
  ].filter((c) => !cityNames || cityNames.includes(c[0]));
  const [selected, setSelected] = useState(
    cities[0] || ["Kabul", 34.5553, 69.2075],
  );
  useEffect(() => {
    if (cities.length) setSelected(cities[0]);
    setFailed(false);
  }, [JSON.stringify(cityNames)]);
  const [zoom, setZoom] = useState("country");
  const [failed, setFailed] = useState(false);
  const [city, lat, lon] = selected;
  const bbox =
    zoom === "country"
      ? "60.5,29.0,74.5,38.8"
      : `${lon - 1.3},${lat - 0.9},${lon + 1.3},${lat + 0.9}`;
  const url = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lon}`;
  return (
    <div className="afghan-map">
      <div className="afghan-map-toolbar">
        <strong>Afghanistan map</strong>
        <span>OpenStreetMap · Internet required</span>
      </div>
      <div className="afghan-map-frame">
        <iframe
          key={url}
          title={"OpenStreetMap — " + city}
          src={url}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
        {failed && (
          <div className="afghan-map-error">
            The online map could not load. Check your internet connection.
          </div>
        )}
      </div>
      <div className="afghan-map-actions">
        <div className="afghan-map-cities">
          {cities.map((c) => (
            <button
              key={c[0]}
              className={city === c[0] ? "active" : ""}
              onClick={() => {
                setSelected(c);
                setZoom("city");
                setFailed(false);
              }}
            >
              {c[0]}
            </button>
          ))}
          <button onClick={() => setZoom("country")}>All Afghanistan</button>
        </div>
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=11/${lat}/${lon}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open larger map ↗
        </a>
      </div>
      <p className="afghan-map-caption">
        Illustrative city markers; not verified clinic or doctor locations. Map
        © OpenStreetMap contributors.
      </p>
    </div>
  );
}
export function Appointments() {
  const location = useLocation(),
    nav = useNavigate(),
    [appts, setAppts] = useStored("hub-appts", initialAppts),
    [tab, setTab] = useState("Appointments"),
    [month, setMonth] = useState(
      () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    );
  const picked = location.state?.provider;
  const [showForm, setShowForm] = useState(!!picked),
    [kind, setKind] = useState(location.state?.kind || "doctor"),
    [provider, setProvider] = useState(picked || DOCTORS[0].name),
    [date, setDate] = useState(""),
    [error, setError] = useState("");
  const today = new Date();
  useDialog(showForm, () => setShowForm(false));
  const localDate = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const minDate = localDate(today);
  useEffect(() => {
    if (location.state?.provider) {
      setProvider(location.state.provider);
      setKind(location.state.kind || "doctor");
      setShowForm(true);
      nav(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, nav]);
  const open = (k) => {
    setKind(k);
    setProvider(k === "doctor" ? DOCTORS[0].name : CLINICS[0].name);
    setDate("");
    setError("");
    setShowForm(true);
  };
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate(),
    offset = month.getDay(),
    cells = Array.from(
      { length: Math.ceil((offset + days) / 7) * 7 },
      (_, i) => i - offset + 1,
    );
  const previous = appts.filter((a) => a.date < minDate),
    upcoming = appts.filter((a) => a.date >= minDate);
  return (
    <>
      <div className="tabs centered">
        <button
          className={tab === "Appointments" ? "active" : ""}
          onClick={() => setTab("Appointments")}
        >
          Appointments
        </button>
        <button
          className={tab === "New Booking" ? "active" : ""}
          onClick={() => setTab("New Booking")}
        >
          New Booking
        </button>
      </div>
      {tab === "New Booking" ? (
        <div className="booking-choices">
          <Btn onClick={() => open("doctor")}>BOOK A DOCTOR</Btn>
          <Btn onClick={() => open("clinic")}>BOOK A CLINIC VISIT</Btn>
          <Btn onClick={() => open("hospital")}>BOOK A HOSPITAL ROOM</Btn>
        </div>
      ) : (
        <>
          <div className="metrics">
            <Panel>
              <h4>Upcoming bookings</h4>
              <h2>{upcoming.length}</h2>
            </Panel>
            <Panel>
              <h4>Previous bookings</h4>
              <h2>{previous.length}</h2>
            </Panel>
            <Panel className="new-appt">
              <Btn onClick={() => open("doctor")}>＋ NEW BOOKING</Btn>
            </Panel>
          </div>
          <div className="calendar-layout">
            <Panel>
              <div className="calendar-head">
                <h3>
                  {month.toLocaleString("en", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <div>
                  <button
                    onClick={() =>
                      setMonth(
                        new Date(today.getFullYear(), today.getMonth(), 1),
                      )
                    }
                  >
                    Today
                  </button>
                  <button
                    aria-label="Previous month"
                    onClick={() =>
                      setMonth(
                        new Date(month.getFullYear(), month.getMonth() - 1, 1),
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Next month"
                    onClick={() =>
                      setMonth(
                        new Date(month.getFullYear(), month.getMonth() + 1, 1),
                      )
                    }
                  >
                    ›
                  </button>
                </div>
              </div>
              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((x) => (
                  <b key={x}>{x}</b>
                ))}
                {cells.map((n, i) => (
                  <div
                    className={"day " + (n < 1 || n > days ? "outside" : "")}
                    key={i}
                  >
                    {n > 0 && n <= days ? n : ""}
                    {n > 0 &&
                      n <= days &&
                      appts
                        .filter(
                          (a) =>
                            a.date ===
                            localDate(
                              new Date(
                                month.getFullYear(),
                                month.getMonth(),
                                n,
                              ),
                            ),
                        )
                        .map((a, j) => (
                          <small key={j} title={a.name}>
                            {a.name}
                          </small>
                        ))}
                  </div>
                ))}
              </div>
            </Panel>
            <div className="stack">
              <Panel>
                <h3>Previous Appointments</h3>
                <AppointmentList items={previous} />
              </Panel>
              <Panel>
                <h3>Upcoming Appointments</h3>
                <AppointmentList items={upcoming} onCancel={a=>{if(window.confirm('Cancel this appointment?'))setAppts(prev=>prev.filter(x=>x!==a))}}/>
              </Panel>
            </div>
          </div>
        </>
      )}
      {showForm && (
        <div className="modal-backdrop">
          <form
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label="New booking"
            onSubmit={(e) => {
              e.preventDefault();
              const options = kind === "doctor" ? DOCTORS : CLINICS;
              if (
                !options.some((d) => d.name === provider) ||
                !date ||
                date < minDate
              ) {
                setError("Select a provider and a date from today onward.");
                return;
              }
              if (appts.some((a) => a.date === date && a.name === provider)) {
                setError("This provider is already booked on this date.");
                return;
              }
              setAppts([
                ...appts,
                {
                  date,
                  name: provider,
                  kind:
                    kind === "doctor"
                      ? "Consultation"
                      : kind === "hospital"
                        ? "Hospital room"
                        : "Clinic visit",
                  status: "Upcoming",
                },
              ]);
              setMonth(
                new Date(
                  Number(date.slice(0, 4)),
                  Number(date.slice(5, 7)) - 1,
                  1,
                ),
              );
              setShowForm(false);
              setTab("Appointments");
            }}
          >
            <h3>
              {kind === "doctor"
                ? "Book a Doctor"
                : kind === "hospital"
                  ? "Book a Hospital Room"
                  : "Book a Clinic Visit"}
            </h3>
            <Field label="Provider">
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              >
                {(kind === "doctor" ? DOCTORS : CLINICS).map((d) => (
                  <option key={d.name}>{d.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Date">
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Field>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className="actions">
              <Btn secondary onClick={() => setShowForm(false)}>
                CANCEL
              </Btn>
              <Btn type="submit">SAVE BOOKING</Btn>
            </div>
            <small>Your booking will appear in Appointments.</small>
          </form>
        </div>
      )}
    </>
  );
}
export function Directory({ type }) {
  const doctor = type === "doctor",
    data = doctor ? DOCTORS : CLINICS,
    location = useLocation();
  const [q, setQ] = useState(""),
    [city, setCity] = useState(""),
    [filter, setFilter] = useState(""),
    [view, setView] = useState("List"),
    [expanded, setExpanded] = useState(-1),
    [notice, setNotice] = useState(""),
    [locating, setLocating] = useState(false);
  const normalized = (x) => x.toLowerCase().trim();
  const filtered = data.filter(
    (d) =>
      normalized([d.name, d.specialty, d.city, d.address].join(" ")).includes(
        normalized(q),
      ) &&
      normalized(d.city + " " + d.address).includes(normalized(city)) &&
      (!filter || d.specialty === filter),
  );
  const services = [
    [
      "Primary Care and Internal MD",
      "Consultations and routine care for adults and families.",
      "primary-care.jpg",
    ],
    [
      "Emergency Care",
      "Emergency care for adults and children.",
      "emergency-care.jpg",
    ],
    [
      "Imaging Services",
      "Diagnostic imaging, from X-rays to medical scans.",
      "imaging.jpg",
    ],
    [
      "Urgent Care",
      "Care for urgent, non-life-threatening health concerns.",
      "urgent-care.jpg",
    ],
  ];
  const scrollResults = () =>
    document
      .getElementById("directory-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  const current = () => {
    if (!navigator.geolocation) {
      setNotice("Location is unavailable. Enter your city manually.");
      return;
    }
    setLocating(true);
    setNotice("Requesting your location…");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const cities = [
          ["Kabul", 34.5553, 69.2075],
          ["Charikar", 35.0136, 69.1714],
          ["Herat", 34.3529, 62.204],
          ["Mazar-e-Sharif", 36.7069, 67.1122],
          ["Jalalabad", 34.426, 70.451],
          ["Kandahar", 31.629, 65.737],
        ];
        const nearest = cities
          .map((c) => ({
            city: c[0],
            distance: Math.hypot(
              (c[1] - coords.latitude) * 111,
              (c[2] - coords.longitude) *
                111 *
                Math.cos((coords.latitude * Math.PI) / 180),
            ),
          }))
          .sort((a, b) => a.distance - b.distance)[0];
        if (nearest.distance > 150) {
          setNotice(
            "No listed city is near your location. Enter a city manually.",
          );
        } else {
          setCity(nearest.city);
          setNotice(
            "Nearest city: " +
              nearest.city +
              ". Exact coordinates are not saved.",
          );
        }
        setLocating(false);
      },
      () => {
        setNotice("Location could not be accessed. Enter your city manually.");
        setLocating(false);
      },
      { timeout: 10000, maximumAge: 300000 },
    );
  };
  const book = (d) => (
    <Link
      className="btn"
      to="/appointment"
      state={{ provider: d.name, kind: doctor ? "doctor" : "clinic" }}
    >
      BOOK
    </Link>
  );
  return (
    <>
      <section className="search-hero">
        <h1>{doctor ? "Find a Doctor" : "Find a Clinic"}</h1>
        <p>
          {doctor
            ? "Search Doctors and schedule an appointment"
            : "Find clinics and book a visit"}
        </p>
        <form
          className="hero-search"
          onSubmit={(e) => {
            e.preventDefault();
            setView("List");
            scrollResults();
          }}
        >
          <input
            aria-label={
              doctor ? "Doctor name or specialty" : "Clinic name or specialty"
            }
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={
              doctor
                ? "Search a doctor by name, specialty"
                : "Search clinic name or specialty"
            }
          />
          <input
            aria-label="City or neighborhood"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City or Neighborhood"
          />
          <button type="button" disabled={locating} onClick={current}>
            {locating ? "LOCATING…" : "CURRENT"}
          </button>
          <button type="submit">SEARCH</button>
        </form>
      </section>
      {notice && (
        <p role="status" className="inline-notice">
          {notice}
        </p>
      )}
      {doctor && (
        <>
          <Panel>
            <h2 className="center-title">Special Services</h2>
            <div className="services">
              {services.map(([title, text, img], i) => (
                <button
                  key={title}
                  className="service-card"
                  aria-expanded={expanded === i}
                  onClick={() => setExpanded(expanded === i ? -1 : i)}
                >
                  <span className="service-symbol"><Icon name={['doctor','clinic','search','pharmacy'][i]} size={30}/></span>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                    {expanded === i && (
                      <small>
                        Browse our directory below to find a provider.
                      </small>
                    )}
                  </span>
                  <span aria-hidden="true">{expanded === i ? "⌃" : "⌄"}</span>
                </button>
              ))}
            </div>
          </Panel>
          <Panel>
            <h2 className="center-title">Find Doctors By Specialty</h2>
            <p className="center-title">
              Select a specialty to view doctors and book an appointment.
            </p>
            <div className="specialties">
              {[
                "Anesthesiology",
                "Dermatology",
                "Emergency medicine",
                "Neurology",
                "Consultation",
                "Ophthalmology",
                "Cardiology",
              ].map((s) => (
                <button
                  key={s}
                  className={filter === s ? "active" : ""}
                  aria-pressed={filter === s}
                  onClick={() => {
                    setFilter(filter === s ? "" : s);
                    scrollResults();
                  }}
                >
                  {s}
                  <span className="specialty-count">{DOCTORS.filter(d=>d.specialty===s).length}</span>
                </button>
              ))}
            </div>
          </Panel>
        </>
      )}
      <Panel id="directory-results"><p className="photo-credit-note">Illustrative photographs · Fictional provider profiles</p>
        <div className="results-heading">
          <h3>
            {doctor ? "Doctors" : "Clinics"} in Afghanistan ({filtered.length})
          </h3>
          <button
            className="text-button"
            onClick={() => {
              setQ("");
              setCity("");
              setFilter("");
              setNotice("");
            }}
          >
            CLEAR FILTERS
          </button>
        </div>
        {(q || city || filter) && <p className="filter-summary" role="status">Filters: {[q, city, filter].filter(Boolean).join(' · ')}</p>}
        {!doctor && (
          <>
            <div className="tabs">
              <button
                className={view === "List" ? "active" : ""}
                onClick={() => setView("List")}
              >
                List
              </button>
              <button
                className={view === "Map" ? "active" : ""}
                onClick={() => setView("Map")}
              >
                Map
              </button>
            </div>
            <Field label="Specialty">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All specialties</option>
                {[...new Set(CLINICS.map((d) => d.specialty))].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
          </>
        )}
        {filtered.length === 0 ? (
          <p className="empty-state" role="status">
            No results found. Try a different name, city or specialty.
          </p>
        ) : (!doctor && view === "Map") ? (
          <AfghanMap cityNames={filtered.map(d => d.city)} />
        ) : (
          <div className={doctor ? "directory-list provider-grid" : "directory-list"}>
            {filtered.map((d) => (
              <div className="doctor-row" key={d.name}>
                <Photo
                  path={(doctor ? "doctors/" : "clinics/") + d.img}
                  alt={"Sample image for " + d.name}
                  size={64}
                />
                <div>
                  <b>{d.name}</b>
                  <p>
                    {d.specialty} · {d.address}
                  </p>
                </div>
                {doctor && <span>AFN {d.fee}</span>}
                {book(d)}
              </div>
            ))}
          </div>
        )}

      </Panel>
    </>
  );
}
export function Chat() {
  const contacts = [
    "Dr. Ahmad Wali",
    "Dr. Farzana Ahmadi",
    "Dr. Maryam Sadat",
    "Dr. Hamid Rahmani",
  ];
  const [selected, setSelected] = useState(contacts[0]),
    [query, setQuery] = useState(""),
    [messages, setMessages] = useStored("hub-chat", {
      "Dr. Ahmad Wali": [
        { from: "them", text: "Hi, I hope you feel better", time: "2:30" },
      ],
    }),
    [draft, setDraft] = useState("");
  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages({
      ...messages,
      [selected]: [
        ...(messages[selected] || []),
        {
          from: "me",
          text: draft.trim(),
          time: new Date().toLocaleTimeString("en", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    });
    setDraft("");
  };
  return (
    <>
      <Panel className="chat-panel">
        <aside className="contacts">
          <div className="contact-header">
            <Photo path="profiles/patient-avatar.svg" alt="P" size={46} />
            <div>
              <b>Patient</b>
              <small>Available</small>
            </div>
            <small>Contacts</small>
          </div>
          <input
            placeholder="Search Contacts"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {contacts
            .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
            .map((c, i) => (
              <button
                className={"contact " + (selected === c ? "chosen" : "")}
                key={c}
                onClick={() => setSelected(c)}
              >
                <Photo
                  path={"doctors/" + DOCTORS.find((d) => d.name === c).img}
                  alt={c}
                  size={40}
                />
                <div>
                  <b>{c}</b>
                  <small>short message here...</small>
                </div>
                <small>2:30</small>
              </button>
            ))}
        </aside>
        <section className="conversation">
          <div className="conversation-header">
            <Photo
              path={
                "doctors/" +
                (DOCTORS.find((x) => x.name === selected)?.img || "ahmad.jpg")
              }
              alt={selected}
              size={48}
            />
            <div>
              <b>{selected}</b>
              <small>Available</small>
            </div>
            <small>Local conversation</small>
          </div>
          <div className="messages">
            {(messages[selected] || []).map((m, i) => (
              <div
                key={i}
                className={"message " + (m.from === "me" ? "mine" : "")}
              >
                <b>{m.from === "me" ? "You" : selected}</b>
                <p>{m.text}</p>
                {m.image && (
                  <img
                    className="chat-attachment"
                    src={m.image}
                    alt="Image attachment"
                  />
                )}
                <small>{m.time}</small>
              </div>
            ))}
          </div>
          <form className="compose" onSubmit={send}>
            <span>☻</span>
            <input
              aria-label="Message" placeholder="Enter Message"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" aria-label="Send message">➤</button>
            <label className="attach" title="Attach image">
              ▧
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 500000) {
                      alert("Choose an image smaller than 500 KB.");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = () => {
                      setMessages((prev) => ({
                        ...prev,
                        [selected]: [
                          ...(prev[selected] || []),
                          {
                            from: "me",
                            text: file.name,
                            image: reader.result,
                            time: new Date().toLocaleTimeString("en", {
                              hour: "2-digit",
                              minute: "2-digit",
                            }),
                          },
                        ],
                      }));
                    };
                    reader.readAsDataURL(file);
                    e.target.value = "";
                  }
                }}
                hidden
              />
            </label>
          </form>
        </section>
      </Panel>
    </>
  );
}
const GOODS = [
  {
    name: "Fresh Vegetable Salad",
    seller: "Kabul Healthy Food",
    price: 250,
    category: "Food",
    img: "healthy-meal.jpg",
    description: "A fresh salad bowl with leafy greens, chickpeas, avocado and vegetables.",
    city: "Kabul",
  },
  {
    name: "Seasonal Fruit Selection",
    seller: "Herat Fresh Market",
    price: 180,
    category: "Food",
    img: "fresh-fruits.jpg",
    description: "A colorful selection of pineapple, citrus, grapes and other fresh fruit.",
    city: "Herat",
  },
  {
    name: "Mixed Salad Bowl",
    seller: "Mazar Healthy Kitchen",
    price: 350,
    category: "Food",
    img: "diet-package.jpg",
    description: "A mixed vegetable salad with leafy greens and colorful fresh ingredients.",
    city: "Mazar-e-Sharif",
  },
  {
    name: "Fresh Vegetable Selection",
    seller: "Parwan Organic Market",
    price: 220,
    category: "Food",
    img: "organic-food.jpg",
    description: "A selection of fresh seasonal vegetables from the produce market.",
    city: "Charikar",
  },
];
const MEDS = PHARMACIES.map((seller, i) => ({
  name: [
    "Esomeprazole",
    "Paracetamol",
    "Vitamin C",
    "ORS Sachet",
    "Omeprazole",
    "Ibuprofen",
  ][i],
  seller,
  price: [100, 40, 80, 25, 90, 70][i],
  category: i === 3 ? "Sachet" : [0,4].includes(i) ? "Capsule" : "Tablet",
  img: [
    "esomeprazole-photo.jpg",
    "paracetamol-photo.jpg",
    "vitamin-c-photo.jpg",
    "ors-photo.jpg",
    "omeprazole-photo.jpg",
    "ibuprofen-photo.jpg",
  ][i],
  city: [
    "Kabul",
    "Charikar",
    "Herat",
    "Mazar-e-Sharif",
    "Jalalabad",
    "Kandahar",
  ][i],
}));
export function Marketplace({ type }) {
  const pharma = type === "pharmacy",
    items = pharma ? MEDS : GOODS,
    [search, setSearch] = useState(""),
    [limit, setLimit] = useState(7),
    [sort, setSort] = useState("name"),
    [selected, setSelected] = useState(null),
    [page, setPage] = useState(1);
  useEffect(() => setPage(1), [search, limit, sort]);
  useDialog(!!selected, () => setSelected(null));
  const rows = items
    .map((x, i) => ({ ...x, id: 1001 + i, discount: i * 2 }))
    .filter((x) =>
      [x.name, x.seller, x.category, x.city]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "price" ? a.price - b.price : a.name.localeCompare(b.name),
    );
  return (
    <>
      <Panel>
        <h3>
          {pharma
            ? "Search Pharmacies for Medicines"
            : "Search Marketplaces and order what you need"}
        </h3>
        <div className={"product-grid " + (pharma ? "medicine-products" : "food-products")}>
          {rows.slice(0, 4).map((x, i) => (
            <article className="product" key={x.name}>
              <div className="product-photo">
                <Photo
                  path={(pharma ? "medicines/" : "marketplace/") + x.img}
                  alt={x.name}
                  size={180}
                />
              </div>
              <div className="product-line">
                <span>{x.name}</span>
                <b>{x.price} AFN</b>
              </div>
              <h3>
                <Photo
                  path={
                    (pharma ? "pharmacies/" : "marketplace/") +
                    (pharma
                      ? [
                          "shifa-photo.jpg",
                          "sehat-photo.jpg",
                          "sina-photo.jpg",
                          "aryana-photo.jpg",
                          "omid-photo.jpg",
                          "rahat-photo.jpg",
                        ][PHARMACIES.indexOf(x.seller)]
                      : "seller-logo.svg")
                  }
                  alt={x.seller}
                  size={34}
                />
                {x.seller}
              </h3>
              <p>
                {pharma
                  ? "Quality healthcare products and medicines in " +
                    x.city +
                    "."
                  : x.description}
              </p>
              <Btn onClick={() => setSelected(x)}>VIEW PRODUCT</Btn>
            </article>
          ))}
        </div>
      </Panel>
      <Panel>
        <h3>
          {pharma
            ? `${rows.length} Medicines returned for your search`
            : "Other results for healthy diet search"}
        </h3>
        <div className="table-tools">
          <label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option>5</option>
              <option>7</option>
              <option>10</option>
            </select>{" "}
            entries per page
          </label>
          <input
            aria-label="Search products" placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th><button className="sort-heading" onClick={() => setSort("name")}>NAME ⇅</button></th>
                <th>CATEGORY</th>
                <th>SERVICE BY</th>
                <th>DISCOUNT</th>
                <th><button className="sort-heading" onClick={() => setSort("price")}>PRICE ⇅</button></th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice((page-1)*limit, page*limit).map((x, i) => (
                <tr key={x.name}>
                  <td>
                    <Photo
                      path={(pharma ? "medicines/" : "marketplace/") + x.img}
                      alt={x.name}
                      size={52}
                    />
                    <b>{x.name}</b>
                  </td>
                  <td>{x.category}</td>
                  <td><div className="seller-cell">{pharma&&<Photo path={'pharmacies/'+['shifa','sehat','sina','aryana','omid','rahat'][PHARMACIES.indexOf(x.seller)]+'-photo.jpg'} alt="Illustrative pharmacy interior" size={40}/>}<b>{x.seller}</b></div></td>
                  <td>{x.discount}%</td>
                  <td>{x.price} AFN</td>
                  <td>{x.id}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6}>No products found. Try another search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="muted-text">
          Showing {rows.length ? (page-1)*limit+1 : 0}–{Math.min(rows.length, page*limit)} of {rows.length} entries
        </p>
      </Panel>
      <div className="pagination"><Btn secondary disabled={page===1} onClick={()=>setPage(page-1)}>Previous</Btn><span>Page {page} of {Math.max(1,Math.ceil(rows.length/limit))}</span><Btn secondary disabled={page*limit>=rows.length} onClick={()=>setPage(page+1)}>Next</Btn></div>
      {selected && (
        <div className="modal-backdrop">
          <div className="modal" role="dialog" aria-modal="true" aria-label="Product details">
            <div className="product-detail-photo"><Photo path={(pharma?'medicines/':'marketplace/')+selected.img} alt={selected.name} size={220}/></div><h3>{selected.name}</h3>
            <p>
              {selected.seller} · {selected.city}
            </p>
            <h2>{selected.price} AFN</h2>
            <p>
              {pharma?'Product photograph shows an example brand; packaging may vary.':selected.description}
            </p>
            <Btn onClick={() => setSelected(null)}>CLOSE</Btn>
          </div>
        </div>
      )}
    </>
  );
}
export function Dependents() {
  const [step, setStep] = useState(0),
    [data, setData] = useStored("hub-dependent", {
      first: "",
      last: "",
      month: "February",
      day: "1",
      year: "2021",
      relation: "",
      gender: "Male",
    }),
    [saved, setSaved] = useState(false),
    [error, setError] = useState("");
  const edit = (key, value) => {
    setData({ ...data, [key]: value });
    setSaved(false);
    setError("");
  };
  const valid = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date(
      Number(data.year),
      months.indexOf(data.month),
      Number(data.day),
    );
    return (
      data.first.trim() &&
      data.last.trim() &&
      data.relation.trim() &&
      d.getMonth() === months.indexOf(data.month) &&
      d.getDate() === Number(data.day) &&
      d <= new Date()
    );
  };
  return (
    <div className="dependents">
      <h1>Build Your Profile</h1>
      <p>This information will let us know more about your Family.</p>
      <div className="steps">
        {[
          "Dependents Registration",
          "Dependents Health Records",
          "Family Care Plan",
        ].map((x, i) => (
          <button
            key={x}
            onClick={() => {
              if (i > step && !valid()) {
                setError("Enter names, relation and a valid birth date first.");
                return;
              }
              setStep(i);
            }}
          >
            <span className={i <= step ? "filled" : ""} /> {x}
          </button>
        ))}
      </div>
      <Panel className="dependent-card">
        <h3>
          {
            [
              "Dependents Registration",
              "Dependents Health Record",
              "Family Care Plan",
            ][step]
          }
        </h3>
        {step === 0 ? (
          <div className="form-grid">
            <Field label="First Name">
              <input
                placeholder="Eg. Ahmad"
                value={data.first}
                onChange={(e) => edit("first", e.target.value)}
              />
            </Field>
            <Field label="Last Name">
              <input
                placeholder="Eg. Ahmadi"
                value={data.last}
                onChange={(e) => edit("last", e.target.value)}
              />
            </Field>
            <Field label="Birth Date">
              <div className="three-inputs">
                <select
                  value={data.month}
                  onChange={(e) => edit("month", e.target.value)}
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
                <select
                  value={data.day}
                  onChange={(e) => edit("day", e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
                <select
                  value={data.year}
                  onChange={(e) => edit("year", e.target.value)}
                >
                  {Array.from({ length: 90 }, (_, i) => (
                    <option key={i}>{new Date().getFullYear() - i}</option>
                  ))}
                </select>
              </div>
            </Field>
            <Field label="Relation">
              <input
                placeholder="Eg. Brother / Child"
                value={data.relation}
                onChange={(e) => edit("relation", e.target.value)}
              />
            </Field>
            <Field label="I'm">
              <select
                value={data.gender}
                onChange={(e) => edit("gender", e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </Field>
          </div>
        ) : step === 1 ? (
          <div className="form-grid">
            <Field label="Health notes (optional)">
              <textarea
                value={data.health || ""}
                onChange={(e) => edit("health", e.target.value)}
                placeholder="Add health notes"
              />
            </Field>
            <Field label="Blood group">
              <select
                value={data.blood || ""}
                onChange={(e) => edit("blood", e.target.value)}
              >
                <option value="">Unknown</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </Field>
          </div>
        ) : (
          <p>
            Review the dependent details and save this family
            profile: {data.first} {data.last}.
          </p>
        )}
        <div className="actions space-between">
          <Btn secondary onClick={() => setStep(Math.max(0, step - 1))}>
            BACK
          </Btn>
          <Btn
            onClick={() => {
              if (!valid()) {
                setError("Enter names, relation and a valid birth date first.");
                return;
              }
              setError("");
              if (step === 2) setSaved(true);
              else setStep(step + 1);
            }}
          >
            {step === 2 ? "SAVE" : "NEXT"}
          </Btn>
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {saved && <p className="success">Dependent profile saved successfully.</p>}
      </Panel>
    </div>
  );
}
export function Account() {
  const [billing, setBilling] = useStored("hub-billing", [
      {
        name: "Qudsia Sadat",
        company: "Kabul Medical Services",
        email: read("hub-profile", {}).email || "patient@example.com",
        address: "Kabul, Afghanistan",
      },
    ]),
    [editing, setEditing] = useState(-1),
    [draft, setDraft] = useState({}),
    [error, setError] = useState("");
  const invoices = [180, 250, 120, 180, 300].map((amount, i) => ({
    id: "DEMO-" + (i + 1),
    date: "2026-10-" + String(i + 1).padStart(2, "0"),
    amount,
  }));
  const download = () => {
    const blob = new Blob(
      [
        "DEMO INVOICES - NOT REAL BILLING\nID,Date,Amount AFN\n" +
          invoices.map((x) => `${x.id},${x.date},${x.amount}`).join("\n"),
      ],
      { type: "text/csv;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "demo-invoices.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <div className="account-summary"><div className="bank-card"><span>MY PATIENTHUB</span><h2>••••　••••　••••　7852</h2><div><small>Card holder</small><b>Qudsia Sadat</b><small>Valid through 11/28</small></div></div><Panel className="balance"><div className="square-icon currency-icon">AFN</div><h3>Account Balance</h3><h2>2,000 AFN</h2><small>Available balance</small></Panel><Panel className="balance"><div className="square-icon">▤</div><h3>Wallet Balance</h3><h2>455 AFN</h2><small>Wallet overview</small></Panel></div><div className="two-col billing-grid">
        <Panel>
          <h3>Billing Information</h3>
          {billing.map((x, i) => (
            <div className="billing-entry" key={i}>
              {editing === i ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      !draft.name?.trim() ||
                      !draft.company?.trim() ||
                      !draft.address?.trim() ||
                      !/^\S+@\S+\.\S+$/.test(draft.email || "")
                    ) {
                      setError(
                        "Complete all fields and enter a valid email.",
                      );
                      return;
                    }
                    setBilling(billing.map((y, j) => (j === i ? draft : y)));
                    setEditing(-1);
                    setError("");
                  }}
                >
                  {["name", "company", "email", "address"].map((k) => (
                    <Field key={k} label={k}>
                      <input
                        type={k === "email" ? "email" : "text"}
                        value={draft[k] || ""}
                        onChange={(e) =>
                          setDraft({ ...draft, [k]: e.target.value })
                        }
                        required
                      />
                    </Field>
                  ))}
                  {error && (
                    <p role="alert" className="error">
                      {error}
                    </p>
                  )}
                  <div className="actions">
                    <Btn secondary onClick={() => setEditing(-1)}>
                      CANCEL
                    </Btn>
                    <Btn type="submit">SAVE</Btn>
                  </div>
                </form>
              ) : (
                <>
                  <b>{x.name}</b>
                  <p>
                    {x.company}
                    <br />
                    {x.email}
                    <br />
                    {x.address}
                  </p>
                  <div className="actions">
                    <Btn
                      secondary
                      onClick={() => {
                        setDraft({ ...x });
                        setEditing(i);
                        setError("");
                      }}
                    >
                      EDIT
                    </Btn>
                    <button
                      className="text-button"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Remove these local demo billing details?",
                          )
                        ) {
                          setBilling(billing.filter((_, j) => j !== i));
                          setEditing(-1);
                        }
                      }}
                    >
                      REMOVE
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {!billing.length && (
            <>
              <p>No billing details saved.</p>
              <Btn
                onClick={() => {
                  setBilling([
                    {
                      name: "Qudsia Sadat",
                      company: "Sample Clinic",
                      email: read("hub-profile", {}).email || "patient@example.com",
                      address: "Kabul",
                    },
                  ]);
                  setDraft({
                    name: "Qudsia Sadat",
                    company: "Sample Clinic",
                    email: read("hub-profile", {}).email || "patient@example.com",
                    address: "Kabul",
                  });
                  setEditing(0);
                }}
              >
                ADD BILLING DETAILS
              </Btn>
            </>
          )}
        </Panel>
        <Panel>
          <div className="results-heading">
            <h3>Invoices</h3>
            <Btn secondary onClick={download}>
              EXPORT CSV
            </Btn>
          </div>
          {invoices.map((x) => (
            <div className="invoice-row" key={x.id}>
              <div>
                <b>{x.id}</b>
                <small>{x.date}</small>
              </div>
              <b>{x.amount} AFN</b>
            </div>
          ))}
        </Panel>
      </div>
    </>
  );
}
export function Settings() {
  const defaults = {
    first: "Qudsia",
    last: "Sadat",
    gender: "Female",
    email: read("hub-profile", {}).email || "patient@example.com",
    blood: "A+",
    location: "Charikar, Parwan",
    phone: "",
    height: "",
    weight: "",
    birth: "",
  };
  const [profile, setProfile] = useStored("hub-profile", defaults),
    [draft, setDraft] = useState(profile),
    [notice, setNotice] = useState(""),
    [password, setPassword] = useState(["", "", ""]),
    [confirm, setConfirm] = useState(false),
    [hidden, setHidden] = useStored("hub-private", false);
  const nav = useNavigate();
  const save = (e) => {
    e.preventDefault();
    if (
      !draft.first.trim() ||
      !draft.last.trim() ||
      !/^\S+@\S+\.\S+$/.test(draft.email)
    ) {
      setNotice("Enter your name and a valid email.");
      return;
    }
    if (draft.birth && draft.birth > localToday()) {
      setNotice("Birth date cannot be in the future.");
      return;
    }
    setProfile(draft);
    const billing = read('hub-billing', []);
    try { if (billing.length) localStorage.setItem('hub-billing', JSON.stringify(billing.map(x=>({...x, email:draft.email})))); } catch {}
    setNotice("Profile saved successfully.");
  };
  return (
    <div className="settings-layout">
      <Panel className="settings-menu">
        {[
          "Profile",
          "Basic Info",
          "Password Check",
          "2FA",
          "Session",
          "Clear Project Data",
        ].map((label, i) => (
          <a href={"#section-" + i} key={label}>
            {label}
          </a>
        ))}
      </Panel>
      <div className="settings-main">
        <Panel id="section-0">
          <div className="profile-row">
            <Photo
              path="profiles/patient-avatar.svg"
              alt="Patient portrait"
              size={75}
            />
            <div>
              <h3>
                {hidden
                  ? "Private profile"
                  : profile.first + " " + profile.last}
              </h3>
              <small>Patient</small>
            </div>
            <label className="visibility">
              Hide profile name{" "}
              <input
                type="checkbox"
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
              />
            </label>
          </div>
        </Panel>
        <Panel id="section-1">
          <h3>Basic Info</h3>
          <form onSubmit={save}>
            <div className="form-grid">
              {[
                ["First Name", "first"],
                ["Last Name", "last"],
                ["Gender", "gender"],
                ["Birth Date", "birth"],
                ["Email", "email"],
                ["Blood Group", "blood"],
                ["Location", "location"],
                ["Phone", "phone"],
                ["Height (cm)", "height"],
                ["Weight (kg)", "weight"],
              ].map(([label, key]) => (
                <Field key={key} label={label}>
                  {key === "gender" || key === "blood" ? (
                    <select
                      value={draft[key]}
                      onChange={(e) =>
                        setDraft({ ...draft, [key]: e.target.value })
                      }
                    >
                      {(key === "gender"
                        ? ["Female", "Male", "Other"]
                        : [
                            "Unknown",
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                          ]
                      ).map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={
                        key === "email"
                          ? "email"
                          : key === "birth"
                            ? "date"
                            : key === "phone"
                              ? "tel"
                              : ["height", "weight"].includes(key)
                                ? "number"
                                : "text"
                      }
                      min={["height", "weight"].includes(key) ? 1 : undefined}
                      max={
                        key === "birth"
                          ? localToday()
                          : key === "height"
                            ? 250
                            : key === "weight"
                              ? 500
                              : undefined
                      }
                      step={
                        ["height", "weight"].includes(key) ? "any" : undefined
                      }
                      required={["first", "last", "email"].includes(key)}
                      value={draft[key] || ""}
                      onChange={(e) =>
                        setDraft({ ...draft, [key]: e.target.value })
                      }
                    />
                  )}
                </Field>
              ))}
            </div>
            <Btn type="submit">SAVE PROFILE</Btn>
          </form>
        </Panel>
        <Panel id="section-2">
          <h3>Password Check</h3>
          <p>Check password strength using a sample password. This does not change your sign-in password.</p>
          {[
            "Password to check",
            "Repeat password",
          ].map((label, i) => (
            <Field key={label} label={label}>
              <input
                type="password"
                value={password[i]}
                onChange={(e) =>
                  setPassword(
                    password.map((v, j) => (j === i ? e.target.value : v)),
                  )
                }
              />
            </Field>
          ))}
          <p>At least 8 characters, one number and one symbol.</p>
          <Btn
            onClick={() => {
              setNotice(
                password[0].length >= 8 &&
                  /[0-9]/.test(password[0]) &&
                  /[^a-zA-Z0-9]/.test(password[0]) &&
                  password[0] === password[1]
                  ? "Sample validation passed. No password was changed."
                  : "Use matching passwords with at least 8 characters, one number and one symbol.",
              );
              setPassword(["", "", ""]);
            }}
          >
            CHECK PASSWORD
          </Btn>
        </Panel>
        <Panel id="section-3">
          <h3>Two-factor Authentication</h3>
          <p>
            Additional account protection is planned for a future version.
          </p>
          {["Security keys", "SMS verification", "Authenticator app"].map(
            (x) => (
              <div className="setting-row" key={x}>
                <span>{x}</span>
                <button disabled>COMING SOON</button>
              </div>
            ),
          )}
        </Panel>
        <Panel id="section-4">
          <h3>Current Session</h3>
          <p>
            You are signed in on this browser.
          </p>
          <Btn
            secondary
            onClick={() => {
              endDemo();
              nav("/");
            }}
          >
            SIGN OUT
          </Btn>
        </Panel>
        <Panel id="section-5">
          <h3>Clear Project Data</h3>
          <p>
            Remove profile, appointments, messages and billing information saved
            by this project in this browser.
          </p>
          <label>
            <input
              type="checkbox"
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
            />{" "}
            I want to clear data saved by this project.
          </label>
          <div className="actions">
            <button
              className="danger-btn"
              disabled={!confirm}
              onClick={() => {
                if (window.confirm("Clear all local MyPatientHUB demo data?")) {
                  Object.keys(localStorage)
                    .filter((k) => k.startsWith("hub-"))
                    .forEach((k) => localStorage.removeItem(k));
                  endDemo();
                  nav("/");
                }
              }}
            >
              CLEAR PROJECT DATA
            </button>
          </div>
        </Panel>
        {notice && (
          <p className="inline-notice" role="status">
            {notice}
          </p>
        )}
      </div>
    </div>
  );
}
