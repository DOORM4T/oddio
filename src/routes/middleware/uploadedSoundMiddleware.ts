import multer from 'multer'

const uploadedSoundMiddleware = multer({ limits: { files: 1 } }).single(
	'uploadedSound'
)

export default uploadedSoundMiddleware
