require('dotenv').config()
import app from './app'
import {
	MongoClient,
	GridFSBucket,
	MongoClientOptions,
	Db,
	GridFSBucketOptions,
	Server,
} from 'mongodb'

/**
 * Connects to MongoDB and injects the resulting client database and gridfs bucket into the express app as local variables
 */
const injectMongoIntoApp: Function = async function(): Promise<void> {
	try {
		const MONGO_URI: string = process.env.MONGO_URI || ''
		const mongoOptions: MongoClientOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			wtimeout: 2500,
		}
		const client = await MongoClient.connect(MONGO_URI, mongoOptions)
		const db: Db = client.db('oddioconcept')
		const gridfsOptions: GridFSBucketOptions = { bucketName: 'uploadedSounds' }
		const bucket: GridFSBucket = new GridFSBucket(db, gridfsOptions)

		app.locals.db = db
		app.locals.bucket = bucket
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

injectMongoIntoApp().then(() => {
	const server = app.listen(3000, () =>
		console.log('Server started on port 3000.')
	)
})
