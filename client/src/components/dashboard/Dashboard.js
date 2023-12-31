import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Alert from '../layout/Alert';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    console.log(user);
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <section className='container'>
        <Alert />
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <>
            <DashboardActions />
            <div className='td-container'>
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
            </div>
            <div className='my-2'>
              <button
                className='btn btn-danger cute-btn'
                onClick={() => deleteAccount()}
              >
                <i className='fas fa-user-minus' /> Delete My Account
              </button>
            </div>
          </>
        ) : (
          // user dont have a profile yet:
          <>
            <p>You have not yet setup a profile, please add some info</p>
            <Link
              to='/create-profile'
              className='btn btn-primary my-1 cute-btn'
            >
              Create Profile
            </Link>
          </>
        )}
      </section>
    </>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
