import React, { useState, useEffect, useContext } from 'react'
import Catalog from '../components/Catalog'
import { Sound } from '../util/types/Sound.type'
import { GlobalContext } from '../context/globalContext'

export default function SoundCatalogContainer() {
	const [sounds, setSounds] = useState<Sound[]>([])
	const { globalState } = useContext(GlobalContext)

	useEffect(() => {
		if (!globalState) return

		const fetchSounds = async () => {
			const response = await fetch(
				`/api/sounds?name=${globalState.soundsQuery}`
			)
			const data = await response.json()
			setSounds(() => data)
		}

		fetchSounds()
	}, [globalState?.soundsQuery])

	return <Catalog sounds={sounds} />
}
