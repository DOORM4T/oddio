import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import validate from './middleware/validationMiddleware'
const router = Router()

router.get('/api/users', UsersController.getUsers)
router.get('/api/users/:username', UsersController.getUserByUsername)

router.post('/auth/register', UsersController.registerUser)
router.post('/auth/login', UsersController.loginUser)
router.delete('/auth/logout', validate, UsersController.logoutUser)
router.delete('/auth/deleteuser', validate, UsersController.deleteUser)

router.post('/api/users/:username/soundboards/create', validate, UsersController.createSoundboard)
router.put('/api/users/:username/soundboards/:soundboardId/addsound', validate, UsersController.addSoundToSoundboard)
router.get('/api/users/:username/soundboards/:soundboardId', validate, UsersController.getSoundboardById)
router.delete('/api/users/:username/soundboards/:soundboardId/deletesound', validate, UsersController.deleteSoundFromSoundboard)

export default router
