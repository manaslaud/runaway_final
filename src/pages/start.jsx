import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css'

function StartPage({onStart }) {
  const [formData, setFormData] = useState({theme: '', novolume: false});
  const navigate =  useNavigate();
  const prevRef = useRef(null);
  const collegesRef = useRef(null);
  const companiesRef = useRef(null);
  const programmingRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  const handlevolume = () => {
    setIsClicked((prevIsClicked) => {
      const newIsClicked = !prevIsClicked;
      setFormData({ ...formData, novolume: newIsClicked });
      return newIsClicked;
    });
  };
  
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

    setFormData({ ...formData, theme: value });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(formData.theme !== ''){
      onStart(formData);
      navigate('/game');
    }
    else{
      alert("Please select a theme");
    }
  };

  return (
    <div className="Final">
      <img src="madeby.png" className="madeby" alt="madeby" />
      <div className="gameName">
        Runaway
      </div>
      <button onClick={handlevolume} className={`${isClicked ? 'strike-through' : ''} volume` }>
      Sound
     </button>
      <div className="Main">
        <div className="ButtonsContainer">
          <div className="Row">
            <button type="button" onClick={() => handleButtonClick('colleges')} className="btn">
              <img src="options/noclick/colleges.png" className="btnimg" ref={collegesRef} id = "colleges" alt = "colleges"/>
            </button>
            <button type="button" onClick={() => handleButtonClick('companies')} className="btn">
              <img src="options/noclick/companies.png" className="btnimg" ref={companiesRef} id = "companies" alt = "companies"/>
            </button>
            <button type="button" onClick={() => handleButtonClick('programming')} className="btn">
              <img src="options/noclick/programming.png" className="btnimg" ref={programmingRef} id = "programming" alt = "programming" />
            </button>
          </div>
          <button type="submit" onClick={handleSubmit} className="start">
            <img src="start.png" className="btnimg" alt="start" />
          </button>
        </div>
      </div>
    </div>   
  );
}
export default StartPage;
