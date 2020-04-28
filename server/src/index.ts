require('dotenv').config()
import app from './app'
import injectMongoIntoModels from './db'

export const PORT = process.env.PORT || 3001
const mongoURI = process.env.MONGO_URI || ''
injectMongoIntoModels(mongoURI).then(() => {
	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}.`)
	})
})
