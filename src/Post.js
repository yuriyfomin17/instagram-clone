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
                <h3> Username </h3>

            </div>

            <img className="post_image" src={image}/>
            <h4 className="post_text"><strong>nimofy</strong> Me visiting mountains</h4>
        </div>
    );
}

export default Post;
