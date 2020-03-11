import React, { useState, useEffect, useContext } from 'react'
import Carousel from '../components/Carousel'
import { Sound } from '../util/types/Sound.type'
import playSound from '../util/playSound'
import { GlobalContext } from '../context/globalContext'
import useRefreshUserData from '../util/useRefreshUserData'

interface SoundCatalogContainerProps {
	query?: string
	list?: string[]
}

export default function SoundCatalogContainer({
	query = '',
	list = [],
}: SoundCatalogContainerProps) {
	const refreshUserData = useRefreshUserData()
	const { globalState } = useContext(GlobalContext)
	const [sounds, setSounds] = useState<Sound[]>([])

	useEffect(() => {
		if (list.length > 0 && query) return

		async function getSounds() {
			try {
				if (list.length > 0) {
					const promises = list.map((soundId) => {
						return fetch(`/api/sounds/${soundId}`)
					})
					Promise.all(promises)
						.then((responses) =>
							Promise.all(responses.map((response) => response.json()))
						)
						.then((data) => {
							setSounds(() => data)
							return
						})
				}

				const response = await fetch(`/api/sounds?${query}`)
				const data: Sound[] | null = await response.json()
				if (data === null) throw new Error('Failed to fetch sounds.')
				setSounds(() => data)
			} catch (error) {
				console.error(error.message)
				return []
			}
		}

		getSounds()
	}, [globalState?.user.sounds])

	function deleteSound(soundId: string) {
		return async () => {
			const response = await fetch(`/api/sounds/${soundId}`, {
				method: 'DELETE',
			})
			if (response.status === 200) {
				refreshUserData()
			}
		}
	}

	function items() {
		return sounds.map((sound) => (
			<>
				<p>{sound.name}</p>
				<p>{sound.author}</p>
				<button onClick={() => playSound(sound.sourceId)}>
					<span role="img" aria-label="play sound">
						🔊
					</span>
				</button>
				{globalState?.user.username === sound.author && (
					<button onClick={deleteSound(sound._id)}>
						<span role="img" aria-label="delete sound">
							❌
						</span>
					</button>
				)}
			</>
		))
	}

	return <Carousel items={items()} />
}
