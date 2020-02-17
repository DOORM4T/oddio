import React, { useState } from 'react'
import Spacing from '../components/Spacing'
import Header from '../components/Header'
import LoginForm from '../containers/LoginForm'
import RegisterForm from '../containers/RegisterForm'

export default function Account() {
	const [showingLoginForm, setShowingLoginForm] = useState(true)

	const toggleVisibleForm = () => {
		setShowingLoginForm(() => !showingLoginForm)
	}

	return (
		<article>
			<Header title="Account" icon="🔐" />
			<Spacing spaces={3} />
			{showingLoginForm && <LoginForm />}
			{!showingLoginForm && <RegisterForm />}
			<div style={toggleSectionStyles}>
				<p style={{ marginRight: '1rem' }}>
					{showingLoginForm && "Don't have an account?"}
					{!showingLoginForm && 'Already have an account?'}
				</p>
				<button
					onClick={toggleVisibleForm}
					style={{
						all: 'unset',
						color: '#55FF8D',
						cursor: 'pointer',
					}}
				>
					{showingLoginForm && 'Register'}
					{!showingLoginForm && 'Login'}
				</button>
			</div>
		</article>
	)
}

const toggleSectionStyles = {
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: '1rem',
}
