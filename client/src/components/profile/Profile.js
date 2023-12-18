import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import { getProfilesById } from '../../actions/profile';
import { useParams } from 'react-router-dom'; // Import useParams

const Profile = ({ getProfilesById, profile: { profile, loading }, auth }) => {
  const { id } = useParams(); // Use useParams to get the 'id' parameter

  useEffect(() => {
    console.log(id);
    getProfilesById(id);
  }, [getProfilesById, id]);

  return <div className='container'>Profile</div>;
};

Profile.propTypes = {
  getProfilesById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfilesById })(Profile);
