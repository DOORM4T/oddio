import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './Header.module.scss'
import { GlobalContext } from '../../context/globalContext'

interface HeaderProps {
	title: string
	icon: string
}

export default function Header({ title, icon }: HeaderProps) {
	const { globalState } = useContext(GlobalContext)
	const username = globalState?.user.username

	const history = useHistory()

	const logout = () => {
		fetch('/auth/logout', { method: 'DELETE' }).then(() => {
			console.log('logged out')
			history.push('/login')
		})
	}

	return (
		<header className={styles.header}>
			<div className={styles.loggedinmessage}>
				{username && (
					<>
						<p data-aos="fade">{`Hey there, ${username}!`}</p>
						<button onClick={logout} data-aos="fade">
							{username && 'Logout'}
						</button>
					</>
				)}
			</div>
			<div className={styles.navbar}>
				<h1 id="title" data-aos="zoom-out">
					{title}{' '}
					<span role="img" aria-label="Header Icon">
						{icon}
					</span>
				</h1>
				<HeaderNav />
			</div>
		</header>
	)
}

function HeaderNav() {
	const links = [
		{ to: '/', icon: '🏠' },
		{ to: '/catalog', icon: '📇' },
		{ to: '/dashboard', icon: '👤' },
		{ to: '/', icon: '⚙' },
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
