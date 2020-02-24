import React, { useState } from 'react'
import useUserInfoFromCookie, {
	Soundboard,
} from '../../util/useUserInfoFromCookie'

interface AddToSoundboardProps {
	soundId: string
}

export default function AddToSoundboard({ soundId }: AddToSoundboardProps) {
	const [userInfo] = useUserInfoFromCookie()
	const { username } = userInfo

	const [selectedSoundboardId, setSelectedSoundboardId] = useState<string>('')

	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSoundboardId(event.target.value)
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!selectedSoundboardId) return

		const body = JSON.stringify({ soundId })
		const response = await fetch(
			`/api/users/${username}/soundboards/${selectedSoundboardId}/addsound`,
			{
				method: 'PUT',
				body,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
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
				{userInfo &&
					userInfo.soundboards &&
					userInfo.soundboards.map(({ _id, name }) => (
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
