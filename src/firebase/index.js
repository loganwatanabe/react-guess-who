import React from 'react';
import firebase from 'firebase';
import "firebase/firestore";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


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

const uiConfig = {
	//autoUpgradeAnonymousUsers

	//callbacks

	//credentialHelper

	//queryParameterForSignInSuccessUrl

	//queryParameterForSignInSuccessUrl

	//queryParameterForWidgetMode

	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',

	//immediateFederatedRedirect

	//tosUrl

	//privacyPolicyUrl

	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/signedIn',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID
	]
};



let db = firebase.firestore()

let auth = <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>


export default {
  firebase, db, auth
}