import React, { useContext } from 'react'
import Form, { Field } from '../components/Form'
import { GlobalContext } from '../context/globalContext'

const fields: Field[] = [
	{
		name: 'soundboardName',
		placeholder: 'name',
		type: 'text',
		required: true,
	},
]

export default function CreateSoundboardFormContainer() {
	const { globalState } = useContext(GlobalContext)
	const username = globalState?.user.username

	return (
		<Form
			action={`/api/users/${username}/soundboards/create`}
			method="POST"
			fields={fields}
			submitText="Create Soundboard"
		/>
	)
}
