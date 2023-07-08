import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
function Home() {
  
  return (
    <div className='base'>
      
      <div className = "App">
        <h1 className = "App-header">Candlelight</h1>
      <div>
      <button className="button">
        <Link to="/login" style={{color:'lightsalmon',textDecoration:'none'}}>
            login
        </Link>
      </button>
      <h1>          </h1>
      <button className="button">
        <Link to="/signup" style={{color:'lightsalmon',textDecoration:'none'}}>
            signup
        </Link>  
      </button>
      </div>
      <h2 className='quotes'>Stonebench serenades</h2>
    </div>
    </div>
      

  );
}


export default Home;