import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAaij7xPyefcvtR3Y2I2bei1k6zfPK2ls4",
    authDomain: "instagram-clone-4069e.firebaseapp.com",
    projectId: "instagram-clone-4069e",
    storageBucket: "instagram-clone-4069e.appspot.com",
    messagingSenderId: "1036493916326",
    appId: "1:1036493916326:web:da23abad1c35cc166e8c67",
    measurementId: "G-16TRDCLGT9"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}
