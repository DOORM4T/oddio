import React from 'react'
import Form, { Field } from '../components/Form'

export default function RegisterForm() {
	const fields: Field[] = [
		{
			name: 'username',
			placeholder: 'username',
			type: 'username',
			required: true,
		},
		{
			name: 'email',
			placeholder: 'email',
			type: 'email',
			required: true,
		},
		{
			name: 'confirmEmail',
			placeholder: 'confirm email',
			type: 'email',
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
		username: string
		email: string
		confirmEmail: string
		password: string
		confirmPassword: string
	}

	const validatePasswordConfirm = ({
		email,
		confirmEmail,
		password,
		confirmPassword,
	}: RegisterFormState) => {
		if (email !== confirmEmail)
			throw new Error('Email and Confirm Email fields do not match.')
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
