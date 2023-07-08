
import React,{ useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';

function Signup(){
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [gender,setGender] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const collectData= async(e)=>{
        e.preventDefault();
        console.warn(username,email,gender,password);
        let result = await fetch("http://localhost:8800/api/auth/register",{
            method:'post',
            body:JSON.stringify({username,email,gender,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        
        navigate('/');
    }
    return(
        <div className='div'>
        <h1>signup</h1>
        <form>
            <label className='label'>
                username:
                <p> </p>
                <input 
                    className='input'
                    type='text'
                    name='username'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
            </label>
            <p> </p>
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
                gender:
                <p> </p>
                <input 
                    className='input'
                    type='text'
                    name='gender'
                    value={gender}
                    onChange={(e)=>setGender(e.target.value)}
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
            <button onClick={collectData}>
                signup!
            </button>
        </form>
    </div>
    )
}

export default Signup;