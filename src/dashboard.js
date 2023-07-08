import * as React from 'react';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function Dashboard(){
    const [handle,setHandle] = useState("");
    
    const navigate = useNavigate();
    
    const userDetails = JSON.parse(window.localStorage.getItem('user'));
    let title="";
    let content="";
    const handleLogout = async(e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    };
    const handleNew = async(e) => {
        e.preventDefault();
        const author = userDetails.username;
          let result = await fetch(`http://localhost:8800/api/posts/new`,{
              method:'post',
              body:JSON.stringify({title,content,author}),
              headers:{
                  'Content-Type':'application/json'
              }
          });
          result = await result.json();
          navigate(`/write/${result._id}`)
          result = JSON.stringify(result);
          console.log(result);   
        
    }
    const handleDisplay = async(e) => {
        e.preventDefault();
        navigate(`/myworks`)
                
    }
    const handleSearch = async(e) => {
        e.preventDefault();
        let result = await fetch(`http://localhost:8800/api/users/find/${handle}`,{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }
        });
    
        
        result = await result.json();

        console.warn(result);
        
        if(result.username){
            
            result = JSON.stringify(result);
            
            navigate(`/profile/${result}`); 
            
        }else{
            alert("User not found");
        }
               
    }
    
    return(
        <div className='maindiv'>
            <div className='div'>
            <button onClick={handleLogout}>
                logout
            </button>
            <p> </p>
      
            
            <h3>Hello {userDetails.username}</h3>

            <label className='label'>
                search users:
                <p> </p>
                <input 
                    className='input'
                    type='text'
                    name='username'
                    value={handle}
                    onChange={(e)=>setHandle(e.target.value)}
                />
            </label>
            
            <button onClick={handleSearch}>
            
                search
            
            </button>

            <p> </p>
            
            <p> </p>

            
            </div>
            <button onClick={handleNew}>
                New Blog
            </button>
            <button onClick={handleDisplay}>
                Working on
            </button>
        </div>
        
    )
}

export default Dashboard;