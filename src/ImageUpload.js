import React, {useState} from 'react';
import {Button, Input} from "@material-ui/core";
import {storage, db} from "./Firebse";
import firebase from "firebase";

function ImageUpload({username}) {
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')
    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        // load bar
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function ....
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                //Error  function
                console.log(error)
                alert(error.message)
            },
            () => {
                // complete function
                // we uploaded our picture into databse
                // but we need to get it from it
                // hence  we download picture by new URL
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside db
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })
                        setProgress(0)
                        setCaption('')
                        setImage(null)
                    })
            }
        )
    }
    return (
        <div>
            <h1>abc</h1>
            {/*{Caption input}*/}
            {/*{File picker}*/}
            {/*{Post button}*/}
            <progress value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)}/>

            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    );
}

export default ImageUpload;