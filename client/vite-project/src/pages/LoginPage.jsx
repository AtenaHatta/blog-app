// import { set } from 'mongoose';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function LoginPage() {

    // Connect to Backend
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ redirect, setRedirect ] = useState(false)
    const { setUserInfo } = useContext(UserContext)

    async function login(ev){
        ev.preventDefault()
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {'Content-Type': 'application/json'}, // Send data as "JSON"
            credentials: 'include',
        })
        // Go to user page
        if(response.ok){
            response.json().then(userInfo => { 
                setUserInfo(userInfo)
                setRedirect(true)
            })
           
        } else {
            alert('Wrong credentials')
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }
    return(
        <div>
            <form className='login' onSubmit={login}>
              <h1>Login</h1>
                <input type="text" 
                       placeholder="Username" 
                       value={username} 
                       onChange={(ev) => setUsername(ev.target.value)}

                       />
                <input type="password" 
                       placeholder="Password" 
                       value={password} 
                       onChange={(ev) => setPassword(ev.target.value)} 
                       />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}