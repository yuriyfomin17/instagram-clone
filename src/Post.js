import React, {useEffect, useState} from 'react';
import avatar from './static/avatar.png'
import './Post.css'
import Avatar from "@material-ui/core/Avatar";
import {db} from './Firebse'
import firebase from "firebase"

function Post({postId, user, username, caption, image}) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])
    const postComment = (event) => {
        event.preventDefault()
        db.collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                comment: comment,
                username: user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            }).catch((err)=>{
                alert(err)
        })
        setComment('')
    }
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt='user'
                    src={avatar}
                />
                <h3> {username} </h3>

            </div>

            {/*{header->avatar + username}*/}
            <img className="post_image" src={image}/>
            {/*{image}*/}
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
            <div className="post_comments">
                {
                    comments.map((comment) => (
                        <p>
                            <strong>{comment.username}</strong> {comment.comment}
                        </p>
                    ))
                }
            </div>

            <form className="post_commentBox">
                <input
                    className="post_input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={event => setComment(event.target.value)}
                />
                <button
                    className="post_button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default Post;
