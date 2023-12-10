import React from 'react';
import { Link } from 'react-router-dom';

const landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Connect with Developers Worldwide</h1>
          <p className='lead'>
            Build your developer profile, share your projects, and connect with
            other developers.
            <br /> Whether you're looking for collaboration, mentorship, or just
            want to showcase your work,
            <br /> DevLink is the place for you.
          </p>

          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default landing;
