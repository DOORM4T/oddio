import React, { useState, useEffect, useContext } from 'react'
import Catalog from '../components/Catalog'
import { Sound } from '../util/types/Sound.type'
import { GlobalContext } from '../context/globalContext'

export default function SoundCatalogContainer({
	query,
}: SoundsCatalogContainerProps) {
	const [sounds, setSounds] = useState<Sound[]>([])
	const { globalState } = useContext(GlobalContext)

	useEffect(() => {
		// Query by search bar if no query prop is passed down
		if (query) return

		const fetchSounds = async () => {
			const response = await fetch(`/api/sounds?${globalState?.soundsQuery}`)
			const data = await response.json()
			setSounds(() => data)
		}

		fetchSounds()
	}, [globalState?.soundsQuery])

	return <Catalog sounds={sounds} />
}

interface SoundsCatalogContainerProps {
	query?: string
}
