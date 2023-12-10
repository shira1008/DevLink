import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Outlet />}>
          <Route index element={<Landing />} />

          {/* Apply container class to /register and /login */}
          <Route
            path='/register'
            element={
              <section className='container'>
                <Register />
              </section>
            }
          />
          <Route
            path='/login'
            element={
              <section className='container'>
                <Login />
              </section>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
