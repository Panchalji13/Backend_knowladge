import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Home =()=>{
    const navigate = useNavigate();
    const HendelLogout = () =>{
        navigate("/Login")
    }

    return (
       <div>
         <h1 >hello Home</h1>

        <button onClick={HendelLogout}>logout</button>
       </div>
    );
}
export default Home;