import { Router } from 'express'
import UsersController from '../controllers/UsersController'
const router = Router()

router.get('/api/users', UsersController.getUsers)
router.post('/register', UsersController.registerUser)
router.post('/login', UsersController.loginUser)

export default router
