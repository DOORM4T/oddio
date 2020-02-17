import React from 'react'
import Form, { Field } from '../components/Form'

export default function RegisterForm() {
	const fields: Field[] = [
		{
			name: 'email',
			placeholder: 'email',
			type: 'email',
			required: true,
		},
		{
			name: 'username',
			placeholder: 'username',
			type: 'username',
			required: true,
		},
		{
			name: 'password',
			placeholder: 'password',
			type: 'password',
			required: true,
		},
		{
			name: 'confirmPassword',
			placeholder: 'confirm password',
			type: 'password',
			required: true,
		},
	]

	interface RegisterFormState {
		email: string
		username: string
		password: string
		confirmPassword: string
	}

	const validatePasswordConfirm = ({
		password,
		confirmPassword,
	}: RegisterFormState) => {
		console.log(password, confirmPassword)

		if (password !== confirmPassword)
			throw new Error('Password and Confirm Password fields do not match.')
	}

	return (
		<Form
			action="/auth/register"
			fields={fields}
			method="POST"
			submitText="Register"
			submitStateValidation={validatePasswordConfirm}
		/>
	)
}
