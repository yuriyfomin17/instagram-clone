import React, {useState, useEffect} from "react";
import './App.css'
import instagramLogo from './static/instagram-logo.png'
import {makeStyles} from '@material-ui/core/styles';
import Post from "./Post";
import {db} from './Firebse'
import Modal from '@material-ui/core/Modal';
import {Button, Input} from "@material-ui/core";

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

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const signUp = (event) => {

    }

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
                onClose={() => setOpen(false)}

            >
                <div style={modalStyle} className={classes.paper}>

                    <form className="app_signup">
                        <center>

                            <img
                                src={instagramLogo}
                                className="app_headerImage"
                                alt=""
                            />
                        </center>

                        <Input
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button onClick={signUp}>Sign Up</Button>
                    </form>


                </div>


            </Modal>

            <div className="app_header">
                <img
                    src={instagramLogo}
                    className="app_headerImage"
                    alt=""
                />

            </div>
            <Button onClick={() => setOpen(true)}> Sign Up</Button>
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
