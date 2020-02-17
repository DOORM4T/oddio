import React, { useState, ChangeEvent, FormEvent } from 'react'
import styles from './Form.module.scss'

export interface Field {
	name: string
	placeholder: string
	type: string
	required: boolean
}

interface FormProps {
	action: string
	method: string
	fields: Field[]
	submitText: string
	submitStateValidation?: (formState: any) => void
}

export default function Form({
	action,
	method,
	fields,
	submitText,
	submitStateValidation,
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

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault()

			// Optional custom state validation
			if (submitStateValidation) submitStateValidation(formState)

			const body = JSON.stringify(formState)
			const response = await fetch(action, {
				method,
				body,
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const message = await response.text()
			console.log(message)
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<form
			action={action}
			method={method}
			className={styles.form}
			onSubmit={handleSubmit}
		>
			{fields.map(({ name, placeholder, type, required }, index) => {
				return (
					<div key={`${name}-${type}-${index}`}>
						<input
							id={name}
							name={name}
							type={type}
							placeholder={placeholder}
							required={required}
							onChange={handleChange}
						/>
						<label htmlFor={name}>{placeholder}</label>
					</div>
				)
			})}

			<button type="submit">{submitText}</button>
		</form>
	)
}
