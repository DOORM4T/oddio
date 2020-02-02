import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default function validationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.cookies.authToken
		if (!token) next(new Error('No token provided.'))

		const secret = process.env.JWT_SECRET || ''
		const decoded: any = verify(token, secret)
		if (!(decoded || 'email' in decoded || 'username' in decoded))
			next(new Error('Invalid token.'))
		res.locals.userEmail = decoded.email
		res.locals.username = decoded.username
		next()
	} catch (error) {
		res.status(403).send('You cannot pass.')
		next(error)
	}
}
