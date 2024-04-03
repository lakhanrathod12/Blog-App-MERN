import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios'
import Loader from '../components/Loader';

const DeletePost =({postId: id})=> {
  const navigate = useNavigate();
  const{currentUser} = useContext(UserContext)
  const token = currentUser?.token;
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  // redirect to login page for any user who is not logged in
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  
  const removePost = async(id)=>{
      setIsLoading(true)
       try{
          const response = await axios.delete(`http://localhost:5000/api/posts/${id}`,{withCredentials:true,
          headers:{Authorization:`Bearer ${token}`}})
          if(response.status == 200){
            if(location.pathname == `/myposts/${currentUser.id}`){
                navigate(0)
            }else{
              navigate('/')
            }
          }
          setIsLoading(false);
       }catch(err){
        console.log(err)
       }
      
  }
  if(isLoading) return <Loader/>

  return (
    <Link className='btn sm danger' onClick={()=> removePost(id)}>Delete</Link>
  )
}

export default DeletePost
