import React from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import SoundCatalogContainer from '../containers/SoundCatalogContainer'
import useUserInfoFromCookie from '../util/useUserInfoFromCookie'

export default function SoundsCatalog() {
	useUserInfoFromCookie()

	return (
		<article>
			<Header title="Catalog" icon="📇" />
			<main>
				<div>
					<div
						style={{
							position: 'sticky',
							top: 0,
							backgroundColor: '#fcfcfc',
							padding: '1rem',
							boxShadow: '0 24px 16px rgba(0,0,0,0.5)',
							borderRadius: '0 0 4px 4px',
							zIndex: 99,
						}}
						id="TheWholeLot"
					>
						<h1 style={{ textAlign: 'center' }}>The Whole Lot</h1>
						<SearchBar />
					</div>
					<SoundCatalogContainer />
				</div>
			</main>
		</article>
	)
}
