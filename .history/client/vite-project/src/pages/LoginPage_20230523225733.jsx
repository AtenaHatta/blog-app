export default function LoginPage() {
    return(
        <div>
            <form action='login'>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button>Login</button>
            </form>
        </div>
    )
}