import React, { useContext } from 'react'
import { Sound } from '../../util/types/Sound.type'
import playSound from '../../util/playSound'
import styles from './Catalog.module.scss'
import FameButton from '../FameButton/FameButton'
import AddToSoundboard from '../AddToSoundboard'
import { GlobalContext } from '../../context/globalContext'

export default function Catalog({ sounds }: CatalogProps) {
	const { globalState } = useContext(GlobalContext)

	return (
		<section className={styles.section}>
			{sounds.length > 0 ? (
				<ul className={styles.catalog}>
					{sounds.map((sound) => (
						<div
							className={styles.item}
							key={sound._id}
							data-aos="zoom-in"
							data-aos-duration={500}
						>
							<h2>{sound.name}</h2>
							<h4>{sound.author}</h4>
							<p>{sound.description}</p>
							<p>{sound.category}</p>
							<p>
								{sound.triggers.length ? '👄' : ''}
								{sound.triggers.join(', ')}
							</p>
							<p>{new Date(sound.created).toLocaleDateString()}</p>
							{globalState?.user.username && (
								<>
									<AddToSoundboard soundId={sound._id} />
									<FameButton soundId={sound._id} fame={sound.fame} />
								</>
							)}
							<button onClick={() => playSound(sound.sourceId)}>🔊</button>
						</div>
					))}
				</ul>
			) : (
				<h3 className={styles.empty}>
					Looks like there's nothing here... yet!
				</h3>
			)}
		</section>
	)
}

interface CatalogProps {
	sounds: Sound[]
}
