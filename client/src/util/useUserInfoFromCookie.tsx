import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/globalContext'
import { loginUserAction, logoutUserAction } from '../context/globalActions'

export default function useUserInfoFromCookie(enableRedirect: boolean = false) {
	const { dispatch } = useContext(GlobalContext)
	const history = useHistory()

	useEffect(() => {
		if (!dispatch) return
		const username = document.cookie.slice('user='.length)
		if (!username) {
			if (enableRedirect) logout()
			return
		}

		console.log('updating')

		const getUserData = async () => {
			const response = await fetch(`/api/users/${username}`)
			const data = await response.json()
			if (response.status !== 200 || !data) {
				logout()
			}
			dispatch(loginUserAction(data))
		}
		getUserData()

		async function logout() {
			history.push('/login')
			if (dispatch) dispatch(logoutUserAction())
			if (username) await fetch('/auth/logout', { method: 'DELETE' })
			return
		}
	}, [])
}
