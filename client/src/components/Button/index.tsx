import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
	color?: string
	children: React.ReactChild
	type?: 'button' | 'submit' | 'reset'
	onClick?:
		| ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
		| undefined
}

export default function Button({
	color = '',
	children,
	type = 'button',
	onClick,
}: ButtonProps) {
	return (
		<button
			className={styles.button}
			style={{ [color ? 'backgroundColor' : '']: color }}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
