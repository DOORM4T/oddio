import React from 'react'
import styles from './Footer.module.scss'

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<span>
				Made with{' '}
				<span role="img" aria-label="heart">
					💖
				</span>{' '}
				and{' '}
				<span role="img" aria-label="heartbreak">
					💔
				</span>{' '}
				by Matt Seto
			</span>
		</footer>
	)
}
