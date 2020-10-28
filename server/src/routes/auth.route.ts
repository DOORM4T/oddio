import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import validate from './middleware/validationMiddleware'
const router = Router()

router.post('/register', UsersController.registerUser)
router.post('/login', UsersController.loginUser)
router.delete('/logout', validate, UsersController.logoutUser)
router.delete('/deleteuser', validate, UsersController.deleteUser)

export default router
