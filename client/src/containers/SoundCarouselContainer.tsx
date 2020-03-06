import React, { useState, useEffect, useContext } from 'react'
import Carousel from '../components/Carousel'
import { Sound } from '../util/types/Sound.type'
import playSound from '../util/playSound'
import { GlobalContext } from '../context/globalContext'

interface SoundCatalogContainerProps {
	query?: string
}

export default function SoundCatalogContainer({
	query = '',
}: SoundCatalogContainerProps) {
	const { globalState } = useContext(GlobalContext)
	const [sounds, setSounds] = useState<Sound[]>([])

	useEffect(() => {
		if (!globalState?.user.username) return

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
