import { useEffect, useState } from 'react'
import UserCard from './components/userCard'
import './App.css'

function App() {
  const [loading ,setLoading]=useState(true);
  const [users, setUsers]=useState([]);
  const [error, setError]=useState(null);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res)=>{
      if(!res.ok) throw new Error("Failed to fetch User Card")
      
      return res.json()  
    })
    .then((data)=>{
      setUsers(data);
      setLoading(false); 
    })
    .catch((err)=>{
      setError(err.message)
      setLoading(false);
    });

  },[]);
  if (loading) return <h1>Loading...</h1>;
  if(error) return <h1 style={{color:"red"}}>{error} </h1>

  return(
    <div style={{width: "400px", margin: "20px auto"}}>
      <h1>UserProfiles</h1>
      {users.map((user)=>(
        <UserCard 
        key={user.id}
        name={user.name}
        email={user.email}
        city={user.city} />
      ))}
    </div>
  );
  
}

export default App
