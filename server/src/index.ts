require('dotenv').config()
import app from './app'
import injectMongoIntoModels from './db'

const mongoURI = process.env.MONGO_URI || ''
injectMongoIntoModels(mongoURI).then(() => {
	app.listen(3001, () => {
		console.log('Server started on port 3001.')
	})
})
