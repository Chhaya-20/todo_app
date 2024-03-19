import React, { useState } from 'react'
import './home.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function home() {
  const [notes,setnotes]=useState([]);
  const[title,settitle]=useState("");
  const[desciption,setdisc]=useState("")

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');

  }

  const updated = async(id) => {
    const t = window.prompt("Enter new title");
    const d = window.prompt("Enter Description");
  
    try {
      const response = await fetch(`https://todobackend-1-osqq.onrender.com/api/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        
        body: JSON.stringify({ title: t, desciption: d })
      });
  
      console.log(response);
  
      if (!response.ok) {
        alert("Some Error Occured");
      }
      fetchData();
    } catch (error) {
      console.error("Internal Server Error", error);
    }
  }
  

  const AddNote=async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch('https://todobackend-1-osqq.onrender.com/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        
        body:JSON.stringify({title,desciption})
      });
      console.log(response)
      if (!response.ok) {
        alert("Some Error Occured")
      }
  settitle("");
  setdisc("");
      fetchData()
    } catch (error) {
      console.error("Internal Server Error", error);
    }

  }

  const deleted = async(id)=>{
    console.log(id)
    try {
      const response = await fetch(`https://todobackend-1-osqq.onrender.com/api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        
      });
      if (!response.ok) {
        alert("Some Error Occured")
      }
  
      const data = await response.json();
      console.log(data)
      setnotes(data.notes)
    } catch (error) {
      console.error("Internal Server Error", error);
    }

  }

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
        console.error("Token not found in localStorage");
        return;
    }

    try {
        const response = await fetch('https://todobackend-1-osqq.onrender.com/api/todo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            const data = await response.json();
            setnotes(data.notes);
        } else {
            console.error("Error fetching data:", response.statusText);
        }
    } catch (error) {
        console.error("Internal Server Error", error);
    }
}

  
  useEffect(() => {
    //console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token'))
    {
      fetchData();
    }
    else{
      console.log("vnkdvnekb")
      navigate('/login');
    }
    
  }, []);
  
  return (
    <>
    <div id='home'>
      <button onClick={logout} className="btn btn-primary my-3 logoutbtn">Logout</button>
      <div className="h">

      
      <h1 className='text-center'>Add Note</h1>
      <form>
  <div className="form-group my-3">
    <label htmlFor="title">Title</label>
    <input type="text" value={title} onChange={(e)=>{settitle(e.target.value)}} className="form-control" id="title" placeholder="Enter title"/>
   </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" value={desciption} onChange={(e)=>{setdisc(e.target.value)}}  className="form-control" id="description" placeholder="Enter Desciption"/>
  </div>
  
  <button type="submit" onClick={AddNote} className="btn btn-primary my-3">Add Note</button>

</form>
</div>
</div>
<div id="note">
  {notes.length!=0 && (
    <>
      <h1 className='text-center'> Your Notes</h1>
      {notes.map(note => (
        <div key={note._id} className="card" style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.desciption}</p>
            {/* <button type="button"><i className="bi bi-trash3-fill"></i>
</button> */}
<button type="button" onClick={()=>deleted(note._id)} className='mr-3'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg></button>

            <button type="button" onClick={()=>updated(note._id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg></button>
          </div>
        </div>
      ))}
    </>
  )}
</div>

    </>
  )
}

export default home

