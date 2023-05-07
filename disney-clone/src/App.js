import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Header from './components/Header'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header />
        <Routes>
          <Route exact path='/' element={<Login />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
