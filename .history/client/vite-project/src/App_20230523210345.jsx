import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
            <img src={reactLogo} alt="React Logo" />
            <div className='texts'>
              <h2>Full-house battery backup coming later this year</h2>
              <p>today Udvdsjhjlnljhljhljhvsldvhsdvuoshvdsuvhdsovdlsnvdksjlvnshvuhsvouhv</p>
            </div>
          </div>
          <div className='post'>
            <img src={reactLogo} alt="React Logo" />
            <div className='texts'>
              <h2>Full-house battery backup coming later this year</h2>
              <p>today Udvdsjhjlnljhljhljhvsldvhsdvuoshvdsuvhdsovdlsnvdksjlvnshvuhsvouhv</p>
            </div>
          </div>
          <div className='post'>
            <img src={reactLogo} alt="React Logo" />
            <div className='texts'>
              <h2>Full-house battery backup coming later this year</h2>
              <p>today Udvdsjhjlnljhljhljhvsldvhsdvuoshvdsuvhdsovdlsnvdksjlvnshvuhsvouhv</p>
            </div>
          </div>
      </main>
    </>
  )
}

export default App
