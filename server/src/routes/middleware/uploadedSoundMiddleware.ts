import multer from 'multer'

const uploadedSoundMiddleware = multer({
	limits: { files: 1, fileSize: 5_000_000 },
}).single('uploadedSound')

export default uploadedSoundMiddleware
