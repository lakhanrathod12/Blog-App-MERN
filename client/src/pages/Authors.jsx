import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import usericon from '../images/user.png';
import axios from 'axios';
import Loader from '../components/Loader';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/users`);
        setAuthors(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getAuthors();
  }, []);
if(isLoading){
  return <Loader/>
}
  return (
    <section className="authors">
      {authors && authors.length > 0 ? (
        <div className="container authors__container">
          {authors.map(({_id:id, avatar, name, posts }) => (
             <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author__avatar">
                { avatar ? <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} />
                : <img src={usericon}></img>}
              </div>
              <div className="author__info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className='center'>No user/author Found</h2>
      )}
    </section>
  );
};

export default Authors;
