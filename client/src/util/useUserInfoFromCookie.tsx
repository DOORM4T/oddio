import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { decode } from 'jsonwebtoken'

export default function useUserInfoFromCookie(enableRedirect: boolean = false) {
	const [userData, setUserData] = useState<User>({
		_id: '',
		email: '',
		joined: '',
		private: true,
		sounds: [],
		soundsFamed: [],
		username: '',
	})
	const history = useHistory()

	useEffect(() => {
		if (!document.cookie) {
			if (enableRedirect) history.push('/login')
			return
		}

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

type User = {
	_id: string
	username: string
	soundsFamed: string[]
	sounds: string[]
	private: boolean
	email: string
	joined: string
}
