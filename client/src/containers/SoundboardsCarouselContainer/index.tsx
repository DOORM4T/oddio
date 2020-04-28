import React, { useState, useEffect, useContext, useRef } from 'react'
import playSound from '../../util/playSound'
import Carousel from '../../components/Carousel'
import styles from './Soundboards.module.scss'
import Spinner from '../../components/Spinner'
import { Soundboard } from '../../util/types/Soundboard.type'
import { User } from '../../util/types/User.type'
import { Sound } from '../../util/types/Sound.type'
import { GlobalContext } from '../../context/globalContext'
import useRefreshUserData from '../../util/useRefreshUserData'
import { setSoundsToLivePlayAction } from '../../context/globalActions'
import { globalStateReducer } from '../../context/globalReducer'

export default function SoundBoards() {
	const refreshUserData = useRefreshUserData()
	const { globalState, dispatch } = useContext(GlobalContext)
	const soundboards = globalState?.user.soundboards

	const [soundboardSoundData, setSoundboardSoundData] = useState<
		SoundboardSounds[]
	>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!soundboards || soundboards.length === 0) return
		setIsLoading(true)
		soundboards.forEach((soundboard) => {
			if (!soundboard.sounds || soundboard.sounds.length === 0) return
			const soundsDataPromises = soundboard.sounds.map((soundId: any) =>
				fetch(`/api/sounds/${soundId}`, {
					headers: { 'Content-Type': 'application/json' },
				})
			)
			Promise.all(soundsDataPromises)
				.then((responses) =>
					Promise.all(responses.map((response) => response.json()))
				)
				.then((data) => {
					setSoundboardSoundData((prevSoundboardSoundData) => [
						...prevSoundboardSoundData.filter(
							(soundboardData) =>
								soundboardData.soundboardName !== soundboard.name
						),
						{ soundboardName: soundboard.name, sounds: data },
					])
				})
		})
		setIsLoading(false)
	}, [soundboards])

	const deleteSoundboard = ({ name, _id }: Soundboard) => {
		return async () => {
			const confirmed = window.confirm(
				`Delete soundboard: ${name.toUpperCase()}?`
			)
			if (!confirmed) return

			const route = `/api/users/${globalState?.user.username}/soundboards/${_id}/deletesoundboard`
			const response = await fetch(route, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})

			if (response.status === 200) refreshUserData()
		}
	}

	// Store sound data from soundboard in globalState for live playing
	const livePlay = (soundboardSoundIds: string[]) => {
		return () => {
			const soundPromises = soundboardSoundIds.map((soundId) =>
				fetch(`/api/sounds/${soundId}`)
			)
			Promise.all(soundPromises)
				.then((responses) =>
					Promise.all(responses.map((response) => response.json()))
				)
				.then((data) => {
					if (dispatch) dispatch(setSoundsToLivePlayAction(data))
				})
		}
	}

	return (
		<section>
			{!isLoading && soundboards ? (
				soundboards.map((soundBoard) => {
					return (
						<div
							className={styles.soundboard}
							key={soundBoard._id}
							data-aos="fade-right"
						>
							{globalState?.editingDashboard && (
								<button
									onClick={deleteSoundboard(soundBoard)}
									className={styles.deletebutton}
								>
									<span role="img" aria-label="Delete Soundboard">
										❌
									</span>
								</button>
							)}
							<button onClick={livePlay(soundBoard.sounds)}>
								<span role="img" aria-label="Live play">
									👂
								</span>
							</button>
							<button
								onClick={function (e: any) {
									e.target.classList.toggle(styles.expanded)
								}}
								className={styles.dropdown}
							>
								<span>{soundBoard.sounds.length}</span>
								{soundBoard.name}
							</button>
							<div>
								{soundBoard.sounds.length > 0 ? (
									SoundsList(soundboardSoundData, soundBoard, globalState?.user)
								) : (
									<p>There's nothing here... yet!</p>
								)}
							</div>
						</div>
					)
				})
			) : (
				<Spinner icon="🐧" />
			)}
		</section>
	)
}

interface SoundboardSounds {
	soundboardName: string
	sounds: Sound[]
}

function SoundsList(
	soundboardSoundData: SoundboardSounds[],
	soundBoard: Soundboard,
	userInfo: User | undefined
) {
	const refreshUserData = useRefreshUserData()
	const { globalState } = useContext(GlobalContext)

	const soundboard = soundboardSoundData.find(
		(soundboardSounds) => soundboardSounds.soundboardName === soundBoard.name
	)

	const username = userInfo?.username

	if (!soundboard || !username) return null
	const deleteFromSoundboard = (soundId: string) => {
		return async () => {
			const confirmed = window.confirm('Delete sound from soundboard?')
			if (!confirmed) return

			const body = JSON.stringify({ soundId })
			const response = await fetch(
				`/api/users/${username}/soundboards/${soundBoard._id}/deletesound`,
				{
					method: 'DELETE',
					body,
					headers: { 'Content-Type': 'application/json' },
				}
			)
			if (response.status === 200) refreshUserData()
		}
	}

	return (
		<Carousel
			items={soundboard.sounds.map((sound, index) => (
				<li key={`${soundBoard.name}-list-item-${sound._id}-${index}`}>
					<div>
						<div>
							<p>{sound.name}</p>
							<p>Author: {sound.author}</p>
							<p>Category: {sound.category}</p>
							<p>Created: {new Date(sound.created).toDateString()}</p>
							<p>{sound.description}</p>
							<p>Fame: {sound.fame}</p>
							{sound.triggers.length > 0 ? (
								<p>{sound.triggers.join(', ')}</p>
							) : null}
						</div>
						<div
							style={{
								display: 'flex',
								width: '100%',
								justifyContent: 'center',
							}}
						>
							<button onClick={() => playSound(sound.sourceId)}>
								<span role="img" aria-label="Play sound">
									🔊
								</span>
							</button>
							{globalState?.editingDashboard && (
								<button onClick={deleteFromSoundboard(sound._id)}>
									<span role="img" aria-label="Remove from soundboard">
										❌
									</span>
								</button>
							)}
						</div>
					</div>
				</li>
			))}
		/>
	)
}
