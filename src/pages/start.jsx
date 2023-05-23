import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function StartPage({onStart }) {
  const [formData, setFormData] = useState('');
  const navigate =  useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    onStart(formData);
    navigate('/game');
  };

  const handleChange = (event) => {
    setFormData(event.target.value);
  }

  return (
    <div>
      <h1>Start Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Object:
          <input type="text" value={formData} onChange = {handleChange} />
        </label>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default StartPage;
