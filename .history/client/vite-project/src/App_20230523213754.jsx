import reactLogo from './assets/react.svg'
import './App.css'
import Post from './Post'
import Header from './Header'
import { Routes } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <main>
        <Header />
        <Post />
        <Post />
        <Post />
      </main>
    </Routes>
  )
}

export default App
