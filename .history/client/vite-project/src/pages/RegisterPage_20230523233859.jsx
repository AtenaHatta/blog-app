export default function RegisterPage() {

    // Connect to Backend
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    return(
        <div>
            <form className='register'>
            <h1>Register</h1>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Register</button>
            </form>
        </div>
    )
}