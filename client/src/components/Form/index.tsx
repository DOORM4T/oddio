import React, { useState, ChangeEvent, FormEvent, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Form.module.scss'

export default function Form({
	action,
	method,
	fields,
	submitText,
	submitStateValidation,
	redirect,
	customBodyFromMultipartData,
}: FormProps) {
	const [formState, setFormState] = useState(
		Object.fromEntries(fields.map(({ name }) => [name, '']))
	)
	const history = useHistory()
	const formRef = useRef<any>(null)
	const fileRef = useRef<any>(null)

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target
		setFormState((prevState) => {
			return { ...prevState, [name]: value }
		})
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault()

			// Optional custom validation
			if (submitStateValidation) submitStateValidation(formState)

			let body, response
			if (customBodyFromMultipartData) {
				body = customBodyFromMultipartData(formState, fileRef.current.files)
				response = await fetch(action, {
					method,
					body,
				})
			} else {
				// Default form POST
				body = JSON.stringify(formState)
				response = await fetch(action, {
					method,
					body,
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}

			const responseText = await response.json()
			console.log(responseText)

			formRef.current.reset()
			if (redirect && response.status === 200) history.push(redirect)
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
			ref={formRef}
		>
			{fields.map(
				({ name, placeholder, type, required, options, accept }, index) => {
					return (
						<div key={`${name}-${type}-${index}`}>
							{type === 'select' ? (
								<select
									onChange={handleChange}
									id={name}
									name={name}
									placeholder={placeholder}
									required={required}
								>
									{options?.map((option, index) => (
										<option value={option} key={`${option}-${index}`}>
											{option}
										</option>
									))}
								</select>
							) : type === 'textarea' ? (
								<textarea
									id={name}
									name={name}
									placeholder={placeholder}
									required={required}
									onChange={handleChange}
									maxLength={300}
								></textarea>
							) : type === 'file' ? (
								<input
									id={name}
									name={name}
									type="file"
									required={required}
									accept={accept}
									ref={fileRef}
								/>
							) : (
								<input
									id={name}
									name={name}
									type={type}
									placeholder={placeholder}
									required={required}
									onChange={handleChange}
								/>
							)}
							<label htmlFor={name}>{placeholder}</label>
						</div>
					)
				}
			)}

			<button type="submit">{submitText}</button>
		</form>
	)
}

export interface Field {
	name: string
	placeholder: string
	type: string
	required: boolean
	options?: string[]
	accept?: string
}

interface FormProps {
	action: string
	method: string
	fields: Field[]
	submitText: string
	submitStateValidation?: (formState: any) => void
	customBodyFromMultipartData?: (formState: any, files: File[]) => any
	redirect?: string
}
