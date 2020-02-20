import React, { useState, useEffect } from 'react'
import Catalog from '../components/Catalog'
import Sound from '../util/sound'

export default function SoundCatalogContainer({
	query = '',
}: SoundsCatalogContainerProps) {
	const [sounds, setSounds] = useState<Sound[]>([])

	useEffect(() => {
		const fetchSounds = async () => {
			const response = await fetch(`/api/sounds?${query}`)
			const data = await response.json()
			setSounds(() => data)
		}

		fetchSounds()
	}, [])

	return <Catalog sounds={sounds} />
}

interface SoundsCatalogContainerProps {
	query?: string
}
