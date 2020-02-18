import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { decode } from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import AddSoundForm from '../containers/AddSoundForm'

export default function Dashboard() {
	const [userData, setUserData] = useState()
	const history = useHistory()

	useEffect(() => {
		if (!document.cookie) {
			history.push('/login')
			return
		}

		const decodedUserToken: any = decode(
			document.cookie.slice('authToken='.length)
		)
		const { username } = decodedUserToken

		async function getUserData() {
			const response = await fetch(`/api/users/${username}`)
			const data = await response.json()
			return data
		}
		getUserData().then((data) => {
			setUserData(() => data)
		})
	}, [])

	return (
		<article>
			<Header
				title={`${userData && userData.username}'s Dashboard`}
				icon="👤"
			/>
			<AddSoundForm />
		</article>
	)
}
