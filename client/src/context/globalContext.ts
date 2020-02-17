import { createContext, Dispatch } from 'react'
import { GlobalState } from './globalReducer'
import { GlobalStateAction } from './globalActions'

export const GlobalContext = createContext<GlobalContextInterface>({
	globalState: null,
	dispatch: null,
})

export interface GlobalContextInterface {
	globalState: GlobalState | null
	dispatch: Dispatch<GlobalStateAction> | null
}
