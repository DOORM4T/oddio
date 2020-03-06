import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Form, { Field } from '../components/Form'
import { GlobalContext } from '../context/globalContext'

export default function LoginForm() {
	const { globalState } = useContext(GlobalContext)
	const username = globalState?.user.username

	const history = useHistory()

	useEffect(() => {
		if (username) history.push('/dashboard')
	}, [])

	const fields: Field[] = [
		{
			name: 'email',
			placeholder: 'email',
			type: 'email',
			required: true,
		},
		{
			name: 'password',
			placeholder: 'password',
			type: 'password',
			required: true,
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
