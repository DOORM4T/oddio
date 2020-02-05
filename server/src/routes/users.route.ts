import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import validate from './middleware/validationMiddleware'
const router = Router()

router.get('/api/users', UsersController.getUsers)
router.post('/auth/register', UsersController.registerUser)
router.post('/auth/login', UsersController.loginUser)
router.post('/auth/logout', validate, UsersController.logoutUser)
router.post('/auth/deleteuser', validate, UsersController.deleteUser)

export default router
