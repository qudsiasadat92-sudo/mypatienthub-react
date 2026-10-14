import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  Shell,
  Appointments,
  Chat,
  Marketplace,
  Dependents,
  Account,
  Settings,
  hasDemoSession,
} from "./Hub.jsx";
import FindDoctor from "./pages/FindDoctor.jsx";
import FindClinic from "./pages/FindClinic.jsx";
import FindPharmacy from "./pages/FindPharmacy.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
function RequireDemo({ children }) {
  const location = useLocation();
  return hasDemoSession() ? (
    children
  ) : (
    <Navigate
      to="/"
      replace
      state={{ from: location.pathname, booking: location.state }}
    />
  );
}
function Page({ name, hero = false, publicPage = false, children }) {
  const page = (
    <Shell name={name} hero={hero}>
      {children}
    </Shell>
  );
  return publicPage ? page : <RequireDemo>{page}</RequireDemo>;
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authentication/sign-in/basic" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Page name="Dashboard">
              <Dashboard />
            </Page>
          }
        />
        <Route
          path="/appointment"
          element={
            <Page name="Appointments">
              <Appointments />
            </Page>
          }
        />
        <Route
          path="/searchdoctor"
          element={
            <Page name="Find Doctor" hero publicPage>
              <FindDoctor />
            </Page>
          }
        />
        <Route
          path="/findhospital"
          element={
            <Page name="Find Clinic" hero publicPage>
              <FindClinic />
            </Page>
          }
        />
        <Route
          path="/chat"
          element={
            <Page name="Chat">
              <Chat />
            </Page>
          }
        />
        <Route
          path="/marketplace"
          element={
            <Page name="Find MarketPlace" publicPage>
              <Marketplace type="market" />
            </Page>
          }
        />
        <Route
          path="/pharmacyplace"
          element={
            <Page name="Find Pharmacy" publicPage>
              <FindPharmacy />
            </Page>
          }
        />
        <Route
          path="/mydependents"
          element={
            <Page name="My Dependents">
              <Dependents />
            </Page>
          }
        />
        <Route
          path="/myaccount"
          element={
            <Page name="My Account">
              <Account />
            </Page>
          }
        />
        <Route
          path="/accountsetting"
          element={
            <Page name="Settings">
              <Settings />
            </Page>
          }
        />
        <Route
          path="/find-doctor"
          element={<Navigate to="/searchdoctor" replace />}
        />
        <Route
          path="/finddoctor"
          element={<Navigate to="/searchdoctor" replace />}
        />
        <Route
          path="/find-clinic"
          element={<Navigate to="/findhospital" replace />}
        />
        <Route
          path="/find-pharmacy"
          element={<Navigate to="/pharmacyplace" replace />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
