import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Header from './components/Header'
import Home from './pages/Home'
import MoviesDetails from './pages/MoviesDetails'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/movies/:movieId' element={<MoviesDetails />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
