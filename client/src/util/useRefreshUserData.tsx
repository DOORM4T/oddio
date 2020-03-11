import { useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import { setUserAction } from '../context/globalActions'

export default function useRefreshUserData() {
	const { globalState, dispatch } = useContext(GlobalContext)
	const username = globalState?.user.username

	const refreshUserData = async () => {
		const response = await fetch(`/api/users/${username}`)
		const data = await response.json()
		if (!data || response.status !== 200 || !dispatch) return
		dispatch(setUserAction(data))
	}

	return refreshUserData
}
