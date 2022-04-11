import React from 'react';
import firebase from 'firebase';
import "firebase/firestore";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {useHistory} from "react-router-dom";



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
			console.log("boo")

			// here, we will check if an account doc exists for the user, if not, create it
			console.log(authResult)
			console.log(authResult.user.uid)

			let test = accountsRef.doc(authResult.user.uid).get()

			console.log(test)

			const res2 = accountsRef.doc(authResult.user.uid).set({
				lastLogin: firebase.firestore.Timestamp.now()
			}, { merge: true }).then(res => {
				console.log(res)
				return true
			})

			


		    // Return type determines whether we continue the redirect automatically to /signedin
		    // or whether we leave that to developer to handle.
		    return true
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
	signInSuccessUrl: '/myaccount',

	// We will display Google and Facebook as auth providers.
	signInOptions: [
		{
	      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	      scopes: [
	        'https://www.googleapis.com/auth/contacts.readonly'
	      ]
	    },
		{
			provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	      	scopes: [
		        'public_profile',
		        'email',
		        'user_friends'
		    ]
	    },
		{
	      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
	      requireDisplayName: false
	    }
	]
};



// let db = firebase.firestore()

let onAuthStateChanged = firebase.auth().onAuthStateChanged


let createNewUser = function(userObj, callback){
	const name = userObj.name
    const email = userObj.email
    const password = userObj.password

    if(name && email && password){
		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(response){
	      // if(response.additionalUserInfo.isNewUser){
	      	console.log("response")
			console.log(response)

	      if(response.user && response.additionalUserInfo.isNewUser){
	      	//add display name to the user doc
	      	response.user.updateProfile({displayName: name}).then(function(){
		        response.user.sendEmailVerification().then(function(){
			        // Email sent.

			        //create account document, and set name
			    	const newAccount = accountsRef.doc(response.user.uid).set({
						lastLogin: firebase.firestore.Timestamp.now(),
						name: name,
						email: email
					}, { merge: true }).then(res => {
						console.log("account create success")
						console.log(res)
						callback()
					})
		        }).catch(function(error) {
		          // An error happened.
		          console.log("email verification failed")
		          console.log(error)
		        });
	      	}).catch(function(error){
	      		console.log('updateProfile failed')
	      		console.log(error)
	      	})
	      }

	    }).catch(function(error) {
	      // Handle Errors here.
	      var errorCode = error.code;
	      var errorMessage = error.message;
	      if (errorCode == 'auth/weak-password') {
	        alert('The password is too weak.');
	      } else {
	        alert(errorMessage);
	      }
	      console.log(error);
	    })
	}else{
		console.log("need name, email, and password")
	}
}

let login = function(email, password, callback){

	firebase.auth().signInWithEmailAndPassword(email,password).then(response => {
		console.log("login success")
		console.log(response)
		callback(response)
	}).catch(error => {
		console.log("login error")
		console.log(error)
		callback(error)
	})
}

let signin = <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
let signout = function(callback){
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		console.log("logged out")
		callback()
	}, function(error) {
		// An error happened.
		console.log("error in logging out")

	}); 
}

let auth = firebase.auth()

let checkAuth = function(setUser){
	return firebase.auth().onAuthStateChanged((uzer) => { // detaching the listener
        if (uzer) {
            // ...your code to handle authenticated users.
          setUser(uzer)
        } else {
        	setUser(null)
            // No user is signed in...code to handle unauthenticated users.
            console.log("no uzer")
        }
    });
}

let resetPassword = function(email, callback){
	if(email){//validate email address format here
		firebase.auth().sendPasswordResetEmail(email).then(function(response) {
		  // Email sent.
		  console.log("pw reset success")
		  console.log(response)
		  callback(response)
		}).catch(function(error) {
		  // An error happened.
		  console.log("pw reset error")
		  console.log(error)
		  callback(error)
		});
	}else{
		callback(false)
	}
	
}

let getCurrentUser = function(){ return firebase.auth().currentUser }

export default {
  firebase, db, signin, getCurrentUser, signout, checkAuth, auth, createNewUser, login, resetPassword
}