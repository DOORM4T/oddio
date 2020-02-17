import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

interface HeaderProps {
	title: string
	icon: string
}

export default function Header({ title, icon }: HeaderProps) {
	return (
		<header className={styles.header}>
			<h1 id="title" data-aos="zoom-out">
				{title}{' '}
				<span role="img" aria-label="Header Icon">
					{icon}
				</span>
			</h1>
			<HeaderNav />
		</header>
	)
}

function HeaderNav() {
	const links = [
		{ to: '/', icon: '🎤' },
		{ to: '/', icon: '⚙' },
		{ to: '/', icon: '👤' },
	]

	return (
		<nav id="navigation" data-aos="fade">
			{links.map(({ to, icon }, index) => {
				return (
					<HeaderLink to={to} icon={icon} key={`nav-link-to-${to}-${index}`} />
				)
			})}
		</nav>
	)
}

interface HeaderLinkProps {
	to: string
	icon: string
}

function HeaderLink({ to, icon }: HeaderLinkProps) {
	return (
		<Link to={to}>
			<button>
				{' '}
				<span role="img" aria-label="Header Navigation Icon">
					{icon}
				</span>
			</button>
		</Link>
	)
}
