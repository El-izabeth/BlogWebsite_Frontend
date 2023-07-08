import React from 'react';
import './dashboard.css';
//import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function Myworks(){
    const navigate = useNavigate();
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
                    
            
          } catch (err) {
            console.log(err);
          }
        }
        func();
      }, []);
      const handleBack = async(e) => {
        e.preventDefault();
        navigate(`/dashboard`);
    } 
      let k;
      function handleEdit(k){
       // console.log(k);
        navigate(`/write/${works[k]._id}`);
      }
      function handleView(k){
        // console.log(k);
         navigate(`/view/${works[k]._id}`);
       }
    const userDetails = JSON.parse(window.localStorage.getItem('user'));
        
 
    const funcCallback = (cb) => {
        return cb();
      };
    
    return(
        <div className='write'>
            <button className='backButton' onClick={handleBack}>back</button>
            <h3>Your works - unpublished</h3>
            {
                funcCallback(() => {
                    const row = [];
                    
                    for (let i = works.length-1; i >= 0; i--) {
                        if(userDetails.username==author[i]&&isPublished[i]==0){
                            
                            row.push(
                            
                                <div className='texts'>
                                    <button className='works' onClick={()=>handleEdit(i)} key={i}>{title[i]}</button>                                
                                </div>
                            );
                            
                        }
                        

                        
                        }
                        
                    return row;
                    
                    }
                    
                  )
                  
            }
            <h3>Your works - published</h3>
            {
                funcCallback(() => {
                    const row = [];
                    
                    for (let i = works.length-1; i >= 0; i--) {
                        if(userDetails.username==author[i]&&isPublished[i]==1){
                            
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
    )
}
    


export default Myworks;