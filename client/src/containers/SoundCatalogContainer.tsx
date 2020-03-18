import React, { useState, useEffect, useContext, useRef } from 'react'
import Catalog from '../components/Catalog'
import { Sound } from '../util/types/Sound.type'
import { GlobalContext } from '../context/globalContext'
import Spinner from '../components/Spinner'

export default function SoundCatalogContainer({
	query = '',
}: SoundCatalogContainerProps) {
	const [sounds, setSounds] = useState<Sound[]>([])
	const { globalState } = useContext(GlobalContext)

	const [count, setCount] = useState<number>(10)
	const [start, setStart] = useState<number>(0)
	const [moreToLoad, setMoreToLoad] = useState<boolean>(true)

	useEffect(() => {
		const fetchSounds = async () => {
			const response = await fetch(
				`/api/sounds?start=${start}&count=${count}&name=${query ||
					globalState?.soundsQuery}`
			)
			const data = await response.json()

			if (query || globalState?.soundsQuery) setSounds(data)
			else setSounds((prevData) => [...prevData, ...data])

			const nextResponse = await fetch(
				`/api/sounds?start=${start + count}&count=${count}&name=${query ||
					globalState?.soundsQuery}`
			)
			const nextData = await nextResponse.json()

			if (nextData.length === 0) {
				setMoreToLoad(false)
				return
			}
		}

		fetchSounds()
	}, [query, globalState?.soundsQuery, start])

	useEffect(() => {
		setStart(0)
		setMoreToLoad(true)
	}, [globalState?.soundsQuery])

	const loadMore = () => {
		setStart(() => start + count)
	}

	return (
		<div>
			<Catalog sounds={sounds} />
			{sounds.length > 0 && moreToLoad && (
				<button
					onClick={loadMore}
					style={{
						width: '100%',
						backgroundColor: '#222',
						color: 'white',
						height: '50px',
					}}
				>
					Load More
				</button>
			)}
		</div>
	)
}

interface SoundCatalogContainerProps {
	query?: string
}
