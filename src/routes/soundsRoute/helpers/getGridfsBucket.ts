import { Request } from 'express'
import { GridFSBucket } from 'mongodb'

// Get the GridFS bucket instance from the Express app, available from the Request object
export default function getGridfsBucket(req: Request): GridFSBucket {
	return req.app.locals.bucket
}
