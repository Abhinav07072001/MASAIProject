import useFetch from "../hooks/useFetch.js";

function Users(){
    const {data:users, loading}= useFetch("https://jsonplaceholder.typicode.com/users");

    if(loading) return <p>Loading...</p>

    return(
        <div>
            <h2>Users list</h2>
            {users.map(u=>(
                <p key={u.id}>{u.name}</p>
            ))}
        </div>
    );
}
export default Users;