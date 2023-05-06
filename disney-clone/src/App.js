import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App