import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {token,setToken,backendUrl} = useContext(AppContext)
  const navigate = useNavigate();
  const [state,setState] = useState("sign up");

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try {
      if(state === 'sign up'){
        const {data} = await axios.post(`${backendUrl}/api/user/register`,{name,password,email})
        if(data.success){
          localStorage.setItem("token",data.token)
          setToken(data.token)
        }else{
          toast.error(data.message);
        }
      }
      else{
        const {data} = await axios.post(`${backendUrl}/api/user/login`,{email,password})
        if(data.success){
          localStorage.setItem("token",data.token)
          setToken(data.token) 
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
          toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' action="">
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "sign up" ? " Create Account " : "Login" }</p>
        <p>Please {state === 'sign up' ? "Signup" : "Login To Book and Appointment"}</p>

        {
          state == 'sign up' && 
        <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=> setName(e.target.value)} type="text" value={name} required/>
        </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=> setEmail(e.target.value)} type="text" value={email} required/>
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=> setPassword(e.target.value)} type="text" value={password} required/>
        </div>

        <button type='submit' className='bg-primary w-full text-white py-2 rounded-full text-base cursor-pointer' >{state === 'sign up' ? "Create Account" : "Login" }</button>
          {
            state == "sign up"? <p>Already have an account?<span onClick={()=>setState('Login')}  className='text-primary cursor-pointer underline'> Login here</span> </p>
            : <p>Create a new Account? <span onClick={()=>setState('sign up')} className='text-primary cursor-pointer underline'> Click here</span></p>
          }
      </div>
    </form>
  )
}

export default Login
