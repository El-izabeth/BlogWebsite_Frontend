import React from 'react';
import './dashboard.css';
import './profile.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Profile(){

    const [works,setWorks] = useState([]);
    let title = [];
    let author = [];
    let isPublished = [];
    for(let i = 0; i < works.length; i++){
        title[i] = works[i].title;   
        author[i] = works[i].author;    
        isPublished[i] = works[i].isPublished;
    }
    useEffect(() => {
        async function func() {
          try {
            const res = await fetch(`http://localhost:8800/api/posts/myworks`,{
                method:'get',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const works = await res.json();
            
            // Set the new component state using the data
            
                    setWorks(works);
                    console.log(works.length)
            
          } catch (err) {
            console.log(err);
          }
        }
        func();
      }, []);
    const navigate = useNavigate();
    //console.log("hi");
    let { handle } = useParams();
   // console.log(handle);
    handle = JSON.parse(handle);
    //console.warn(handle)
    
    const handleBack = async(e) => {
        e.preventDefault();
        navigate(`/dashboard`);
    } 
    function handleView(k){
        // console.log(k);
         navigate(`/view/${works[k]._id}`);
       }
    const funcCallback = (cb) => {
        return cb();
      };
    return(
        <div>
            <div class="profile_div">
                <button className='backButton' onClick={handleBack}>back</button>
                <h1>Welcome to {handle.username}'s profile</h1>
                <h2>email: {handle.email}</h2>
                <h2>gender: {handle.gender}</h2>
                <h2>works:</h2>{
                    funcCallback(() => {
                        const row = [];
                        
                        for (let i = works.length-1; i >= 0; i--) {
                            
                            if(handle.username==author[i]&&isPublished[i]==1){
                                
                                row.push(
                                    
                                    <div className='texts'>
                                        <button className='works' onClick={()=>handleView(i)} key={i}>{title[i]}</button>                                
                                    </div>
                                );
                                
                            }
                            

                            
                            }
                            
                        return row;
                        
                        }
                        
                    )
                }
            </div>
            
            
        </div>
    )
}
    


export default Profile;