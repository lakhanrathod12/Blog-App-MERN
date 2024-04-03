import React,{useState} from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
// import dotenv from 'env'

const Register = () =>{
  const [userData, setUserData] = useState({
    name:'',
    email:'',
    password:'',
    password2:'',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const changeInputHandler =(e)=>{
    setUserData(prevState =>{
      return {...prevState, [e.target.name]:e.target.value}
    })
  }

const registerUser = async(e) =>{
  e.preventDefault()
  setError('')
  try{
      const response = await axios.post(`http://localhost:5000/api/users/register`,userData)
      const newUser = await  response.data;
      if(!newUser){
        setError("Couldn't register user. Please try again.")
      }else if(newUser){
        navigate('/login')
      }
      
  }catch(err){
    setError(err.response.data.message)
  }
}

  return (
    <section className='register'>
        <div className="container">
          <h2>Sign Up</h2>
          <form className="form register__form" onSubmit={registerUser}>
            {error && <p className="form__error-message">{error}</p>}
            <input type="text" placeholder='Full Name' name='name' value={userData.name} 
            onChange={changeInputHandler}/>
            <input type="text" placeholder='Email' name='email' value={userData.email} onChange=
            {changeInputHandler}/>
            <input type="password" placeholder='Password' name='password'value={userData.password}
            onChange={changeInputHandler}/>
            <input type="password" placeholder='Confirm Password' name='password2' value={userData.password2}
            onChange={changeInputHandler} />
            <button type='submit' className='btn primary'>Register</button>
          </form>
          <small>Already have an account?<Link to='/login'>Sign in</Link></small>
        </div>
    </section>
  )
}

export default Register