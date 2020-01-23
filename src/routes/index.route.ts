import { Router, Request, Response, NextFunction } from 'express'
import soundsRoute from './soundsRoute/index'

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
	const data: number[] = [1, 2, 3]
	res.render('pages/index', { name: 'Steve', data })
})

router.use('/sounds', soundsRoute)

export default router
