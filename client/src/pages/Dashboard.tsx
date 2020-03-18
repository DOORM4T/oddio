import React, { useContext, StyleHTMLAttributes } from 'react'
import Header from '../components/Header'
import AddSoundForm from '../containers/AddSoundForm'
import SoundCarouselContainer from '../containers/SoundCarouselContainer'
import CreateSoundboardFormContainer from '../containers/CreateSoundboardFormContainer'
import SoundBoards from '../containers/SoundboardsCarouselContainer/index'
import Spacing from '../components/Spacing'
import { GlobalContext } from '../context/globalContext'
import useUserInfoFromCookie from '../util/useUserInfoFromCookie'
import { toggleEditingDashboardAction } from '../context/globalActions'

export default function Dashboard() {
	useUserInfoFromCookie(true)

	const { globalState } = useContext(GlobalContext)
	if (!globalState?.user) return null

	return (
		<>
			<article>
				<Header title="Dashboard" icon="👤" />
				<section>
					<h1>My Soundboards</h1>
					<SoundBoards />
					<CreateSoundboardFormContainer />
				</section>
				<Spacing spaces={5} />
				<hr />
				<Spacing spaces={2} />
				<section>
					<h1>My Sounds</h1>
					{globalState.user.username && (
						<SoundCarouselContainer
							query={`author=${globalState.user.username}`}
							showCreatorActions={globalState.editingDashboard}
							showAddToSoundboard={true}
						/>
					)}
				</section>
				<Spacing spaces={2} />
				<section>
					<h1>Favorites</h1>
					{globalState.user.soundsFamed.length > 0 && (
						<SoundCarouselContainer
							list={globalState.user.soundsFamed}
							showAddToSoundboard={true}
						/>
					)}
				</section>
				<Spacing spaces={5} />
				<hr />
				<Spacing spaces={5} />
				<section>
					<h1 id="upload" style={{ textAlign: 'center' }}>
						Upload a Sound
					</h1>
					<Spacing spaces={2} />
					<AddSoundForm />
				</section>
				<Spacing spaces={2} />
			</article>
			<EditButton />
		</>
	)
}

function EditButton() {
	const { globalState, dispatch } = useContext(GlobalContext)
	if (!dispatch || !globalState) return null

	const styles: React.CSSProperties = {
		bottom: '1rem',
		right: '7rem',
		position: 'fixed',
		width: '50px',
		height: '50px',
		boxShadow: '0 4px 4px black',
		color: 'white',
		backgroundColor: 'royalblue',
		fontSize: '2rem',
		zIndex: 9999,
		display: 'flex',
		justifyContent: 'center',
	}

	const toggleEditMode = () => {
		dispatch(toggleEditingDashboardAction())
	}

	return (
		<button onClick={toggleEditMode} style={styles}>
			<span role="img" aria-label="edit">
				✏
			</span>
		</button>
	)
}
