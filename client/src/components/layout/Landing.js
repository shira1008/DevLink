import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to='dashboard' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Connect with Developers</h1>
          <p className='lead landing-p'>
            Build your developer profile, share your projects, and connect with
            other developers.
            {/* <br /> Whether you're looking for collaboration, mentorship, or just
            want to showcase your work,
            <br /> DevLink is the place for you. */}
          </p>

          <div className='buttons'>
            <Link to='/register' className='cute-btn btn btn-primary '>
              Sign Up
            </Link>
            <Link to='/login' className='cute-btn btn btn-light  '>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
