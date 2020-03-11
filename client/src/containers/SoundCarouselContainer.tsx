import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import { Sound } from '../util/types/Sound.type'
import playSound from '../util/playSound'

interface SoundCatalogContainerProps {
	query?: string
	list?: string[]
}

export default function SoundCatalogContainer({
	query = '',
	list = [],
}: SoundCatalogContainerProps) {
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
	}, [])

	function items() {
		return sounds.map((sound) => (
			<>
				<p>{sound.name}</p>
				<p>{sound.author}</p>
				<button onClick={() => playSound(sound.sourceId)}>🔊</button>
			</>
		))
	}

	return <Carousel items={items()} />
}
