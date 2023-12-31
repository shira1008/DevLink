import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-profile'>
      <img src={avatar} alt='' className='round-img' />
      <div className='profile-info'>
        <div className='profile-name-job-loc'>
          <h2>{name}</h2>
          <p>
            {status} {company && <span> at {company}</span>}
          </p>
          <p className='my-1'>{location && <span> {location} </span>}</p>
        </div>
        <Link to={`/profile/${_id}`} className='btn btn-primary cute-btn'>
          {' '}
          View Profile{' '}
        </Link>
        <ul className='profile-skills'>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check'></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {};

export default ProfileItem;
