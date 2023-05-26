import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
   const [username, setUsername] = useState(null)

  // Cookies
      useEffect(() => {
        fetch('http://localhost:8000/profile', {
          credentials: 'include',
        }).then(response => {
          response.json().then(userInfo => {
          setUsername(userInfo.username)
          })
        });
      }, []);

  // Logout
  function logout(){
    fetch('http://localhost:8000/logout', {
      credentials: 'include', // To send the cookies to the backend
      method: 'POST',
    })
    setUsername(null)
  }

    return(
        <header>
        <Link to='/' className='logo'>My Blog</Link>
        <nav>
        {username && (
          <>
            <Link to='/create'>Create new Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
        </nav>
      </header>
    )
}