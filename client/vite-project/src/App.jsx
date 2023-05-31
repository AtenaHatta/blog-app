import { Routes, Route } from 'react-router-dom'

import './App.css'
import 'react-toastify/dist/ReactToastify.css';

import { UserContextProvider } from './UserContext'
import Layout from '@/Layout'
import IndexPage from '@/pages/IndexPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import CreatePost from '@/pages/CreatePost'
import PostPage from '@/pages/PostPage'
import EditPost from '@/pages/EditPost'
import { tr } from 'date-fns/locale'
import { ToastContainer } from 'react-toastify'


function App() {
  return (
  <UserContextProvider>
  <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        className="custom-toast-container"
      />
    <Routes>
      <Route path='/' element={<Layout />} >
      <Route index element={<IndexPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />}/>
      <Route path='/create' element={<CreatePost />} />
      <Route path='/post/:id' element={<PostPage />} />
      <Route path='/edit/:id' element={<EditPost />} />
      </Route>
    </Routes>
  </UserContextProvider>
  )
}

export default App
