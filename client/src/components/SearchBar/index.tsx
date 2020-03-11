import React, { useState, useContext } from 'react'
import styles from './SearchBar.module.scss'
import { GlobalContext } from '../../context/globalContext'
import { setSoundsSearchQueryAction } from '../../context/globalActions'
import { useHistory } from 'react-router-dom'

export default function SearchBar() {
	const { globalState, dispatch } = useContext(GlobalContext)
	const history = useHistory()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!dispatch) return
		dispatch(setSoundsSearchQueryAction(event.target.value))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		history.push('/catalog')
	}

	return (
		<form onSubmit={handleSubmit} className={styles.searchbar}>
			<input
				onChange={handleChange}
				type="text"
				placeholder="Search"
				value={globalState?.soundsQuery}
			/>
			<button type="submit">
				<span role="img" aria-label="search">
					🔍
				</span>
			</button>
		</form>
	)
}
