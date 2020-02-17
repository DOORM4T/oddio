import React from 'react'
import styles from './SearchBar.module.scss'

export default function SearchBar() {
	return (
		<form className={styles.searchbar} action="/GETSOUNDS" method="GET">
			<input type="text" placeholder="Search" />
			<button type="submit">
				<span role="img" aria-label="search">
					🔍
				</span>
			</button>
		</form>
	)
}
