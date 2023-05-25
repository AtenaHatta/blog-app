import { useState } from 'react';

export default function LoginPage() {

    // Connect to Backend
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    async function login(ev){
        ev.preventDefault()
        await fetch('http://localhost:8000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {'Content-Type': 'application/json'} // Send data as "JSON"
        })
    }

    return(
        <div>
            <form className='login' onSubmit={login}>
              <h1>Login</h1>
                <input type="text" 
                       placeholder="Username" 
                       value={username} 
                       onChange={ev => setUsername(ev.target.value)}

                       />
                <input type="password" 
                       placeholder="Password" 
                       value={password} 
                       onChange={ev => setPassword(ev.target.value)} 
                       />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}