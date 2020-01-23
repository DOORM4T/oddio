import { Request } from 'express'
import { Db, Collection } from 'mongodb'

// Get the 'sounds' collection from the MongoDB database instance via the Express app, available from the Request object
export default function getSoundsCollection(req: Request): Collection {
	const db: Db = req.app.locals.db
	return db.collection('sounds')
}
