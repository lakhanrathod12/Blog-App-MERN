import React, { useState, useEffect } from 'react';
import PostItem from '../components/PostItem';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuthorPosts = () => {
  // Changed: Initialized posts state as an empty array
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/users/${id}`);
        // Changed: Ensure response.data is an array or default to empty array
        setPosts(response?.data || []);
        // console.log("Data:= ",response.data)
      } catch(err) {
        console.log(err, "post error");
      }
      setIsLoading(false);
    };
    // Changed: Added id as a dependency to useEffect
    fetchPosts();
  }, [id]); // Ensure useEffect runs when id changes

  if(isLoading) {
    return <Loader />;
  }

  return (
    <section className='posts'>
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({ _id:id, thumbnail, category, title, description, creator, createdAt }) => (
            <PostItem key={id} postId={id} thumbnail={thumbnail} category={category} title={title}
            description={description} authorID={creator} createdAt={createdAt} />
          ))}
        </div>
      ) : (
        <h2 className='center'>No posts found</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
