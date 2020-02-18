import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { decode } from 'jsonwebtoken'

export default function useUserInfoFromCookie() {
	const [userData, setUserData] = useState()
	const history = useHistory()

	useEffect(() => {
		if (!document.cookie) {
			// Redirect to login page if user isn't signed in
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

	return [userData]
}
