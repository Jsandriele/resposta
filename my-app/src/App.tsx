  import './App.css';
  import { useState, useEffect } from 'react';
  import axios from 'axios';
function App() {
  const [user,setUser] = useState([]);
  
  useEffect(() =>{
    axios.get("http://localhost:5555/users").then((response)=> {
      setUser(response.data)
    });
  }, []);


  return (
    <div>
      <h1>Users</h1>
      <ul>
        {user.map((item: any) =>  {
            return <li key={item.id}>
              {item.name} - {item.age} - {item.email}
              
            </li>
      })}
      </ul>     
    </div>
  );
}

export default App;
