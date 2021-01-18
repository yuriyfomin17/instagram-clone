import React, {useState, useEffect} from "react";
import './App.css'
import instagramLogo from './static/instagram-logo.png'
import { makeStyles } from '@material-ui/core/styles';
import Post from "./Post";
import {db} from './Firebse'
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
function App() {
    const classes = useStyles();
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [modalStyle] = useState(getModalStyle);


    // useEffect runs specific code based on the specific condition

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            // every time a new post is added , this code fires
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })
    }, [])
    return (
        <div className="app">
            <Modal
                open={open}
                onClose={()=>setOpen(false)}

            >
                <div style={modalStyle} className={classes.paper}>
                    <h2> I am model</h2>
                </div>

            </Modal>

            <div className="app_header">
                <img
                    src={instagramLogo}
                    className="app_headerImage"
                />
            </div>
            <Button onClick={()=>setOpen(true)}> Sign Up</Button>
            <h1> Instagram clone</h1>
            {
                posts.map(({id, post}) => (
                    // keys allows to refresh only unique post
                    <Post
                        key={id}
                        username={post.username}
                        caption={post.caption}
                        image={post.image}
                    />
                ))
            }
        </div>

    );
}

export default App;
