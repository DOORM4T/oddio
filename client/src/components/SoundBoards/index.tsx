import React, { useState, useEffect, useRef, useContext } from 'react'
import useUserInfoFromCookie, {
	Soundboard,
} from '../../util/useUserInfoFromCookie'
import Sound from '../../util/sound'
import styles from './SoundBoards.module.scss'
import playSound from '../../util/playSound'

interface SoundBoardProps {
	reactToTriggers: boolean
}

export default function SoundBoards({ reactToTriggers }: SoundBoardProps) {
	const [userInfo] = useUserInfoFromCookie()
	const [soundboardSoundData, setSoundboardSoundData] = useState<
		SoundboardSounds[]
	>([])

	useEffect(() => {
		if (userInfo.soundboards.length === 0) return
		userInfo.soundboards.forEach((soundboard) => {
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
	}, [userInfo])

	return (
		<aside>
			<h1>Soundboards</h1>
			{userInfo.soundboards.map((soundBoard) => {
				return (
					<div key={soundBoard._id}>
						<h2>{soundBoard.name}</h2>
						{SoundsListFromSoundboardName(soundboardSoundData, soundBoard.name)}
					</div>
				)
			})}
		</aside>
	)
}

interface SoundboardSounds {
	soundboardName: string
	sounds: Sound[]
}

function SoundsListFromSoundboardName(
	soundboardSoundData: SoundboardSounds[],
	soundboardName: string
) {
	const soundboard = soundboardSoundData.find(
		(soundboardSounds) => soundboardSounds.soundboardName === soundboardName
	)
	if (!soundboard) return null

	const sounds = soundboard.sounds
	return (
		<ul className={styles['soundboard-list']}>
			{sounds.map((sound, index) => (
				<li key={`${soundboardName}-list-item-${sound._id}-${index}`}>
					<div className={styles['soundboard-list-sound']}>
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
								<span role="img" aria-label="Remove from soundboard">
									🔊
								</span>
							</button>
						</div>
						<button>
							<span role="img" aria-label="Remove from soundboard">
								❌
							</span>
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}
