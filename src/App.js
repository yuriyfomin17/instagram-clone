import React from "react";
import './App.css'
import instagramLogo from './static/instagram-logo.png'
import Post from "./Post";
function App() {
    return (
        <div className="app">
            <div className="app_header">
                <img
                    src={instagramLogo}
                    className="app_headerImage"
                />
            </div>
            <h1> Instagram clone</h1>
            <Post/>
            {/*{Posts}*/}
            {/*{Posts}*/}
        </div>
    );
}

export default App;
