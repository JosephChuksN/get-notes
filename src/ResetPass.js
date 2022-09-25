import React, { useEffect, useState } from 'react'
import {onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth'
import { toast } from 'react-toastify';
import { auth } from './firebaseConfig';
import { useAuth } from './context/AuthContext';
import { BeatLoader } from 'react-spinners'



export default function ResetPass() {
    const { navigate, setError, error, message, setMessage, loading, setLoading } = useAuth()

  useEffect(() => {
    onAuthStateChanged(auth, data => {
        if(data){
          navigate('../')
        }
    })
}, [])

    // const [show, setShow] = useState(false)

    const [data, setData] = useState({
        email: '',
    })

  function handleChange(e){
    const {name, value} = e.target
    setData(prevData => ({
      ...prevData,
      [name]: value,
    })
    )
  }

//   reset password
const resetPass = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
        await sendPasswordResetEmail(auth, data.email)
        .then(() => {
            setMessage('Password reset link sent! Check your Inbox or SPAM Folder')
            toast.info('Password reset link sent! Check your Inbox or SPAM Folder')
        })
    }
    catch(err){
        if(err.code === "auth/invalid-email"){
            toast.error('Invalid or Incorrect email')
            setError('Invalid or Incorrect email')
        }else if(err.code == 'auth/user-not-found'){
            toast.error('User not found!')
            setError('User not found!')
        }else{
            console.log(err.code)
        }
    }
    setLoading(false)
}

useEffect(() => {
    if(message != ""){
        setTimeout(() => {
            setMessage('')
        }, 5000);
    }
}, [message])

useEffect(() => {
    if(error != ""){
        setTimeout(() => {
            setError('')
        }, 5000);
    }
}, [error])


  return (
      <div id='resetPass'>
      <form action="" onSubmit={resetPass}>
        <label htmlFor="Username">
          Enter registered Email:
        </label>
        <input
        name='email'
        type="email" 
        placeholder='Enter registered Email Address' 
        value={data.email}
        onChange={(e) => handleChange(e)}
        required
        />
        {loading && <button><BeatLoader color='#fff'/></button>}
        {!loading && <input type="submit" value="Change Password"/>}
        <p className='success'>{message}</p>
        <p className='error'>{error}</p>
      </form>
    </div>
  )
}
