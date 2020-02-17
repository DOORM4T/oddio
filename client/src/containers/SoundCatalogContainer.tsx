import React, { useState, useEffect, ReactNode, ReactNodeArray } from 'react'
import Catalog from '../components/Catalog'

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

export default function SoundCatalogContainer() {
	const [sounds, setSounds] = useState<Sound[]>([])

	useEffect(() => {
		const getSounds = async () => {
			const response = await fetch('http://localhost:3001/api/sounds')
			const data = await response.json()
			return data
		}
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
