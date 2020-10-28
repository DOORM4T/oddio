import React from 'react'
import Header from '../components/Header'
import LoginForm from '../containers/LoginForm'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'

export default function Account() {
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
			console.log(user);
			// TODO: Create soundbird account, cookie auth upon sign in
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<article>
			<Header title="Login" icon="🔐" />
			<h1 style={{ textAlign: 'center' }}>Welcome back!</h1>
			<LoginForm />
			<div style={toggleSectionStyles}>
				<p style={{ marginRight: '1rem' }}>Don't have an account?</p>
				<Link to="/register" style={{ fontWeight: 'bolder', color: 'black' }}>
					Register
				</Link>
			</div>
			<div>or...</div>
			<button onClick={googleSignIn}>Sign in with Google</button>
		</article>
	)
}

const toggleSectionStyles = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '1rem',
	fontSize: '1.2rem',
}
