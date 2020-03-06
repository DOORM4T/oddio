import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/globalContext'
import { loginUserAction } from '../context/globalActions'

export default function useUserInfoFromCookie(enableRedirect: boolean = false) {
	const { dispatch } = useContext(GlobalContext)
	const history = useHistory()

	useEffect(() => {
		if (!document.cookie) {
			if (enableRedirect) history.push('/login')
			return
		}

		console.log('updating')

		const username = document.cookie.slice('user='.length)
		const getUserData = async () => {
			const response = await fetch(`/api/users/${username}`)
			const data = await response.json()
			if (!data) {
				await fetch('/auth/deleteauthcookie', { method: 'DELETE' })
				history.push('/login')
				return
			}
			if (dispatch) dispatch(loginUserAction(data))
		}
		getUserData()
	}, [])
}
