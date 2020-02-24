import React, { useState, useEffect, useRef, useContext } from 'react'
import useUserInfoFromCookie from '../../util/useUserInfoFromCookie'
import Sound from '../../util/sound'

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
					setSoundboardSoundData([
						...soundboardSoundData.filter(
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
						<ul>
							<li>
								{soundboardSoundData.some(
									(soundboardData) =>
										soundboardData.soundboardName === soundBoard.name
								) ? (
									<div>
										{JSON.stringify(
											soundboardSoundData.find(
												(soundboardData) =>
													soundboardData.soundboardName === soundBoard.name
											)
										)}
									</div>
								) : (
									''
								)}
							</li>
						</ul>
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
