import './App.css'
import Post from './Post'
import Header from './Header'
import Layout from '@/Layout'
import IndexPage from '@/pages/IndexPage'
import LoginPage from '@/pages/LoginPage'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
    <Route path='/' element={<Layout />} >
      <Route index element={<IndexPage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/register'} element={<Register />}/>
      </Route>
    </Routes>
  )
}

export default App
