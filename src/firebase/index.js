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

var db = firebase.firestore();


// if (location.hostname === "localhost") {
// 	console.log("localhost")
  // db.settings({
  //   host: "localhost:8080",
  //   ssl: false
  // });
// }

const accountsRef = db.collection('accounts')

const uiConfig = {
	//autoUpgradeAnonymousUsers

	callbacks: {
	    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			// User successfully signed in.

			// here, we will check if an account doc exists for the user, if not, create it
			console.log(authResult)
			console.log(authResult.user.uid)

			let test = accountsRef.doc(authResult.user.uid).get()

			console.log(test)

			const res2 = accountsRef.doc(authResult.user.uid).set({
				lastLogin: firebase.firestore.Timestamp.now()
			}, { merge: true }).then(res => {
				console.log(res)
				return false
			})

			


		    // Return type determines whether we continue the redirect automatically to /signedin
		    // or whether we leave that to developer to handle.
		    return false
	    },
	    uiShown: function() {
	      // The widget is rendered.
	      // custom code here (remove loading icon, etc)
	    }
	},

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
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		{
	      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
	      requireDisplayName: false
	    }
	]
};



// let db = firebase.firestore()

// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     // console.log(user)
//     //user.uid
//   } else {
//     // No user is signed in.
//     // console.log("no user")
//   }
// });

let signin = <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
let signout = function(){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		console.log("logged out")
	}, function(error) {
		// An error happened.
		console.log("error in logging out")
	}); 
}

let checkAuth = function(setUser){
	return firebase.auth().onAuthStateChanged((uzer) => { // detaching the listener
        if (uzer) {
            // ...your code to handle authenticated users.
          setUser(uzer)
        } else {
            // No user is signed in...code to handle unauthenticated users.
            console.log("no uzer")
        }
    });
}

let getCurrentUser = function(){ return firebase.auth().currentUser }

export default {
  firebase, db, signin, getCurrentUser, signout, checkAuth
}