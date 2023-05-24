export default function RegisterPage() {

    // Connect to Backend
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    return(
        <div>
            <form className='register'>
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
                <button>Register</button>
            </form>
        </div>
    )
}