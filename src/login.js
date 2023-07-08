import React from 'react';
import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const navigate = useNavigate();
    const handleLogin = async(e)=>{
        e.preventDefault();
        
        let result = await fetch("http://localhost:8800/api/auth/login",{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.username){
            localStorage.setItem('user',JSON.stringify(result));
            navigate('/dashboard');
        }else{
            alert("Wrong email or password!");
        }
        
        
    }
    return(
    <div className='div'>
        <h1>login</h1>
        <form>
            <label className='label'>
                email:
                <p> </p>
                <input 
                    className='input'
                    type='text'
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </label>
            <p> </p>
            <label className='label'>
                password:
                <p> </p>
                <input 
                    className='input'
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                
            </label>
            <p> </p>
            <button onClick={handleLogin}>
                login!
            </button>
        </form>
    </div>
        
    )
}

export default Login;