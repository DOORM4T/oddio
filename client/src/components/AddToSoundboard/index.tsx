import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../context/globalContext'
import { setUserAction } from '../../context/globalActions'
import { User } from '../../util/types/User.type'
import useRefreshUserData from '../../util/useRefreshUserData'

interface AddToSoundboardProps {
	soundId: string
}

export default function AddToSoundboard({ soundId }: AddToSoundboardProps) {
	const { globalState, dispatch } = useContext(GlobalContext)
	const [selectedSoundboardId, setSelectedSoundboardId] = useState<string>('')
	const refreshUserData = useRefreshUserData()

	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSoundboardId(event.target.value)
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!selectedSoundboardId) return

		const body = JSON.stringify({ soundId })
		const response = await fetch(
			`/api/users/${globalState?.user.username}/soundboards/${selectedSoundboardId}/addsound`,
			{
				method: 'PUT',
				body,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		if (response.status === 200) refreshUserData()
	}

	return (
		<form onSubmit={handleSubmit}>
			<select
				name="soundboard-select"
				id="soundboard-select"
				required
				onChange={handleSelect}
				defaultValue=""
			>
				<option disabled value="">
					- Choose a Soundboard -
				</option>
				{globalState?.user &&
					globalState?.user.soundboards &&
					globalState?.user.soundboards.map(({ _id, name }) => (
						<option value={_id} key={_id}>
							{name}
						</option>
					))}
			</select>
			<button type="submit">
				<span role="img," aria-label="Add to Soundboard">
					➕
				</span>
			</button>
		</form>
	)
}
