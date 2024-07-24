import logo from "/logo.png";

import "./Navbar.scss";

import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useNotificationStore } from "../utils/notificationStore";

function Navbar() {
  const { user } = useUser();

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (user) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src={logo} alt="" />
          <span>Dream Place</span>
        </a>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img src={user.avatar || "/avatar.png"} alt="" />
            <span className="username">{user.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <div className="only">
            {/* <Link to="/login">Sign In</Link> */}
            <Link to="/register" className="register">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
