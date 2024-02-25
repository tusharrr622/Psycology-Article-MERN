import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"
import axios from "axios";

export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const username = userInfo?.username;

    function logout(ev) {
        ev.preventDefault();
        axios.post('http://localhost:3000/logout').then(
            setUserInfo(null)
        )
    }
    return (
        <><nav className="bg-white border-gray-200 dark:bg-gray-900 m-bottom">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link to={'/'}>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PsychoFact</span>
                </Link>


                <div className="flex items-center">
                    {username && (
                        <>
                            <Link to={'/create'}>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit your Research</button>
                            </Link>

                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={logout}>Logout</button>

                        </>
                    )}
                    {!username && (
                        <>
                            <Link to={'/login'}>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                            </Link>
                            <Link to={'/register'}>
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>








        </>

    )

}