import firebase from 'firebase';
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBw4RzXCubI9uc8xnBKUF2u1TTyRW0R5jE",
  authDomain: "guesswhomreact.firebaseapp.com",
  databaseURL: "https://guesswhomreact.firebaseio.com",
  projectId: "guesswhomreact",
  storageBucket: "guesswhomreact.appspot.com",
  messagingSenderId: "497055407093",
  appId: "1:497055407093:web:a558bf19554d8dbcd19ebc",
  measurementId: "G-J2XX384WW3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore()


export default {
  firebase, db
}