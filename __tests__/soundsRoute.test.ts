require('dotenv').config()
import supertest from 'supertest'
import app from '../src/app'
import injectMongo from '../src/db'
import soundSchema from '../src/models/schemas/soundSchema'
import path from 'path'

const request = supertest(app)

beforeAll(async () => {
	await injectMongo()
})

describe('POST requests on /sounds', () => {
	it('successfully POSTs valid sounds', async () => {
		const mockSound = await soundSchema.validate(
			{ author: 'Dandelion' },
			{ stripUnknown: true }
		)

		request(app)
			.post('/sounds/add')
			.set('Content-Type', 'multipart/form-data')
			.field('author', mockSound.author)
			.attach('uploadedSound', path.resolve('__tests__', 'testAudio1.mp3'))
			.expect(200)
			.end((err, res) => {
				if (err) throw err
				console.log(res.body)
			})
	})

	it('rejects invalid sound uploads', () => {
		request(app)
	})
})

describe('GET requests on /sounds', () => {
	it('responds with all sound JSON', () => {
		request(app)
			.get('/sounds')
			.expect(200)
			.end((err, res) => {
				if (err) throw err
				expect(res.body.length).toBeGreaterThan(0)
			})
	})
})
