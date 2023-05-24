import { useState } from 'react'

export default function RegisterPage() {

    // Connect to Backend
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    async function register(ev) {
        ev.preventDefault()
        await fetch('http://localhost:8000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }), 
            headers: {'Content-Type': 'application/json'} // Send data as "JSON"
     })
    }

    return(
        <div>
            <form className='register' onSubmit={register}>
            <h1>Register</h1>
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
                <button type='submit'>Register</button>
                <br/>
                <button > <a className='homeBtn' href='/'>Go Home page</a></button>
            </form>
        </div>
    )
}