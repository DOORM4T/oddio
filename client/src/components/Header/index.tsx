import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import { GlobalContext } from '../../context/globalContext'

interface HeaderProps {
	title: string
	icon: string
}

export default function Header({ title, icon }: HeaderProps) {
	const { globalState, dispatch } = useContext(GlobalContext)

	return (
		<header className={styles.header}>
			<h1 id="title" data-aos="zoom-out">
				{title}{' '}
				<span role="img" aria-label="Header Icon">
					{icon}
				</span>
			</h1>
			<HeaderNav />
			{globalState?.user.username && (
				<h2>Hey there, {globalState?.user.username}!</h2>
			)}
		</header>
	)
}

function HeaderNav() {
	const links = [
		{ to: '/', icon: '🎤' },
		{ to: '/', icon: '⚙' },
		{ to: '/login', icon: '👤' },
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
