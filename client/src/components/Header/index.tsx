import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import SearchBar from '../SearchBar'

interface HeaderProps {
	title: string
}

export default function Header({ title }: HeaderProps) {
	return (
		<header className={styles.header}>
			<h1 id="title" data-aos="zoom-out">
				{title}
			</h1>
			<nav id="navigation" data-aos="fade">
				<Link to="/">
					<button>🎤</button>
				</Link>
				<Link to="/">
					<button>⚙</button>
				</Link>
				<Link to="/">
					<button>👤</button>
				</Link>
			</nav>
		</header>
	)
}
