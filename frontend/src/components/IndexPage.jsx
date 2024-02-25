import axios from "axios";
import { useState, useEffect } from "react"
import { Card } from "./Card";
import ErrorBoundary from "../ErrorBoundary";
export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/post');
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();

    }, [])



    return (
        <>
            <ErrorBoundary>
                {posts.length > 0 && posts.map((post, index) => (
                    <Card key={post._id} uniqueKey={index} {...post} />
                ))}

            </ErrorBoundary>

        </>
    )

}