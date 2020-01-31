import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default function validationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.body.token) throw new Error('No token provided.')

		const decoded: Object | null = verify(req.body.token, 'potatoes')
		if (!('email' in decoded)) new Error('Invalid token.')
		next()
	} catch (error) {
		res.status(403).send('You cannot pass.')
		return next(error)
	}
}
