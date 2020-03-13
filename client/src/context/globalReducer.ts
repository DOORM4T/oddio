import { GlobalStateAction } from './globalActions'
import { User } from '../util/types/User.type'
import { Sound } from '../util/types/Sound.type'

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
	soundsToLivePlay: [],
	showModal: false,
}

export const globalStateReducer = (
	state: GlobalState,
	action: GlobalStateAction
) => {
	const { type, payload } = action
	switch (type) {
		case 'SET_USER':
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
		case 'SET_SOUNDS_TO_LIVE_PLAY':
			return { ...state, soundsToLivePlay: payload }
		case 'SET_MODAL_VISIBILITY':
			return { ...state, showModal: payload }
		default:
			throw new Error()
	}
}

export type GlobalState = {
	user: User
	ui: {
		theme: string
		alert: string
	}
	soundsQuery: string
	soundsToLivePlay: Sound[]
	showModal: boolean
}
