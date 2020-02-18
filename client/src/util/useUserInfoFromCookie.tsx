import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { decode } from 'jsonwebtoken'

export default function useUserInfoFromCookie() {
	const [userData, setUserData] = useState()
	const history = useHistory()

	useEffect(() => {
		const decodedUserToken: any = decode(
			document.cookie.slice('authToken='.length)
		)

		const { username } = decodedUserToken

		const getUserData = async () => {
			const response = await fetch(`/api/users/${username}`)
			const data = await response.json()
			if (!data) {
				await fetch('/auth/deleteauthcookie', { method: 'DELETE' })
				history.push('/login')
				return
			}
			setUserData(() => data)
		}
		getUserData()
	}, [])

	return [userData]
}
