import { Router } from 'express'
import getSounds from './getSounds'
import getUploadedSoundById from './getUploadedSoundById'
import getSoundDataByid from './getSoundDataByid'
import addSound from './addSound'
import deleteSoundById from './deleteSoundById'

const router = Router()

router.use(
	'/',
	getSounds,
	getUploadedSoundById,
	getSoundDataByid,
	addSound,
	deleteSoundById
)

export default router
