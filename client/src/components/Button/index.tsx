import React, { ReactChildren } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
	color?: string
	children: string
}

export default function Button({ color = '', children }: ButtonProps) {
	return (
		<button
			className={styles.button}
			style={{ [color ? 'backgroundColor' : '']: color }}
		>
			{children}
		</button>
	)
}
