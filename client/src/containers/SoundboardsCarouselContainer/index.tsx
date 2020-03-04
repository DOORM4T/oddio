import React, { useState, useEffect, useRef, useContext } from 'react'
import useUserInfoFromCookie, {
	Soundboard,
	User,
} from '../../util/useUserInfoFromCookie'
import Sound from '../../util/sound'
import playSound from '../../util/playSound'
import Carousel from '../../components/Carousel'
import styles from './Soundboards.module.scss'
import Spinner from '../../components/Spinner'

interface SoundBoardProps {
	reactToTriggers: boolean
}

export default function SoundBoards({ reactToTriggers }: SoundBoardProps) {
	const [userInfo] = useUserInfoFromCookie()
	const [soundboardSoundData, setSoundboardSoundData] = useState<
		SoundboardSounds[]
	>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		if (userInfo.soundboards.length === 0) return
		setIsLoading(true)
		userInfo.soundboards.forEach((soundboard, index) => {
			if (!soundboard.sounds || soundboard.sounds.length === 0) return
			const soundsDataPromises = soundboard.sounds.map((soundId) =>
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
	}, [userInfo])

	return (
		<section>
			{!isLoading ? (
				userInfo.soundboards.map((soundBoard) => {
					return (
						<div
							className={styles.soundboard}
							key={soundBoard._id}
							data-aos="fade-right"
						>
							<button
								onClick={function(e: any) {
									e.target.classList.toggle(styles.expanded)
								}}
								className={styles.dropdown}
							>
								<span>{soundBoard.sounds.length}</span>
								{soundBoard.name}
							</button>

							<hr />
							<div>
								{soundBoard.sounds.length > 0 ? (
									SoundsList(soundboardSoundData, soundBoard, userInfo)
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
	userInfo: User
) {
	const soundboard = soundboardSoundData.find(
		(soundboardSounds) => soundboardSounds.soundboardName === soundBoard.name
	)

	const { username } = userInfo

	if (!soundboard || !username) return null
	const deleteFromSoundboard = (soundId: string) => {
		return async () => {
			const body = JSON.stringify({ soundId })
			const response = await fetch(
				`/api/users/${username}/soundboards/${soundBoard._id}/deletesound`,
				{
					method: 'DELETE',
					body,
					headers: { 'Content-Type': 'application/json' },
				}
			)
			if (response.status === 200) window.location.reload()
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
							<button onClick={() => playSound(sound.sourceId)}>
								<span role="img" aria-label="Play sound">
									🔊
								</span>
							</button>
						</div>
						<button onClick={deleteFromSoundboard(sound._id)}>
							<span role="img" aria-label="Remove from soundboard">
								❌
							</span>
						</button>
					</div>
				</li>
			))}
		/>
	)
}