import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default function validationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.cookies.authToken
		if (!token) throw new Error('No token provided.')

		const secret = process.env.JWT_SECRET || ''
		const decoded: Object | null = verify(token, secret)
		if (!('email' in decoded)) new Error('Invalid token.')
		next()
	} catch (error) {
		res.status(403).send('You cannot pass.')
		next(error)
	}
}
