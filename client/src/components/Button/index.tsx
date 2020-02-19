import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
	color?: string
	children: string
	type?: 'button' | 'submit' | 'reset'
}

export default function Button({
	color = '',
	children,
	type = 'button',
}: ButtonProps) {
	return (
		<button
			className={styles.button}
			style={{ [color ? 'backgroundColor' : '']: color }}
			type={type}
		>
			{children}
		</button>
	)
}
