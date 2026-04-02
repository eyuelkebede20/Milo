import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import ProtectedRoute from "./components/Shared/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import BadgePrint from "./pages/BadgePrint";
import CreateEvent from "./pages/CreateEvent";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-base-100 font-sans antialiased text-base-content transition-colors duration-200">
        <Navbar />

        {/* Removed 'container mx-auto' so Landing sections can span 100% width */}
        <main className="pb-10 w-full">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* Protected: OrgAdmin Only */}
            <Route element={<ProtectedRoute allowedRoles={["OrgAdmin"]} />}>
              <Route path="/events/new" element={<CreateEvent />} />
              <Route path="/users/new" element={<UserManagement />} />
            </Route>

            {/* Protected: Managers & Admins */}
            <Route element={<ProtectedRoute allowedRoles={["OrgAdmin", "EventManager"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/badges/:eventId" element={<BadgePrint />} />
            </Route>

            {/* Protected: All Staff (Scanners, Managers, Admins) */}
            <Route element={<ProtectedRoute allowedRoles={["Scanner", "EventManager", "OrgAdmin"]} />}>
              <Route path="/checkin/:eventId" element={<CheckIn />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
