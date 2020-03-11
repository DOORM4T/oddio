import React, { useReducer, useEffect } from 'react'
import { GlobalContext } from './context/globalContext'
import {
	GlobalState,
	globalStateReducer,
	initialGlobalState,
} from './context/globalReducer'
import { GlobalStateAction } from './context/globalActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AOS, { AosOptions } from 'aos'
import 'aos/dist/aos.css'
import 'swiper/css/swiper.min.css'
import './main.scss'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SoundsCatalog from './pages/SoundsCatalog'
import SoundPlayer from './components/SoundPlayer'

export default function App() {
	const [globalState, dispatch] = useReducer<
		React.Reducer<GlobalState, GlobalStateAction>
	>(globalStateReducer, initialGlobalState)

	useEffect(() => {
		const options: AosOptions = {
			once: true,
			duration: 800,
			easing: 'ease-out',
		}
		AOS.init(options)
	}, [])

	return (
		<GlobalContext.Provider value={{ globalState, dispatch }}>
			<SoundPlayer />
			<Router>
				<Switch>
					<Route exact path="/" render={() => <Home />} />
					<Route path="/catalog" render={() => <SoundsCatalog />} />
					<Route path="/dashboard" render={() => <Dashboard />} />
					<Route path="/login" render={() => <Login />} />
					<Route path="/register" render={() => <Register />} />
					<Route path="/*" render={() => <div>404</div>} />
				</Switch>
			</Router>
		</GlobalContext.Provider>
	)
}
