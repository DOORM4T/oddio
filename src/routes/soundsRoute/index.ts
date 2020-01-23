import { Router } from 'express'
import getSounds from './getSounds'
import getUploadedSoundById from './getUploadedSoundById'
import getSoundDataByid from './getSoundDataByid'
import addSound from './addSound'
import deleteSoundById from './deleteSoundById'
import updateSoundById from './updateSoundById'

const router = Router()

router.use(
	'/',
	getSounds,
	getUploadedSoundById,
	getSoundDataByid,
	addSound,
	deleteSoundById,
	updateSoundById
)

export default router
