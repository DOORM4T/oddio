import React from 'react'
import Spacing from '../components/Spacing'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import SoundCarouselContainer from '../containers/SoundCarouselContainer'
import SoundCatalogContainer from '../containers/SoundCatalogContainer'
import SoundBoards from '../components/SoundBoards'

export default function SoundsCatalog() {
	return (
		<article>
			<Header title="Catalog" icon="📇" />
			<main data-aos="fade">
				<SoundBoards reactToTriggers={true} />
				<div>
					<Spacing spaces={2} />
					<h1 style={{ marginLeft: '5rem' }}>Featured</h1>
					<SoundCarouselContainer />
					<Spacing spaces={2} />
					<a href="#TheWholeLot" style={{ textAlign: 'center' }}>
						⏬
					</a>

					<Spacing spaces={15} />
					<div
						style={{
							position: 'sticky',
							top: 0,
							backgroundColor: '#fcfcfc',
							padding: '1rem',
							boxShadow: '0 24px 16px rgba(0,0,0,0.5)',
							borderRadius: '0 0 4px 4px',
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
