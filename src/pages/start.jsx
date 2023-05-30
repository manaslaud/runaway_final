import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css'
import Button from '@mui/material/Button';




function StartPage({onStart }) {
  const [formData, setFormData] = useState('');
  const navigate =  useNavigate();
  let prev;

  const handleButtonClick = (value) => {
  
    const image=document.querySelectorAll('.btnimg');
    image.forEach((img)=>{
      console.log(img.dataset.type)
      console.log(value)
      if(value===img.dataset.type && img.dataset.value!='1'){
        img.src=`options/onclick/${value}.png`;
        img.dataset.value='1';
        prev=`${value}`;
      }
      else{
        img.dataset.value='1';
        img.src=`${prev}.png`;
      }
    })

    setFormData(value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onStart(formData);
    navigate('/game');
  };

  return (
   
    <div className="Final">
    <img src="madeby.png" class="madeby"/>
    <img src="name.png" className="gameName"/>
    <div className='Main' >
      <div className='ButtonsContainer'>
        <div className="Row">
          <button type="button" onClick={() => handleButtonClick("colleges")} className='btn'>
          <img src='options/noclick/colleges.png' className='btnimg' data-type='colleges' data-value='0'/>
          </button>
          <button type="button" onClick={() => handleButtonClick("companies")} className='btn'>
          <img src='options/noclick/company.png' className='btnimg' data-type='companies' data-value='0' />
          </button>
        
        
          <button type="button" onClick={() => handleButtonClick("programming")} className='btn'>
          <img src='options/noclick/programming.png' className='btnimg' data-type='programming' data-value='0' />
          </button>
          </div>
        
          <button type="submit" onClick={handleSubmit} className='start'>
          <img src='start.png' className='btnimg' />
          </button>
      
      </div>
      
    </div>
    
    </div>
   
  );
};
export default StartPage;
