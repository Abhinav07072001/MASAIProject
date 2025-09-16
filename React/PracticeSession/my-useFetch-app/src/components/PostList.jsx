import { useReducer, useState } from "react";
import { useFetch } from "../hooks/useFetch.js";

export default function PostList(){
    const {data, loading, error}= useFetch("https://jsonplaceholder.typicode.com/posts");

    if(loading) return <p>Loading posts...</p>;
    if(error) return <p>Error: {error}</p>;

    return(
        <div style={{padding:"20px"}}>
            <h2>Posts</h2>

            <ul>
               {data.slice(0,5).map((post)=>(
                <li key={post.id}>
                    <strong>{post.title}</strong>
                    <p>{post.title}</p>
                </li>
               ))}
            </ul>
        </div>
    );
}