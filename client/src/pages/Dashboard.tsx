import React from 'react'
import Header from '../components/Header'
import AddSoundForm from '../containers/AddSoundForm'
import SoundCarouselContainer from '../containers/SoundCarouselContainer'
import CreateSoundboardFormContainer from '../containers/CreateSoundboardFormContainer'
import SoundBoards from '../components/SoundBoards'
import Spacing from '../components/Spacing'
import useUserInfoFromCookie from '../util/useUserInfoFromCookie'

export default function Dashboard() {
	const [userInfo] = useUserInfoFromCookie(true)

	return (
		<article>
			<Header title="Dashboard" icon="👤" />
			<AddSoundForm />
			<Spacing spaces={15} />
			<section>
				<h1>My Soundboards</h1>
				<SoundBoards reactToTriggers={false} />
				<CreateSoundboardFormContainer />
			</section>
			<Spacing spaces={15} />
			<section>
				<h1>My Sounds</h1>
				<SoundCarouselContainer />
			</section>
			<Spacing spaces={2} />
			<section>
				<h1>Favorites</h1>
				<SoundCarouselContainer />
			</section>
			<Spacing spaces={2} />
		</article>
	)
}
