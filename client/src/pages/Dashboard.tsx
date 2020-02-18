import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import AddSoundForm from '../containers/AddSoundForm'
import useUserInfoFromCookie from '../util/useUserInfoFromCookie'

export default function Dashboard() {
	const [userInfo] = useUserInfoFromCookie(true)
	// const [mySounds, setMySounds] = useState()
	// const [soundsILike, setSoundsILike] = useState()

	// useEffect(() => {
	// 	const mySoundsPromises = userInfo.sounds.map((soundId) =>
	// 		fetch(`/api/sounds/${soundId}`)
	// 	)
	// 	Promise.all(mySoundsPromises)
	// 		.then((res) =>
	// 			res.forEach((response) => {
	// 				return response.json()
	// 			})
	// 		)
	// 		.then(console.log)
	// }, [userInfo])

	return (
		<article>
			<Header title="Dashboard" icon="👤" />
			<AddSoundForm />
			<section>
				<h1>My Sounds</h1>
			</section>
			<section>
				<h1>Favorites</h1>
			</section>
		</article>
	)
}
