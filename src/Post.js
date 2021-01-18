import React from 'react';
import avatar from './static/avatar.png'
import './Post.css'
import Avatar from "@material-ui/core/Avatar";

function Post({username, caption, image}) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt='Yuriy Fomin'
                    src={avatar}
                />
                <h3> {username} </h3>

            </div>

            {/*{header->avatar + username}*/}
            <img className="post_image" src={image}/>
            {/*{image}*/}
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
            {/*{username + caption}*/}
        </div>
    );
}

export default Post;
