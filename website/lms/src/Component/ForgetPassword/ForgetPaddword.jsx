import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const ForgetPaddword = () => {
  const navigate = useNavigate()
  let [password, setPassword] = useState("")
  let [confirmPassword, setConfirmPassword] = useState("")
  let [error, setError] = useState("")
  let [success, setSuccess] = useState("")
  const { token } = useParams()





  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("password do not match")
      return
    }
    try {
      let res = await axios.post(`http://localhost:8080/api/v1/reset_password/${token}`, {
        password
      })
      console.log(res);
      if (res.data.success) {
        setSuccess(res.data.success)
        toast.success(res.data.message)

        await new Promise((back) => setTimeout(back, 3000))
        navigate("/login")
      }

    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        {/* {message && <p className="text-center text-red-500 mb-3">{message}</p>} */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
        <div className='mt-5'>
          {error && <p className="text-red-500 text-center mb-3">{error}</p>}
          {success && <p className="text-green-500 text-center mb-3">{success}</p>}
        </div>
      </div>
    </div>
  )
}

export default ForgetPaddword