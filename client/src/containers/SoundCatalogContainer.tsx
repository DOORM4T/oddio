import React, { useState, useEffect } from 'react'
import Catalog from '../components/Catalog'

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

	const playSound = (source_id: string) => {
		fetch(`api/sounds/uploads/${source_id}`, {
			headers: { 'Content-Type': 'audio/mpeg' },
		})
			.then((res) => res.blob())
			.then((blob) => {
				const reader = new FileReader()
				reader.onloadend = (e) => {
					new Audio(reader.result?.toString()).play()
				}
				reader.readAsDataURL(blob)
			})
	}

	function items() {
		return sounds.map((sound, index) => (
			<>
				<p>{sound.name}</p>
				<p>{sound.author}</p>
				<button onClick={() => playSound(sound.sourceId)}>🔊</button>
			</>
		))
	}

	return <Catalog items={items()} />
}

interface Sound {
	_id: string
	author: string
	category: string
	created: Date
	description: string
	fame: number
	name: string
	sourceId: string
	triggers: string[]
}
