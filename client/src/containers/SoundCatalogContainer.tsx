import React, { useState, useEffect } from 'react'
import Catalog from '../components/Catalog'

interface SoundCatalogContainerProps {
	sounds_url?: string
}

export default function SoundCatalogContainer({
	sounds_url = '/api/sounds',
}: SoundCatalogContainerProps) {
	const [sounds, setSounds] = useState<Sound[]>([])

	useEffect(() => {
		async function getSounds(): Promise<Sound[]> {
			try {
				const response = await fetch(sounds_url)
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

	function renderFunction() {
		return sounds.map((sound, index) => (
			<li key={sound._id}>
				`${sound.name} - ${index}`,
			</li>
		))
	}

	return <Catalog render={renderFunction} />
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
