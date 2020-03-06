import { GlobalStateAction } from './globalActions'
import { Sound } from '../util/types/Sound.type'
import { Soundboard } from '../util/types/Soundboard.type'

export const initialGlobalState = {
	user: {
		_id: '',
		email: '',
		joined: '',
		private: true,
		sounds: [],
		soundboards: [],
		soundsFamed: [],
		username: '',
	},
	ui: {
		theme: 'default',
		alert: 'nothing',
	},
	soundsQuery: '',
}

export const globalStateReducer = (
	state: GlobalState,
	action: GlobalStateAction
) => {
	const { type, payload } = action
	switch (type) {
		case 'LOGIN_USER':
			return { ...state, user: payload }
		case 'LOGOUT_USER':
			return {
				...state,
				user: {
					_id: '',
					username: '',
					soundsFamed: [],
					sounds: [],
					private: true,
					email: '',
					joined: '',
				},
			}
		case 'SET_ALERT':
			return { ...state, ui: { ...state.ui, alert: payload } }
		case 'CHANGE_THEME':
			return { ...state, ui: { ...state.ui, theme: payload } }
		case 'SET_SOUNDS_QUERY':
			return { ...state, soundsQuery: payload }
		default:
			throw new Error()
	}
}

export type GlobalState = {
	user: {
		_id: string
		email: string
		joined: string
		private: boolean
		sounds: Sound[]
		soundboards: Soundboard[]
		soundsFamed: Sound[]
		username: string
	}
	ui: {
		theme: string
		alert: string
	}
	soundsQuery: string
}
