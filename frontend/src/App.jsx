import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Layout from './components/Layout'
import Register from './components/Register'
import Login from './components/Login'
import CreatePost from "./components/CreatePost"
import IndexPage from './components/IndexPage'
import PostPage from './components/PostPage'
import EditPost from './components/EditPost'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
