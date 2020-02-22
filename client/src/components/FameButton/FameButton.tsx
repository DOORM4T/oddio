import React, { useState } from 'react'

interface FameButtonContainerProps {
	soundId: string
	fame: number
}

export default function FameButton({
	soundId,
	fame,
}: FameButtonContainerProps) {
	const [displayedFame, setDisplayedFame] = useState<number>(fame)

	const toggleFame = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		try {
			const incrementResponse = await fetch(
				`/api/sounds/${soundId}/incrementfame`,
				{
					method: 'PUT',
				}
			)
			if (incrementResponse.status === 200)
				setDisplayedFame((prevFame) => prevFame + 1)
			else {
				const decrementResponse = await fetch(
					`/api/sounds/${soundId}/decrementfame`,
					{
						method: 'PUT',
					}
				)
				if (decrementResponse.status !== 200) throw new Error()
				setDisplayedFame((prevFame) => prevFame - 1)
			}
		} catch (error) {
			console.log(`Failed to change famed status.`)
		}
	}

	return (
		<div>
			<span>{displayedFame}</span>
			<button onClick={toggleFame}>
				<span role="img" aria-label="fame">
					⬆
				</span>
			</button>
		</div>
	)
}
