export default async function playSound(source_id: string) {
	const response = await fetch(`api/sounds/uploads/${source_id}`, {
		headers: { 'Content-Type': 'audio/mpeg' },
	})
	const data = await response.blob()
	const reader = new FileReader()
	reader.onloadend = (e) => {
		new Audio(reader.result?.toString()).play()
	}
	reader.readAsDataURL(data)
}
