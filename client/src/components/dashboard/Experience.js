import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{' '}
        {exp.to ? <Moment format='DD/MM/YYYY'>{exp.to}</Moment> : 'Now'}
      </td>
      <td>
        <button className='btn btn-danger cute-btn'>Delete</button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
