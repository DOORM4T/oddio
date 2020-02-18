import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Form, { Field } from '../components/Form'
import { decode } from 'jsonwebtoken'

export default function LoginForm() {
	const history = useHistory()

	useEffect(() => {
		const loggedInUserData = decode(document.cookie.slice('authToken='.length))
		if (loggedInUserData) history.push('/dashboard')
	}, [])

	const fields: Field[] = [
		{
			name: 'email',
			placeholder: 'email',
			type: 'email',
		},
		{
			name: 'password',
			placeholder: 'password',
			type: 'password',
		},
	]

	return (
		<Form
			action="/auth/login"
			fields={fields}
			method="POST"
			submitText="Login"
			redirect="/dashboard"
		/>
	)
}

interface LoginFormState {
	email: string
	password: string
}
