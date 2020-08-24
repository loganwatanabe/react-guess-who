import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



import * as firebase from "firebase/app";
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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
