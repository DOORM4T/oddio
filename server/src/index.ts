import app from './app'
import injectMongoIntoModels from './db'

if (process.env.NODE_ENV === 'development') require('dotenv').config()
if (!process.env.MONGO_URI) {
	console.error('Missing environment variables.')
	process.exit(1)
}

export const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGO_URI || ''
injectMongoIntoModels(mongoURI).then(() => {
	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}.`)
	})
})
