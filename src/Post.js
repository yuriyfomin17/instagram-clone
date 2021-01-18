import React from 'react';
import image from './static/image.png'
import avatar from './static/avatar.png'
import './Post.css'
import Avatar from "@material-ui/core/Avatar";

function Post() {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt='Yuriy Fomin'
                    src={avatar}
                />
            </div>

            <h3> Username </h3>
            {/*{header->avatar + username}*/}
            <img className="post_image" src={image}/>
            {/*{image}*/}
            <h4 className="post_text"><strong>nimofy</strong> Me visiting mountains</h4>
            {/*{username + caption}*/}
        </div>
    );
}

export default Post;
