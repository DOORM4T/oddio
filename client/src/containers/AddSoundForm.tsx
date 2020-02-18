import React from 'react'
import Form, { Field } from '../components/Form'

export default function AddSoundForm() {
	const fields: Field[] = [
		{
			name: 'category',
			placeholder: 'category',
			type: 'select',
			options: ['Miscellaneous', 'Creature', 'Item', 'Spell', 'Weapon'],
		},
		{ name: 'name', placeholder: 'name', type: 'text', required: true },
		{
			name: 'triggers',
			placeholder: 'triggers',
			type: 'text',
		},
		{
			name: 'description',
			placeholder: 'description',
			type: 'textarea',
		},
		{
			name: 'uploadedSound',
			placeholder: 'sound upload',
			type: 'file',
			accept: 'audio/*',
			required: true,
		},
	]

	function createMultipartBody(formData: any, files: File[]) {
		if (!formData.category) formData.category = 'Miscellaneous'

		const body = new FormData()
		Object.keys(formData).forEach((key) => {
			body.append(key, formData[key])
		})

		body.append('uploadedSound', files[0])
		return body
	}

	return (
		<Form
			action="/api/sounds/add"
			fields={fields}
			method="POST"
			submitText="Upload"
			redirect="/dashboard"
			customBodyFromMultipartData={createMultipartBody}
		/>
	)
}
