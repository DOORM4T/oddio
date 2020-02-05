import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import SoundsModel from './models/SoundsModel'
import UsersModel from './models/UsersModel'

// Exported for testing
export let client: MongoClient

/**
 * Connects to MongoDB and injects the resulting client database into models for accessing data
 */
export default async function injectMongoIntoModels(
	mongoURI: string
): Promise<void> {
	try {
		const mongoOptions: MongoClientOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			wtimeout: 2500,
		}
		client = await MongoClient.connect(mongoURI, mongoOptions)
		const db: Db = client.db()
		SoundsModel.injectDB(db)
		UsersModel.injectDB(db)
	} catch (error) {
		await client.close()
		console.error(error)
		process.exit(1)
	}
}
