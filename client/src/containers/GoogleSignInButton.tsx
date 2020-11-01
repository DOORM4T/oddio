import React from 'react'
import Button from '../components/Button'
import firebase from 'firebase/app'
import 'firebase/auth'
import useUserInfoFromCookie from '../util/useUserInfoFromCookie'
import { auth } from '../App'

export default function GoogleSignInButton() {
	useUserInfoFromCookie(true)
	const provider = new firebase.auth.GoogleAuthProvider()
	const googleSignIn = async () => {
		try {
			const result = await auth.signInWithPopup(provider)
			if (!result.user || !auth.currentUser)
				throw new Error('User details unavailable.')

			/* check if user already exists (by email) */
			const { email } = result.user
			const firebaseAuthToken = await auth.currentUser.getIdToken()

			const isEmailRegisteredResponse = await fetch(`/api/users/email/${email}`)
			const isEmailRegistered:boolean = (await isEmailRegisteredResponse.json()).result

			/* register/sign in using Google Account details */
			const body = {
				firebaseAuthToken,
				email,
				displayName: '',
			}

			/* REPLACE WITH MODAL */
			/* user registers with a display name */
			/* skip if user is already registered */
			if (!isEmailRegistered) {
				console.log('Prompting')
				body.displayName =
					prompt('Complete Your registration: Enter Display Name:') || ''
				if (!body.displayName) {
					console.error('Failed registration.')
					return
				}
			}

			const bodyString = JSON.stringify(body)
			const action = '/auth/register'
			const method = 'POST'
			const response = await fetch(action, {
				method,
				body: bodyString,
				headers: {
					'Content-Type': 'application/json',
				},
			})
			if (response.status !== 200) {
				throw new Error('Failed to create new account with Google')
			}
			window.location.reload()
		} catch (error) {
			console.error(error)
			await auth.signOut()
		}
	}
	return <Button onClick={googleSignIn}>Sign in with Google</Button>
}
