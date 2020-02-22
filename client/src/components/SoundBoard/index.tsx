import React, { useState, useEffect, useRef, useContext } from 'react'
import { GlobalContext } from '../../context/globalContext'
import useUserInfoFromCookie from '../../util/useUserInfoFromCookie'

interface SoundBoardProps {
	reactToTriggers: boolean
}

export default function SoundBoard({ reactToTriggers }: SoundBoardProps) {
	const [soundBoards, setSoundBoards] = useState<SoundBoard[]>([])
	const [userInfo] = useUserInfoFromCookie()

	useEffect(() => {
		const getUserSoundBoards = () => {}

		getUserSoundBoards()
	}, [])
	const { globalState, dispatch } = useContext(GlobalContext)

	return (
		<aside>
			{soundBoards.map((soundBoard) => {
				return (
					<>
						<h2>{soundBoard.name}</h2>
						<ul>
							<li>
								{soundBoard.sounds.map((sound) => (
									<div>
										<h3>{sound.name}</h3>
										<p>{sound.triggers.join(', ')}</p>
									</div>
								))}
							</li>
						</ul>
					</>
				)
			})}
		</aside>
	)
}

interface SoundBoard {
	name: string
	sounds: [{ name: string; triggers: string[] }]
}
