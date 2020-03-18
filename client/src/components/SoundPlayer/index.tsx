import React, { useEffect, useState, useContext, useRef } from 'react'
import { GlobalContext } from '../../context/globalContext'
import styles from './Soundplayer.module.scss'

export default function SoundPlayer() {
	const { globalState, dispatch } = useContext(GlobalContext)
	const [triggers, setTriggers] = useState<string[]>([])
	const [recognition, setRecognition] = useState<SpeechRecognition>()
	const [listening, setListening] = useState<boolean>(false)
	const buttonRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		setRecognition(() => {
			const SpeechRecognition =
				//@ts-ignore
				window.SpeechRecognition || window.webkitSpeechRecognition
			const rec = new SpeechRecognition()
			rec.continuous = true
			rec.onstart = () => {
				console.log('start')
			}
			rec.onend = () => {
				console.log('end')
			}

			return rec
		})
	}, [])

	useEffect(() => {
		if (!recognition) return
		recognition.abort()

		if (listening) recognition.start()
	}, [listening])

	useEffect(() => {
		if (!recognition) return

		if (!globalState) return
		setTriggers(() => {
			let triggers: string[] = []
			if (globalState.soundsToLivePlay.length > 0) {
				triggers = globalState.soundsToLivePlay
					.map((sound) => sound.triggers)
					.flat(Infinity)
				triggers = triggers.map((triggerWord) => triggerWord.toUpperCase())
			}

			recognition.onresult = (ev: SpeechRecognitionEvent) => {
				if (triggers.length === 0) return
				const result = ev.results[ev.results.length - 1][0].transcript
				console.log(result)

				const triggerWordsRegex = new RegExp(`(${triggers.join('|')})`, 'i')

				result.split(' ').forEach(async (word) => {
					word = word.toUpperCase()

					if (triggerWordsRegex.test(word)) {
						const soundToPlay = globalState.soundsToLivePlay.find((sound) => {
							const triggers = sound.triggers.map((triggerWord) =>
								triggerWord.toUpperCase()
							)
							return triggers.includes(word)
						})
						if (!soundToPlay) return

						const response = await fetch(
							`/api/sounds/uploads/${soundToPlay.sourceId}`
						)
						const data = await response.blob()

						const reader = new FileReader()

						reader.onloadend = () => {
							if (!reader.result) return
							const dataUrl = reader.result.toString()
							new Audio(dataUrl).play()
						}

						reader.readAsDataURL(data)
					}
				})
			}
			return triggers
		})
	}, [globalState?.soundsToLivePlay])

	return (
		<div className={styles.soundplayer}>
			<button
				onClick={() => {
					setListening((prevState) => {
						if (!buttonRef.current) return !prevState
						if (prevState === false)
							buttonRef.current.style.filter =
								'hue-rotate(150deg) brightness(180%)'
						else buttonRef.current.style.filter = 'none'
						return !prevState
					})
				}}
				ref={buttonRef}
			>
				<span role="img" aria-label="live play">
					🔴
				</span>
			</button>
		</div>
	)
}
