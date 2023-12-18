import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/spinner';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();
  // console.log(profile);
  // console.log(auth);
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <section className='container'>
      <Fragment>
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1>{profile.user.name}'s profile</h1>
            <Link to='/profiles' className='btn btn-dark cute-btn'>
              {' '}
              Back to Profiles
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark cute-btn'>
                  Edit Profile
                </Link>
              )}
          </Fragment>
        )}
      </Fragment>
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
