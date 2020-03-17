import React from 'react';
import NavBar from "./NavBar2"

import './Home.css';

function Home() {
    
    return (
        
        <div className="App" >
            <NavBar />
            <header className="App-header" >
                
                <img src={'/background2.jpg'} className="App-logo" alt="logo" /> 
                
                
            </header>
        </div>
    );
}

export default Home;
