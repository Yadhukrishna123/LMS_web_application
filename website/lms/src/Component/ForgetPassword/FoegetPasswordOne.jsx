import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'



const FoegetPasswordOne = () => {

    

  // const { token } = useParams()
  let [email, setEmail] = useState("")
  let [message, setMessage] = useState("")
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }





  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.post("http://localhost:8080/api/v1/forgot_password", {
        email
      })
      console.log(res);
      if (res.data.success) {
        setMessage(res.data.message)
      }

    } catch (error) {

    }

  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={handleEmail}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
        <div className='mt-5'>
          {message && <p className='text-center text-green-500'>{message}</p>}
          {!message && <p className='text-center text-red-500'>Email not found</p>}
        </div>
      </div>
    </div>
  )
}

export default FoegetPasswordOne