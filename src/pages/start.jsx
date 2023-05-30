import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css'

function StartPage({onStart }) {
  const [formData, setFormData] = useState('');
  const navigate =  useNavigate();
  const prevRef = useRef(null);
  const collegesRef = useRef(null);
  const companiesRef = useRef(null);
  const programmingRef = useRef(null);

  const handleButtonClick = (value) => {
    const imageRefs = {
      colleges: collegesRef,
      companies: companiesRef,
      programming: programmingRef,
    };

    const image = imageRefs[value].current;


    if (prevRef.current != null) {
      prevRef.current.src = `options/noclick/${prevRef.current.id}.png`;    }
    prevRef.current = image;

    image.src = `options/onclick/${value}.png`;

    console.log(value, prevRef.current, collegesRef.current, companiesRef.current, programmingRef.current)
    setFormData(value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    onStart(formData);
    navigate('/game');
  };

  return (
    <div className="Final">
      <img src="madeby.png" className="madeby" />
      <img src="name.png" className="gameName" />
      <div className="Main">
        <div className="ButtonsContainer">
          <div className="Row">
            <button type="button" onClick={() => handleButtonClick('colleges')} className="btn">
              <img src="options/noclick/colleges.png" className="btnimg" ref={collegesRef} id = "colleges"/>
            </button>
            <button type="button" onClick={() => handleButtonClick('companies')} className="btn">
              <img src="options/noclick/companies.png" className="btnimg" ref={companiesRef} id = "companies"/>
            </button>
            <button type="button" onClick={() => handleButtonClick('programming')} className="btn">
              <img src="options/noclick/programming.png" className="btnimg" ref={programmingRef} id = "programming" />
            </button>
          </div>
          <button type="submit" onClick={handleSubmit} className="start">
            <img src="start.png" className="btnimg" />
          </button>
        </div>
      </div>
    </div>   
  );
}
export default StartPage;
