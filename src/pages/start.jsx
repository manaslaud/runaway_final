import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function StartPage({onStart }) {
  const [formData, setFormData] = useState('');
  const navigate =  useNavigate();


  const handleButtonClick = (value) => {
    setFormData(value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onStart(formData);
    navigate('/game');
  };

  return (
    <div>
      <h1>Start Page</h1>
      <div>
        <label>
          <button type="button" onClick={() => handleButtonClick("college")}>
            college
          </button>
        </label>
        <label>
          <button type="button" onClick={() => handleButtonClick("companies")}>
            IT Companies
          </button>
        </label>
        <label>
          <button type="button" onClick={() => handleButtonClick("programming")}>
            Programming languages
          </button>
        </label>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Start Game
      </button>
    </div>
  );
};
export default StartPage;
