import React from 'react'

const Login = () => {

    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        name="emailOrPhone"
                        placeholder="Email or phone"

                        onChange={handleChange}
                        className="w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />



                    <input
                        type="password"
                        name="password"
                        placeholder="Password"

                        onChange={handleChange}
                        className="w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="w-full mt-5 bg-blue-500 text-white py-2  hover:bg-blue-600 transition"
                    >
                        Sign in

                    </button>
                </form>
            </div>
            <div className='mt-3'>
                <p className='text-center'>  If you don’t have an account, <span className='text-blue-600'>Register</span></p>
            </div>
        </div>
    )
}

export default Login