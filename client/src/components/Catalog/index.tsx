import React from 'react'
import Sound from '../../util/sound'
import playSound from '../../util/playSound'
import styles from './Catalog.module.scss'
import FameButtonContainer from '../../containers/FameButtonContainer'

export default function Catalog({ sounds }: CatalogProps) {
	return (
		<section className={styles.catalog}>
			{sounds.length &&
				sounds.map((sound) => (
					<div className={styles.item} key={sound._id}>
						<p>{sound.name}</p>
						<p>{sound.author}</p>
						<p>{sound.description}</p>
						<p>{sound.category}</p>
						<p>
							{sound.triggers.length ? '👄' : ''}
							{sound.triggers.join(', ')}
						</p>
						<p>{sound.created}</p>
						<FameButtonContainer soundId={sound._id} fame={sound.fame} />
						<button onClick={() => playSound(sound.sourceId)}>🔊</button>
					</div>
				))}
		</section>
	)
}

interface CatalogProps {
	sounds: Sound[]
}
