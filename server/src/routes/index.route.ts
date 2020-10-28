import { Router } from 'express'
import soundsRoute from './sounds.route'
import usersRoute from './users.route'
import authRoute from './auth.route'

const router = Router()

router.use('/api/sounds', soundsRoute)
router.use('/api/users', usersRoute)
router.use('/auth', authRoute)

export default router
