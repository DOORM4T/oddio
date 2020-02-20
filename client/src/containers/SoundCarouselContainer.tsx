import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Sound from '../util/sound'
import playSound from '../util/playSound'

interface SoundCatalogContainerProps {
	query?: string
}

export default function SoundCatalogContainer({
	query = '',
}: SoundCatalogContainerProps) {
	const [sounds, setSounds] = useState<Sound[]>([])

	useEffect(() => {
		async function getSounds(): Promise<Sound[]> {
			try {
				const response = await fetch(`/api/sounds/${query}`)
				const data: Sound[] | null = await response.json()
				if (data === null) throw new Error('Failed to fetch sounds.')
				return data
			} catch (error) {
				console.error(error.message)
				return []
			}
		}

		getSounds().then((data) => setSounds(() => data))
	}, [])

	function items() {
		return sounds.map((sound, index) => (
			<>
				<p>{sound.name}</p>
				<p>{sound.author}</p>
				<button onClick={() => playSound(sound.sourceId)}>🔊</button>
			</>
		))
	}

	return <Carousel items={items()} />
}
