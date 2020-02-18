import React from 'react'
import Header from '../components/Header'
import AddSoundForm from '../containers/AddSoundForm'
import useUserInfoFromCookie from '../util/useUserInfoFromCookie'

export default function Dashboard() {
	const [userInfo] = useUserInfoFromCookie()

	return (
		<article>
			<Header
				title={`${userInfo && userInfo.username}'s Dashboard`}
				icon="👤"
			/>
			<AddSoundForm />
		</article>
	)
}
