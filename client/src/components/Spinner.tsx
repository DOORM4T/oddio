import React from 'react'

export default function Spinner({ icon }: SpinnerProps) {
	return (
		<div className="spinner">
			<span role="img" aria-label="spinner">
				{icon}
			</span>
		</div>
	)
}

interface SpinnerProps {
	icon: string
}
