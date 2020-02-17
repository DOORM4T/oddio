import React, { useState, ChangeEvent } from 'react'
import styles from './Form.module.scss'

export interface Field {
	name: string
	type: string
	required: boolean
}

interface FormProps {
	action: string
	method: string
	fields: Field[]
	submitText: string
}

export default function Form({
	action,
	method,
	fields,
	submitText,
}: FormProps) {
	const [formState, setFormState] = useState(
		Object.fromEntries(fields.map(({ name }) => [name, '']))
	)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormState((prevState) => {
			return { ...prevState, [name]: value }
		})
	}

	return (
		<form action={action} method={method} className={styles.form}>
			{fields.map(({ name, type, required }, index) => {
				return (
					<div key={`${name}-${type}-${index}`}>
						<input
							id={name}
							name={name}
							type={type}
							placeholder={name}
							required={required}
							onChange={handleChange}
						/>
						<label htmlFor={name}>{name}</label>
					</div>
				)
			})}

			<button type="submit">{submitText}</button>
		</form>
	)
}
