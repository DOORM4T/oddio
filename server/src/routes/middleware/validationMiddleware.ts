import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default function validationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const secret = process.env.JWT_SECRET || ''
	try {
		const token = req.cookies.authToken
		if (!token) throw new Error('No token provided.')

		const decoded: any = verify(token, secret)
		if (!(decoded || 'email' in decoded || 'username' in decoded))
			throw new Error('Invalid token.')
		res.locals.userEmail = decoded.email
		res.locals.username = decoded.username
		next()
	} catch (error) {
		res
			.status(403)
			.clearCookie('authToken')
			.clearCookie('user')
			.send('You cannot pass.')
		next(error)
	}
}
