import React from 'react';
import './dashboard.css';
//import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Write(){
    
    const navigate = useNavigate();
    const [content,setContent] = useState("");
    const [title,setTitle] = useState("");
    const [isPublished,setIsPublished] = useState("");
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
    
    const handleSave = async(e) => {
        e.preventDefault();

        if(!userDetails){
            console.log("login to save!");
            alert("login to save!");
            return;
        }
        const author = userDetails.username;
          let result = await fetch(`http://localhost:8800/api/posts/save/${postID.id}`,{
              method:'put',
              body:JSON.stringify({title,content,author}),
              headers:{
                  'Content-Type':'application/json'
              }
          });
          result = await result.json();
          result = JSON.stringify(result);  
          setContent(result.content);
          setTitle(result.title);
    }
      
      const handlePost = async(e) => {
        
        e.preventDefault();
        setIsPublished(true);
        let result = await fetch(`http://localhost:8800/api/posts/publish/${postID.id}`,{
              method:'put',
              body:JSON.stringify({isPublished}),
              headers:{
                  'Content-Type':'application/json'
              }
          });
          result = await result.json();
          result = JSON.stringify(result);
          console.log(result);  
          
        
    }
    const handleBack = async(e) => {
        e.preventDefault();
        navigate(`/dashboard`);
    } 
    //let { posts } = await display();
    //console.log("outside"+posts);
    const userDetails = JSON.parse(window.localStorage.getItem('user'));
        
 
   
    return(
        <div className='write'>
            <p className='warning'>only last saved version will be posted. SAVE BEFORE LEAVING!</p>
            <label>
                Title:
                <p></p>
                <input className='titleInput'
                        type='text'
                        name='title'
                        value={title}
                        placeholder='enter title'
                        onChange={(e)=>setTitle(e.target.value)}
                ></input>
            </label>
            
        <p></p>
        <label>
                Write:
                <p></p>
        <textarea className='writeSpace'
        
            
            type='text'
            name='content'
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            placeholder='start writing!'
            >
                     
          
            
                     
        </textarea>
           
        </label>
            
          <p>     </p>
          <button onClick={handleSave}>
            
            Save
        
        </button>
             
             <button onClick={handlePost}>
            
                Post
            
            </button>
            
            <button onClick={handleBack}>back</button>
            
           
        </div>
    )
}
    


export default Write;