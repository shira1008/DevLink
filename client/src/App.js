import './App.css';
import React, { useEffect } from 'react';
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
import Alert from './components/layout/Alert';

import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import createProfile from './components/profile-forms/createProfile';
import EditProfile from './components/profile-forms/EditProfile';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Outlet />
                {/* <Alert /> */}
              </>
            }
          >
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

            <Route
              path='dashboard'
              element={<PrivateRoute component={Dashboard} />}
            />

            <Route
              path='/create-profile'
              element={<PrivateRoute component={createProfile} />}
            />

            <Route
              path='/edit-profile'
              element={<PrivateRoute component={EditProfile} />}
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
