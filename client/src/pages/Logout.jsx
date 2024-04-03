import React,{useContext, useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Logout = () => {
  const {setCurrentUser} = useContext(UserContext)
  const navigate = useNavigate();
  setCurrentUser(null)
  navigate('/login')
  return (
    <>

    </>
  )
}

export default Logout
