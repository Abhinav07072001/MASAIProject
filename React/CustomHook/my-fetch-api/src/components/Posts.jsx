import useFetch from "../hooks/useFetch";

function Posts(){
    const {data: posts, loading}=useFetch("https://jsonplaceholder.typicode.com/posts");

    return(
        <div>
            <h2>Post List</h2>
            {posts.map(p=>(
                <p key={p.id}>{p.title}</p>
            ))}
        </div>
    );
}
export default Posts;