import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    // The issue might be here, ensure that getGithubRepos is defined in props
    getGithubRepos(username);
  }, [getGithubRepos, username]); // Ensure to include username in the dependency array if it's part of the effect

  useEffect(() => {
    // Log the updated repos when the repos state changes
    console.log(repos);
  }, [repos]);
  return (
    <div className='profile-github'>
      <h2>
        <i className='fab fa-github'></i>{' '}
        <a
          href={`https://github.com/${username}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {username}s Github Repos
        </a>
      </h2>

      {repos === null || repos.length === 0 ? (
        <>
          <p>This user have no repositories </p>
        </>
      ) : (
        repos.map((repo) => (
          <>
            <div key={repo.id} className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  {repo.stargazers_count > 0 && (
                    <li className='badge badge-primary'>
                      Starts: {repo.stargazers_count}
                    </li>
                  )}

                  {repo.watchers_count > 0 && (
                    <li className='badge badge-dark'>
                      Watchers: {repo.watchers_count}
                    </li>
                  )}

                  {repo.forks_count > 0 && (
                    <li className='badge badge-light'>
                      Forks: {repo.forks_count}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
