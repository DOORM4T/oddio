import React from 'react'
import styles from './Modal.module.scss'

export default function Modal({ isOpen, children }: ModalProps) {
	return (
		<div className={styles.modal} style={{ display: `${isOpen}` }}>
			{children}
		</div>
	)
}

interface ModalProps {
	isOpen: boolean
	children: React.ReactNode | React.ReactNode[]
}
