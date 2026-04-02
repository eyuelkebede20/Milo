import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Milo from "../../assets/big_Logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("milo_user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 sticky top-0 z-50 border-b border-base-200">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2 tracking-tight">
          <img className="w-8" src={Milo}></img>
          Milo
        </Link>
      </div>
      <div className="flex-none gap-2 md:gap-4">
        <ThemeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-full font-medium">
              {user.name} <span className="opacity-50 text-xs ml-1 hidden md:inline">({user.role})</span>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-52 border border-base-200">
              {user.role === "OrgAdmin" && (
                <>
                  <li>
                    <Link to="/events/new" className="font-medium rounded-lg py-2">
                      Create Event
                    </Link>
                  </li>
                  <li>
                    <Link to="/users/new" className="font-medium rounded-lg py-2">
                      Manage Staff
                    </Link>
                  </li>
                </>
              )}
              {user.role !== "Scanner" && (
                <li>
                  <Link to="/dashboard" className="font-medium rounded-lg py-2">
                    Dashboard
                  </Link>
                </li>
              )}
              {user.assignedEventId && (
                <li>
                  <Link to={`/checkin/${user.assignedEventId}`} className="font-medium rounded-lg py-2 text-primary">
                    Scanner Mode
                  </Link>
                </li>
              )}
              <div className="divider my-1"></div>
              <li>
                <button onClick={logout} className="text-error font-bold rounded-lg py-2">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm rounded-full font-bold text-white px-6">
            Staff Login
          </Link>
        )}
      </div>
    </div>
  );
}
