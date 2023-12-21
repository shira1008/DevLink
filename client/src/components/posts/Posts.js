import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import PostItem from './PostItem';
import Alert from '../layout/Alert';
import { getPost } from '../../actions/post';
import PostForm from './PostForm';

const Post = ({ getPost, post: { posts, loading } }) => {
  useEffect(() => {
    getPost();
  }, [getPost]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <Alert />
        <h1 className='large text-primary'>Posts</h1>
        <p className='lead'>
          <i className='fas fa-user'> </i> Welcome
        </p>

        <PostForm />

        <div className='posts'>
          {posts.map((post) => (
            <PostItem key={post._id} post={post}>
              {' '}
            </PostItem>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired, // Fix the prop name here
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post); // Fix the component name here
