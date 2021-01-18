import React, {useState} from "react";
import './App.css'
import instagramLogo from './static/instagram-logo.png'
import image from './static/image.png'
import Post from "./Post";

function App() {
    const [posts, setPosts] = useState([
        {
            username: "Yuriy",
            caption: "Visiting Mountain",
            image: image
        },
        {
            username: "Yuriy",
            caption: "Visiting Mountain",
            image: image
        },
        {
            username: "Yuriy",
            caption: "Visiting Mountain",
            image: image
        }
    ])

    return (
        <div className="app">
            <div className="app_header">
                <img
                    src={instagramLogo}
                    className="app_headerImage"
                />
            </div>
            <h1> Instagram clone</h1>
            {
                posts.map(post => (
                    <Post
                        username={post.username}
                        caption={post.caption}
                        image={post.image}
                    />
                ))
            }
            <Post username={"Yuriy"} caption={"Visiting Mountain"} image={image}/>
            <Post username={"Bohdan"} caption={"Looking yolo"} image={image}/>
            <Post username={"Piggy"} caption={"eating pizza"} image={image}/>


            {/*{Posts}*/}
            {/*{Posts}*/}
        </div>
    );
}

export default App;
