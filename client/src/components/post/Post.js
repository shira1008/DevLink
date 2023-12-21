import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/spinner';
import { getOnePost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import Alert from '../layout/Alert';
import CommentItem from './CommentItem';
const Post = ({ getOnePost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getOnePost(id);
  }, [getOnePost, , id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <Alert />
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

Post.propTypes = {
  getOnePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getOnePost })(Post);
