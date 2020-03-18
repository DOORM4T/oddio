import React, { useState, useEffect, useContext } from 'react'
import Carousel from '../components/Carousel'
import { Sound } from '../util/types/Sound.type'
import playSound from '../util/playSound'
import { GlobalContext } from '../context/globalContext'
import useRefreshUserData from '../util/useRefreshUserData'
import AddToSoundboard from '../components/AddToSoundboard'
import FameButton from '../components/FameButton/FameButton'

interface SoundCatalogContainerProps {
	query?: string
	list?: string[]
	showCreatorActions?: boolean
	showAddToSoundboard?: boolean
}

export default function SoundCatalogContainer({
	query = '',
	list = [],
	showCreatorActions = false,
	showAddToSoundboard = false,
}: SoundCatalogContainerProps) {
	const refreshUserData = useRefreshUserData()
	const { globalState, dispatch } = useContext(GlobalContext)
	const [sounds, setSounds] = useState<Sound[]>([])

	useEffect(() => {
		if (!dispatch) return
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
	}, [globalState?.user.sounds])

	// function editSound(sound: Sound) {
	// 	return async () => {
	// 		console.log(`editing ${sound.name}`)

	// 		if (!dispatch) return
	// 		dispatch(setModalVisibilityAction(true))

	// 		// const response = await fetch(`/api/sounds/${soundId}/editsound`, {
	// 		// 	method: 'PUT',
	// 		// })
	// 		// if (response.status === 200) {
	// 		// 	refreshUserData()
	// 		// }
	// 	}
	// }

	function deleteSound({ name, _id }: Sound) {
		return async () => {
			const confirmed = window.confirm(`Delete sound: ${name.toUpperCase()}?`)
			if (!confirmed) return

			const response = await fetch(`/api/sounds/${_id}`, {
				method: 'DELETE',
			})
			if (response.status === 200) {
				refreshUserData()
			}
		}
	}

	function items() {
		return sounds.map((sound) => (
			<>
				<p>{sound.name}</p>
				<p>{sound.author}</p>
				{showAddToSoundboard && <AddToSoundboard soundId={sound._id} />}
				<div>
					<button onClick={() => playSound(sound.sourceId)}>
						<span role="img" aria-label="play sound">
							🔊
						</span>
					</button>
					{showCreatorActions && globalState?.user.username === sound.author && (
						<>
							{/* <button onClick={editSound(sound)}>
								<span role="img" aria-label="delete sound">
									✏
								</span>
							</button> */}
							<button onClick={deleteSound(sound)}>
								<span role="img" aria-label="delete sound">
									❌
								</span>
							</button>
						</>
					)}
				</div>
			</>
		))
	}

	return (
		<>
			<Carousel items={items()} />
		</>
	)
}
