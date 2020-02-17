import React from 'react'

interface SpacingProps {
	spaces: number
}

export default function Spacing({ spaces }: SpacingProps) {
	return (
		<>
			{new Array(spaces).fill(null).map((item, index) => (
				<br key={`space-${index}`} />
			))}
		</>
	)
}
