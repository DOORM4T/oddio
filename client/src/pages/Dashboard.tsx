import React, { useContext } from 'react'
import Header from '../components/Header'
import { GlobalContext } from '../context/globalContext'
import { loginUserAction } from '../context/globalActions'

export default function Dashboard() {
	const { globalState, dispatch } = useContext(GlobalContext)
	return (
		<article>
			<Header title="Dashboard" icon="👤" />
			<h1>{globalState && globalState.user.name}</h1>
			<button
				onClick={() => {
					dispatch && dispatch(loginUserAction('Steven'))
				}}
			>
				Test
			</button>
		</article>
	)
}
