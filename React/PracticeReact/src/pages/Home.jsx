import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home(){
    const [posts, setPosts]= useState([]);
    const [loading ,setLoading]=useState(true);
    const [page , setPage]=useState(1);
    const limit=6;
    const [total, setTotal]=useState(0);

    useEffect(()=>{
        async function fetchPosts() {
            setLoading(true)
            try{
                const skip= (page - 1)* limit;
                const res= await fetch( `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
                const data= await res.json()
                setPosts(data.posts);
                setTotal(data.total);
            }catch(err){
                console.error(err)
            }finally{
                setLoading(false)
            }
        }
        fetchPosts()
    },[page]) // runs when page changing

    const totalPages= Math.ceil(total / limit);

    if(loading){
        return <p>Loading posts...</p>
    }

    return(
        <section>
            <h1 style={{textAlign:"center"}}>Blog Posts</h1>
            {/* Grids of post    */}
            <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill ,minmax(250px, 1fr))",
                gap:"1.5rem",
                justifyContent:"center",
                alignContent:"center",
                marginTop:"2rem",
            
            }}>
                {posts.map((post)=>(
                    <div 
                    key={post.id}
                    style={{
                        border:"1px solid #ddd",
                        borderRadius:"1-px",
                        padding:"1rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        backgroundColor:"#fff",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-between",
                    }}
                    >
                        <div>
                            <h3 style={{marginBottom:"0.5rem"}}>{post.title}</h3>
                            <p style={{fontSize:"0.9rem", color:"#555"}}>
                                {post.body.slice(0, 80)}...
                            </p>
                        </div>
                        <Link
                        to={`/post/${post.id}`}
                        style={{
                             marginTop: "1rem",
                            padding: "0.5rem 1rem",
                            textAlign: "center",
                            backgroundColor: "#007bff",
                            color: "white",
                            borderRadius: "5px",
                            textDecoration: "none",
                            fontWeight: "bold",
                        
                        }}>
                            Read More
                        </Link>
                    </div>
                ))}
            </div>

            {/* pagination controls     */}
            <div style={{
                 display: "flex",
                 justifyContent: "center",
                 marginTop: "2rem",
                 gap: "1rem",
            }}>
                <button onClick={()=>setPage((p)=>Math.max(p - 1 , 1))}
                    disabled={page ===1}
                    style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                        backgroundColor: page === 1 ? "#ccc" : "#007bff",
                        color: "white",
                        cursor: page === 1 ? "not-allowed" : "pointer"
                    }} >
                        prev
                </button>

                <span style={{alignSelf:"center"}}>
                    Page {page} of {totalPages}
                </span>

                <button onClick={()=>setPage((p)=>Math.min(p +  1, totalPages))}
                    disabled ={page===totalPages}
                    style={{
                         padding: "0.5rem 1rem",
                        borderRadius: "5px",
                        border: "1px solid #007bff",
                        backgroundColor: page === totalPages ? "#ccc" : "#007bff",
                        color: "white",
                        cursor: page === totalPages ? "not-allowed" : "pointer",
                    }}>
                      Next  
                    </button>    
            </div>
            
        </section>
        
    );
}