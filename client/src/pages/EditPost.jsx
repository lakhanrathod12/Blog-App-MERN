import React, { useState,useContext} from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const EditPost = ()=> {
  const [title, setTitle] =useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error,setError] = useState('')
    
  const navigate = useNavigate();
  const {id} = useParams();

  const{currentUser} = useContext(UserContext)
  const token = currentUser?.token;
  // redirect to login page for any user who is not logged in
  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])
  
  const module ={
    toolbar:[
      [{'header':[1,2,3,4,5,6,false]}],
      ['bold', 'italic', 'underline', 'strike','blockquote'],
      [{'list': 'ordered'},{'list': 'bullet'},{'indent':'-1'},{'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  const format =[
    'header',
    'bold', 'italic', 'underline', 'strike','blockquote',
    'list','bullet','indent',
    'link','image'
  ]
  const POST_CATEGORIES = ['Agriculture','Business','Education','Entertainment','Art','Investment','Uncategorized','Weather']

  useEffect(()=>{
    const getPost = async()=>{
      try{
            const response = await axios.get(`http://localhost:5000/api/posts/${id}`)
            setTitle(response.data.title)
            setDescription(response.data.description);
      }catch(err){
        // setError(err)
        console.log(err)
      }
    }
    getPost();
  }, [])
  
  const editPost =async (e)=>{
    e.preventDefault();
    const postData = new FormData();
    postData.set('title',title)
    postData.set('category',category)
    postData.set('description',description)
    postData.set('thumbnail',thumbnail)

    try{
      const response = await axios.patch(`http://localhost:5000/api/posts/${id}`,postData,
      {withCredentials:true, headers:{Authorization:`Bearer ${token}`}})
      if(response.status == 200){
        return navigate('/')
      }
    }catch(err){
      setError(err);
    }
  }


  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className='error'>{error}</p>}
        <form action="" className="form create-post__form" onSubmit={editPost}>
          <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e=>setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat} </option>)
            }
          </select>
            <ReactQuill modules={module} formats={format} value={description} onChange={setDescription}/>
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png,jpg, jpeg' />
            <button type='submit' className='btn primary'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost
