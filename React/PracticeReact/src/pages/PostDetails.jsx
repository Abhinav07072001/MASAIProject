import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PostDetails(){
    const { id }= useParams()
    const [loading , setLoading]=useState(true)
    const [post , setPosts]=useState(null)

    useEffect(()=>{
        async function fetchPost() {
            try{
                const res= await fetch(`https://dummyjson.com/posts/${id}`);
                const data=await res.json();

                setPosts(data);

            }catch(err){
                console.error(err);
            }finally{
                setLoading(false)
            }
        }
        fetchPost()
    },[id]);
    
    if(loading){
        <p>Loaidng Post...</p>
    }
    if(!post){
        return <p>Pst not found...</p>;
    }

    return(
        <section>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h3>Tags:</h3>
            <ul>
                {post.tags.map((tag, index)=>(
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            {/* <p>We will fetch and show the post content and tags here.</p> */}
        </section>
    )
}