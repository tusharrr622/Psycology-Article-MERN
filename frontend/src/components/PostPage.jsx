import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState, } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../UserContext"
export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3000/post/${id}`).then(Response => {
            const data = Response.data;
            setPostInfo(data)
        })
    }, [id])

    if (!postInfo) {
        return '';
    }
    return (
        <div className="bg-white border-gray-200 dark:bg-gray-900 post-page">
            <p className="text-6xl text-gray-900 dark:text-white text-center">{postInfo.title}</p>
            <div className="date-center">

                <time className="text-blue-600">{formatISO9075(new Date(postInfo.createdAt))}</time>
            </div>

            <p className="text-blue-600 m-center2">by @{postInfo.author.username}</p>


            {userInfo.id === postInfo.author._id && (
                <div className="edit-row m-center2">
                    <Link className="edit-btn " to={`/edit/${postInfo._id}`}>
                    
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-center1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            Edit This Post
                        </button>
                    </Link>
                </div>
            )}
            <div className="image">
                <img className="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800 m-center1" src={`http://localhost:3000/${postInfo.cover}`} alt="cover" />
            </div>
            <div className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400 text-center leading-relaxed whitespace-normal mt-5" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}