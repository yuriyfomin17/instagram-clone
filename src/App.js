import React, {useState, useEffect} from "react";
import './App.css'
import instagramLogo from './static/instagram-logo.png'
import {makeStyles} from '@material-ui/core/styles';
import Post from "./Post";
import {db, auth} from './Firebse'
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
    const [openSingIn, setOpenSignIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState(null)

    const signUp = (event) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
            return authUser.user.updateProfile({
                displayName: username
            })
        })
            .catch((error) => alert(error.message))
    }
    const signIn = (event) => {
        event.preventDefault()
        setPassword('')
        setEmail('')
        auth.signInWithEmailAndPassword(email, password).catch((error)=>{
            alert(error.message)
        })
        setOpenSignIn(false)
    }
    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in...
                console.log(authUser)
                // cookie tracking => hence even if you refresh you still logged in
                setUser(authUser)
            } else {
                // if user is logged out...
                setUser(null)
            }

        })
        // changed user=> then perform clean up before firing useEffect again
        // say we changed user ten times => without clean up we would have 10 listeners
        return () => {
            // perform some cleanup actions
            unsubscribe();
        }
    }, [user, username])

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
            <Modal
                open={openSingIn}
                onClose={() => setOpenSignIn(false)}
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

                        <Button onClick={signIn}>Sign In</Button>
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
            {user ? (<Button onClick={() => auth.signOut()}> Log Out</Button>) :
                <div className="login_container">
                    <Button onClick={() => setOpenSignIn(true)}> Sign In</Button>
                    <Button onClick={() => setOpen(true)}> Sign Up</Button>
                </div>

            }
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
