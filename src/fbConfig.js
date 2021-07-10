import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCxkttBJ9nWGXWR8Bu6p0WAoHqgcgJlFnc",
  authDomain: "form-1de97.firebaseapp.com",
  projectId: "form-1de97",
  storageBucket: "form-1de97.appspot.com",
  messagingSenderId: "970815662025",
  appId: "1:970815662025:web:3e1e35881d1d19cee36a18",
  measurementId: "G-M48QBR49T8"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export const database = {
  folders: firestore.collection('folders'),
  files: firestore.collection('files'),
  formatDoc: doc => {
    return {id: doc.id, ...doc.data()}
  },
  timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
}
export const auth = firebase.auth();
