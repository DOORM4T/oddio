import React from 'react'
import styles from './WhatIsThis.module.scss'

interface WhatIsThisProps {
	description: string
}

export default function WhatIsThis({ description }: WhatIsThisProps) {
	return (
		<div className={styles.whatisthis}>
			<span role="img" aria-label="What Is This?">
				❔
			</span>
			<p>{description}</p>
		</div>
	)
}
