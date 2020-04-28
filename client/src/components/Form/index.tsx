import React, {
	useState,
	ChangeEvent,
	FormEvent,
	useRef,
	RefObject,
	useContext,
} from 'react'
import { useHistory } from 'react-router-dom'
import styles from './Form.module.scss'
import Button from '../Button'
import Spacing from '../Spacing'
import useRefreshUserData from '../../util/useRefreshUserData'

export default function Form({
	action,
	method,
	fields,
	submitText,
	formIsValid,
	redirect,
	customBodyFromMultipartData,
}: FormProps) {
	const [formState, setFormState] = useState(
		Object.fromEntries(fields.map(({ name }) => [name, '']))
	)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const history = useHistory()
	const formRef = useRef<any>(null)
	const fileRef = useRef<any>(null)
	const refreshUserData = useRefreshUserData()

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = event.target

		// Optional custom validation
		if (formIsValid && !formIsValid(formRef, formState)) return

		setFormState((prevState) => {
			return { ...prevState, [name]: value }
		})
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault()

			let body, response
			if (customBodyFromMultipartData) {
				body = customBodyFromMultipartData(formState, fileRef.current.files)
				response = await fetch(action, {
					method,
					body,
				})
			} else {
				// Default form POST
				// console.log(formState)

				body = JSON.stringify(formState)
				response = await fetch(action, {
					method,
					body,
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}

			const responseData = await response.json()
			// console.log(responseData)

			if (response.status === 200) {
				formRef.current.reset()
				if (redirect) history.push(redirect)
				else refreshUserData()
			} else {
				window.location.reload()
			}
		} catch (error) {
			setErrorMessage(() => 'Invalid input.')
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
				(
					{
						name,
						placeholder,
						type,
						options,
						accept,
						pattern,
						invalidTitle,
						required,
					},
					index
				) => {
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
									onChange={handleChange}
									maxLength={300}
									required={required}
								></textarea>
							) : type === 'file' ? (
								<input
									id={name}
									name={name}
									type="file"
									accept={accept}
									ref={fileRef}
									pattern={pattern}
									title={invalidTitle}
									required={required}
								/>
							) : (
								<input
									id={name}
									name={name}
									type={type}
									placeholder={placeholder}
									onChange={handleChange}
									pattern={pattern}
									title={invalidTitle}
									required={required}
								/>
							)}
							<label htmlFor={name}>{placeholder}</label>
						</div>
					)
				}
			)}
			<p className={styles.errorMessage}>{errorMessage}</p>
			<Spacing spaces={2} />
			<Button type="submit">{submitText}</Button>
		</form>
	)
}

export interface Field {
	name: string
	placeholder: string
	type: string
	pattern?: string
	invalidTitle?: string
	options?: string[]
	accept?: string
	required?: boolean
}

interface FormProps {
	action: string
	method: string
	fields: Field[]
	submitText: string
	formIsValid?: (formRef: RefObject<any>, formState: any) => boolean
	customBodyFromMultipartData?: (formState: any, files: File[]) => any
	redirect?: string
}
