import React from 'react';
import './dashboard.css';
//import { Link } from 'react-router-dom';
//import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function Friendworks(){
    const navigate = useNavigate();
    
    let friendID = useParams()
    const handleBack = async(e) => {
        e.preventDefault();
        navigate(`/dashboard`);
    } 
   
    return(
        <div className='write'>
            <button className='backButton' onClick={handleBack}>back</button>
            
        </div>
    )
}
    


export default Friendworks;