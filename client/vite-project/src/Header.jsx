import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "./UserContext";


export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);


  // Logout
  function logout() { 
    fetch("http://localhost:8000/logout", {
      credentials: "include", // To send the cookies to the backend
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      
    </header>
  );
}
