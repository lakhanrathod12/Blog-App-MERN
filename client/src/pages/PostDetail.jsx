import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../components/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import DeletePost from '../pages/DeletePost';
import { UserContext } from '../context/userContext';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  // console.log("ID= ",id);
  const [post, setPost] = useState(null);
  const [creatorID, setCreatorID] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
        setCreatorID(response.data.creator);
      } catch (err) {
        setError(err.message); // Set the error message as state
      }
      setIsLoading(false)
    };

    getPost();
  }, [id]); // Include id in the dependency array

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className='post-detail' >
      {error && <p className='error'>{error}</p>}
      {post && 
        <div className='container post-detail__container'>
          <div className='post-detail__header'>
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className='post-detail__buttons'>
                <Link to={`/posts/${id}/edit`} className='btn sm primary'>
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className='post-detail__thumbnail'>
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} />
          </div>
          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
      }
    </section>
  );
}

export default PostDetail;
