import React, { useEffect, useState, useContext } from 'react'
import { GlobalContext } from '../../context/globalContext'

export default function SoundPlayer() {
	const { globalState, dispatch } = useContext(GlobalContext)
	const [triggers, setTriggers] = useState<string[]>([])
	const [recognition, setRecognition] = useState<SpeechRecognition>()
	const [listening, setListening] = useState<boolean>(false)

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
		<div>
			SoundPlayer
			<button onClick={() => setListening(!listening)}>
				<span role="img" aria-label="live play">
					🔴
				</span>
			</button>
		</div>
	)
}
