import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "form-1de97.firebaseapp.com",
    projectId: "form-1de97",
    storageBucket: "form-1de97.appspot.com",
    messagingSenderId: "970815662025",
    appId: "1:970815662025:web:3e1e35881d1d19cee36a18",
    measurementId: "G-M48QBR49T8"
})

const firestore = firebase.firestore();
export const database = {
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
}
export const storage = firebase.storage()
export const auth = firebase.auth();
export default firebase
