import React from 'react'
import Sound from '../../util/sound'
import playSound from '../../util/playSound'
import styles from './Catalog.module.scss'
import FameButton from '../FameButton/FameButton'
import AddToSoundboard from '../AddToSoundboard'
import useUserInfoFromCookie from '../../util/useUserInfoFromCookie'

export default function Catalog({ sounds }: CatalogProps) {
	const [userInfo] = useUserInfoFromCookie()

	return (
		<section className={styles.catalog}>
			{sounds.length &&
				sounds.map((sound) => (
					<div className={styles.item} key={sound._id}>
						<h2>{sound.name}</h2>
						<h4>{sound.author}</h4>
						<p>{sound.description}</p>
						<p>{sound.category}</p>
						<p>
							{sound.triggers.length ? '👄' : ''}
							{sound.triggers.join(', ')}
						</p>
						<p>{new Date(sound.created).toLocaleDateString()}</p>
						{userInfo.username && (
							<>
								<AddToSoundboard soundId={sound._id} />
								<FameButton soundId={sound._id} fame={sound.fame} />
							</>
						)}
						<button onClick={() => playSound(sound.sourceId)}>🔊</button>
					</div>
				))}
		</section>
	)
}

interface CatalogProps {
	sounds: Sound[]
}
