import React, { useState } from 'react'
import Button from '../components/Button'

interface FameButtonContainerProps {
	soundId: string
	fame: number
}

export default function FameButtonContainer({
	soundId,
	fame,
}: FameButtonContainerProps) {
	const [incremented, setIncremented] = useState<boolean>(false)

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
			if (incrementResponse.status !== 200) {
				const incrementResponse = await fetch(
					`/api/sounds/${soundId}/decrementfame`,
					{
						method: 'PUT',
					}
				)
				if (incrementResponse.status !== 200) throw new Error()
				setIncremented(() => false)
				return
			}
			setIncremented(() => true)
		} catch (error) {
			console.log(`Failed to change famed status.`)
		}
	}

	return (
		<div>
			<span>{fame + Number(incremented)}</span>
			<Button onClick={toggleFame}>
				<span role="img" aria-label="fame">
					⬆
				</span>
			</Button>
		</div>
	)
}
