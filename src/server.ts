require('dotenv').config()
import app from './app'
import injectMongoIntoModels from './db'

injectMongoIntoModels().then(() => {
	app.listen(3000, () => {
		console.log('Server started on port 3000.')
	})
})
