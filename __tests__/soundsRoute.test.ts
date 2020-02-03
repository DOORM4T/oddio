require('dotenv').config()
import supertest, { SuperTest, Response } from 'supertest'
import app from '../src/app'
import injectMongo, { client } from '../src/db'
import soundSchema, { Sound } from '../src/models/schemas/soundSchema'
import path from 'path'
import { ObjectId } from 'mongodb'

const request: SuperTest<any> = supertest.agent(app)
let authCookie: string[]

beforeAll(async (done) => {
	try {
		const mongoURI = process.env.MONGO_JEST_URI || ''
		await injectMongo(mongoURI)

		request
			.post('/auth/register')
			.send({
				email: 'test@example.com',
				username: 'test',
				password: 'Abc123$%^',
			})
			.expect(200)
			.end((err: Error, res: Response) => {
				if (err) throw err
				request
					.post('/auth/login')
					.send({ email: 'test@example.com', password: 'Abc123$%^' })
					.expect(200)
					.end((err: Error, res: Response) => {
						if (err) throw err
						authCookie = res.get('Set-Cookie')
						done()
					})
			})
	} catch (error) {
		console.error(error)
	}
})

afterAll((done) => {
	try {
		request
			.post('/auth/deleteuser')
			.send({ password: 'Abc123$%^' })
			.set({ Cookie: authCookie })
			.expect(200)
			.end(async (err: Error, res: Response) => {
				if (err) throw err
				await client.close()
				done()
			})
	} catch (error) {
		console.error(error)
	}
})

describe('Sounds API', () => {
	let testSoundId: string, testSoundSourceId: string

	describe('POST requests on /api/sounds', () => {
		it('successfully POSTs valid form data', async (done) => {
			request
				.post('/api/sounds/add')
				.set({ 'Content-Type': 'multipart/form-data', Cookie: authCookie })
				.field('name', 'testSound')
				.attach(
					'uploadedSound',
					path.resolve('__tests__', 'testAudio', 'testAudio1.mp3')
				)
				.expect(200)
				.end((err: Error, res: Response) => {
					if (err) throw err
					const postedData: Sound = res.body.ops[0]
					testSoundId = postedData._id
					testSoundSourceId = postedData.sourceId
					done()
				})
		})

		it('rejects form data missing uploadedSound', (done) => {
			request
				.post('/api/sounds/add')
				.set({ 'Content-Type': 'multipart/form-data', Cookie: authCookie })
				.field('author', 'Dandelion')
				.expect(400, done)
		})
	})

	describe('PUT requests on /api/sounds', () => {
		it('successfully updates JSON fields', (done) => {
			request
				.put(`/api/sounds/${testSoundId}`)
				.set({ Cookie: authCookie })
				.send({
					name: 'updated name',
					fame: 2,
				})
				.expect(200, done)
		})

		it('error if requested ID is invalid', (done) => {
			request
				.put(`/api/sounds/badelot`)
				.set({ Cookie: authCookie })
				.send({ author: 'knight of the bad ID' })
				.expect(400, done)
		})

		it('successfully updates uploaded sound by SourceID', (done) => {
			request
				.put(`/api/sounds/uploads/${testSoundSourceId}`)
				.set({ 'Content-Type': 'multipart/form-data', Cookie: authCookie })
				.attach(
					'uploadedSound',
					path.resolve('__tests__', 'testAudio', 'testAudio2.mp3')
				)
				.expect(200, done)
		})

		it('error if requested SourceID is invalid', (done) => {
			request
				.put(`/api/sounds/uploads/potatoes`)
				.set({ 'Content-Type': 'multipart/form-data', Cookie: authCookie })
				.attach(
					'uploadedSound',
					path.resolve('__tests__', 'testAudio', 'testAudio2.mp3')
				)
				.expect(400, done)
		})
	})

	describe('GET requests on /api/sounds', () => {
		it('gets all sound JSON', (done) => {
			request
				.get('/api/sounds')
				.expect(200)
				.end((err: Error, res: Response) => {
					if (err) throw err
					expect(res.body.length).toBeGreaterThan(0)
					done()
				})
		})

		it('gets sound JSON by ID', (done) => {
			request
				.get(`/api/sounds/${testSoundId}`)
				.expect(200)
				.end((err: Error, res: Response) => {
					if (err) throw err
					expect(soundSchema.isValidSync(res.body)).toBeTruthy()
					done()
				})
		})

		it('error if requested ID is invalid', (done) => {
			request.get(`/api/sounds/abc123thisisabadid`).expect(400, done)
		})

		it('gets audio stream by SourceID', (done) => {
			request
				.get(`/api/sounds/uploads/${testSoundSourceId}`)
				.expect('Content-Type', 'audio/mpeg')
				.expect('Accept-Ranges', 'bytes')
				.expect(200, done)
		})

		it('error if requested SourceID is invalid', (done) => {
			request.get(`/api/sounds/uploads/badsourceid`).expect(400, done)
		})
	})

	describe('DELETE requests on /api/sounds', () => {
		it('successfully deletes by ID', (done) => {
			request
				.delete(`/api/sounds/${testSoundId}`)
				.set({ Cookie: authCookie })
				.expect(200, done)
		})

		it('error if requested ID is invalid', (done) => {
			request
				.delete('/api/sounds/hocuspocusthisisabadid-us')
				.set({ Cookie: authCookie })
				.expect(400, done)
		})
	})
})
