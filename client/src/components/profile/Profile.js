import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

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

            <div class='profile-grid my-1'>
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>Experience</h2>
                {profile.experience.length > 0 ? (
                  <>
                    {profile.experience.map((experience) => {
                      return (
                        <ProfileExperience
                          key={experience.id}
                          experience={experience}
                        />
                      );
                    })}
                  </>
                ) : (
                  <h4>No experience added</h4>
                )}
              </div>

              <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'>Education</h2>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((education) => {
                      return (
                        <ProfileEducation
                          key={education.id}
                          education={education}
                        />
                      );
                    })}
                  </>
                ) : (
                  <h4>No education added</h4>
                )}
              </div>

              {profile.githubusername !== ' ' && (
                <ProfileGithub username={profile.githubusername} />
              )}
            </div>
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
