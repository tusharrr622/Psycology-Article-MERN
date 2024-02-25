import axios from "axios";
import Editor from "../Editor";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";


export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { userInfo } = useContext(UserContext);
    const { token } = userInfo;
    function handleSubmit(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the request header
                'Content-Type': 'multipart/form-data' // Set content type for FormData
            }
        };

        axios.post('http://localhost:3000/post', data, config).then(
            console.log(token),
            setRedirect(true)
        )

    };




    if (redirect) {
        return <Navigate to={'/'} />

    }

    return (
        <>
            


                <form onSubmit={handleSubmit}>
                    <div className="mb-6 my-40">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">Title</label>
                        <input
                            type="title"
                            id="title"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Title"
                            required
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="summary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center">Summary</label>
                        <input
                            type="summary"
                            id="summary"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Summary"
                            required
                            value={summary}
                            onChange={ev => setSummary(ev.target.value)}
                        />
                    </div>


                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-5 mb-5"
                        id="file_input"
                        type="file"

                        onChange={ev => setFiles(ev.target.files)}
                    />
                    <Editor onChange={setContent} value={content} />
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-center2">Submit</button>
                </form>
            
        </>
    )
}