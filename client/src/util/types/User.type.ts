import { Sound } from './Sound.type'
import { Soundboard } from './Soundboard.type'

export type User = {
	_id: string
	username: string
	soundsFamed: string[]
	soundboards: Soundboard[]
	sounds: Sound[]
	private: boolean
	email: string
	joined: string
}
