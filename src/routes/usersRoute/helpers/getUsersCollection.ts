import { Request } from 'express'
import { Collection, Db } from 'mongodb'

export default function getUsersCollection(req: Request): Collection {
	const db: Db = req.app.locals.db
	return db.collection('users')
}
