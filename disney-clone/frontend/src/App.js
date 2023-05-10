import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Header from './components/Header';
import Home from './pages/Home';
import MoviesDetails from './pages/MoviesDetails';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const App = () => {
  const { email } = useSelector((state) => state.user.value);
  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLogin(email !== '');
    if (email === '') {
      setTimeout(() => {
        setMessage('');
      }, 2000);
      setMessage("You must be logged in")
    }
  }, [email]);

  useEffect(() => {
   
  }, [isLogin, message]);

  return (
    <>
      <BrowserRouter>
        <Header />
        {isLogin ? (
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/movies/:movieId" element={<MoviesDetails />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Login message={message} />} />
            <Route
              exact
              path="/home"
              element={
                <>
                  <Navigate to="/" replace={true} />
                 
                </>
              }
            />
             <Route exact path="/movies/:movieId"  element={
                <>
                  <Navigate to="/" replace={true} />
                 
                </>
              }
              />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
