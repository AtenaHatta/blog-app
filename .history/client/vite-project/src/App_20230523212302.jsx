import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  return (
    <>
      <main>
        <header>
          <a href='' className='logo'>My Blog</a>
          <nav>
            <a href=''>Login</a>
            <a href=''>Register</a>
          </nav>
        </header>
          <div className='post'>
            <div className='image'>
              <img src={reactLogo} alt="React Logo" />
            </div>
            <div className='texts'>
              <h2>Full-house battery backup coming later this year</h2>
              <p className='info'>
                <a className='author'>Dewid Paraz</a>
                <time>2023-01-06 16:45</time>
              </p>
              <p className='summary'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            </div>
          </div>
          <div className='post'>
            <div className='image'>
              <img src={reactLogo} alt="React Logo" />
            </div>
            <div className='texts'>
              <h2>Full-house battery backup coming later this year</h2>
              <p className='info'>
                <a className='author'>Dewid Paraz</a>
                <time>2023-01-06 16:45</time>
              </p>
              <p className='summary'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            </div>
          </div>
          <div className='post'>
            <div className='image'>
              <img src={reactLogo} alt="React Logo" />
            </div>
            <div className='texts'>
              <h2>Full-house battery backup coming later this year</h2>
              <p className='info'>
                <a className='author'>Dewid Paraz</a>
                <time>2023-01-06 16:45</time>
              </p>
              <p className='summary'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            </div>
          </div>
      </main>
    </>
  )
}

export default App
