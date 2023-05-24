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
          <div className='entry'>
          <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.searchenginejournal.com%2Fbest-image-search-engines%2F299963%2F&psig=AOvVaw0QyQbu_SNfdkMJQyZFmMWL&ust=1684986973710000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIj79-GHjf8CFQAAAAAdAAAAABA9' />
          </div>
      </main>
    </>
  )
}

export default App
