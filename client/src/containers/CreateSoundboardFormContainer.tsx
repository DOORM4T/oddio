import React from 'react'
import Form, { Field } from '../components/Form'
import useUserInfoFromCookie from '../util/useUserInfoFromCookie'

const fields: Field[] = [
	{
		name: 'soundboardName',
		placeholder: 'name',
		type: 'text',
		required: true,
	},
]

export default function CreateSoundboardFormContainer() {
	const [userInfo] = useUserInfoFromCookie()
	const { username } = userInfo

	return (
		<Form
			action={`/api/users/${username}/soundboards/create`}
			method="POST"
			fields={fields}
			submitText="Create Soundboard"
		/>
	)
}
