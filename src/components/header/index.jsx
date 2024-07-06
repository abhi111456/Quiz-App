import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav className='flex flex-row gap-x-4 w-full z-20 fixed top-0 left-0 h-20 border-b  items-center  border-sky-500 bg-sky-100 shadow-lg px-6'>
            <div className='flex-1'>
                <Link to='/' className='text-3xl font-bold text-gray-900 hover:text-sky-600 transition-colors duration-300'>Quiz App</Link>
            </div>
            <div className='flex flex-row gap-x-4 items-center'>
                {userLoggedIn ? (
                    <button
                        onClick={() => { doSignOut().then(() => { navigate('/login'); }) }}
                        className='text-xl text-white bg-sky-500 hover:bg-sky-700 transition-colors duration-300 border-2 border-sky-500 p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link
                            to='/login'
                            className='text-xl text-white bg-sky-500 hover:bg-sky-700 transition-colors duration-300 border-2 border-sky-500 p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50'
                        >
                            Login
                        </Link>
                        <Link
                            to='/register'
                            className='text-xl text-white bg-sky-500 hover:bg-sky-700 transition-colors duration-300 border-2 border-sky-500 p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 ml-4'
                        >
                            Register New Account
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Header