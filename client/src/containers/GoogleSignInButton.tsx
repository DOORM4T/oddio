import React from 'react'
import Button from '../components/Button'
import firebase from 'firebase/app'
import 'firebase/auth'

/* TODO: CREATE SEPARATE COMPONENT */
const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyARhiq8bCSDSXEcl3RLHtC2uQbprI6U854',
	authDomain: 'soundbird-63117.firebaseapp.com',
	databaseURL: 'https://soundbird-63117.firebaseio.com',
	projectId: 'soundbird-63117',
	storageBucket: 'soundbird-63117.appspot.com',
	messagingSenderId: '263610642754',
	appId: '1:263610642754:web:04c694294a4ad2d4cb98db',
})
const auth = firebase.auth()

export default function GoogleSignInButton() {
	auth.onAuthStateChanged((user) => {
		if (user) {
			alert('Signed in.')
		} else {
			alert('No user signed in.')
		}
	})

	const provider = new firebase.auth.GoogleAuthProvider()
	const googleSignIn = async () => {
		try {
			const result = await auth.signInWithPopup(provider)
			const user = result.user
			console.log(user)
			// TODO: Create SoundBird account, cookie auth upon sign in
		} catch (error) {
			console.error(error)
		}
	}
	return <Button onClick={googleSignIn}>Sign in with Google</Button>
}
