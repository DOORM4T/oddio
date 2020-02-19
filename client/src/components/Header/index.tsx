import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from './Header.module.scss'
import useUserInfoFromCookie from '../../util/useUserInfoFromCookie'

interface HeaderProps {
	title: string
	icon: string
}

export default function Header({ title, icon }: HeaderProps) {
	const [userInfo] = useUserInfoFromCookie()
	const history = useHistory()

	const logout = () => {
		fetch('/auth/logout', { method: 'DELETE' }).then(() => {
			console.log('logged out')
			history.push('/login')
		})
	}

	return (
		<header className={styles.header}>
			<h1 id="title" data-aos="zoom-out">
				{title}{' '}
				<span role="img" aria-label="Header Icon">
					{icon}
				</span>
			</h1>
			{userInfo && userInfo.username && (
				<div data-aos="fade">
					test
					<h2>{`Hey there, ${userInfo.username}!`}</h2>
					<button onClick={logout}>{userInfo && 'Logout'}</button>
				</div>
			)}
			<HeaderNav />
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
