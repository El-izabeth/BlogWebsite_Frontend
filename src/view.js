import React from 'react';
import './dashboard.css';
//import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function View(){
    
    const navigate = useNavigate();
    const [content,setContent] = useState("");
    const [title,setTitle] = useState("");
    const [isPublished,setIsPublished] = useState("");
    const [likesCount,setLikesCount] = useState();
    
    let postID = useParams();
    console.log(postID.id)
    useEffect(() => {
        async function func() {
          try {
            let result = await fetch(`http://localhost:8800/api/posts/get/${postID.id}`,{
              method:'get',
              headers:{
                  'Content-Type':'application/json'
              }
          })
          result = await result.json();
          setContent(result.content);
            setLikesCount(result.likesCount);
            setTitle(result.title);
          result = JSON.stringify(result);
          
            console.log(content)
            // Set the new component state using the data
            
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
    const handleLike = async(e) => {
      e.preventDefault();
      let result = await fetch(`http://localhost:8800/api/posts/like/${postID.id}`,{
              method:'put',
              body:JSON.stringify({likesCount}),
              headers:{
                  'Content-Type':'application/json'
              }
          });
          setLikesCount(result.likesCount);
      
  } 
   
    const userDetails = JSON.parse(window.localStorage.getItem('user'));
        
 
   
    return(
        <div className='write'>
            
            <button className='backButton' onClick={handleBack}>back</button>
            <h2>{title}</h2>
            
            <div className='blog'>
              {content}
            </div>
            <button className='likeButton' onClick={handleLike}>like</button>
            <p>{likesCount}</p>
           
        </div>
    )
}
    


export default View;