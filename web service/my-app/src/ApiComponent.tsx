import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const ApiComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() =>{
    axios.get("http://localhost:5555/users").then((response)=> {
      setData(response.data)
    });
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/items');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      const newItemObj = { id: uuid(), name: newItem };
      await axios.post('/api/items', newItemObj);
      setNewItem('');
      fetchData();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <h2>API Component</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter item name"
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default ApiComponent;
