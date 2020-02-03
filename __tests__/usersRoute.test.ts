require('dotenv').config()
import supertest, { SuperTest, Response } from 'supertest'
import app from '../src/app'
import injectMongo, { client } from '../src/db'

let request: SuperTest<any> = supertest(app)
let authCookie: string[]
beforeAll(async (done) => {
	const mongoURI = process.env.MONGO_JEST_URI || ''
	await injectMongo(mongoURI)
	done()
})

afterAll(async (done) => {
	await client.close()
	done()
})

describe('Users API', () => {
	describe('User Authentication', () => {
		it('registers new account successfully', (done) => {
			request
				.post('/auth/register')
				.send({
					email: 'firstman@example.com',
					username: 'firstman',
					password: 'C00lc4t123$%^',
				})
				.expect(200, done)
		})

		it('error on registering with pre-existing email or username', (done) => {
			request
				.post('/auth/register')
				.send({
					email: 'firstman@example.com',
					username: 'firstman',
					password: 'C00lc4t123$%^',
				})
				.expect(400, done)
		})

		it('error on invalid user registration', (done) => {
			request
				.post('/auth/register')
				.send({
					email: 'bad email',
					username: 'bad username',
					password: 'abc123',
				})
				.expect(400, done)
		})

		it('pre-existing user logs in successfully', (done) => {
			request
				.post('/auth/login')
				.send({ email: 'firstman@example.com', password: 'C00lc4t123$%^' })
				.expect(200)
				.end((err: Error, res: Response) => {
					if (err) throw err
					authCookie = res.get('Set-Cookie')
					done()
				})
		})

		it('logs in pre-existing user', (done) => {
			request
				.post('/auth/login')
				.send({ email: 'firstman@example.com', password: 'C00lc4t123$%^' })
				.expect(200)
				.end((err: Error, res: Response) => {
					if (err) throw err
					authCookie = res.get('Set-Cookie')
					if (!authCookie) throw new Error('Unable to get authCookie')
					done()
				})
		})

		it('error on invalid login', (done) => {
			request
				.post('/auth/login')
				.send({ email: 'firstman@example.com', password: 'badpassword' })
				.expect(400, done)
		})

		it('logs out successfully', (done) => {
			request
				.post('/auth/logout')
				.set({ Cookie: authCookie })
				.expect(200)
				.end((err: Error, res: Response) => {
					if (err) throw err
					done()
				})
		})

		it('forbidden to logout when not logged in', (done) => {
			request.post('/auth/logout').expect(403, done)
		})

		it('can delete pre-existing users', (done) => {
			request
				.post('/auth/deleteuser')
				.set({ Cookie: authCookie })
				.send({ password: 'C00lc4t123$%^' })
				.expect(200, done)
		})

		it('forbidden to delete non-existant users', (done) => {
			request
				.post('/auth/deleteuser')
				.send({ password: 'password of nonexistant user' })
				.expect(403, done)
		})
	})

	// describe('User Info', () => {
	// 	it('gets list of users',  (done) => {})
	// 	it('gets user by ID',  (done) => {})
	// })

	// describe('User Activity', () => {
	// 	it('successfully follow other users',  (done) => {})
	// 	it('gets user by ID',  (done) => {})
	// })

	// describe('Account Management', () => {
	// 	it('deletes user account successfully',  (done) => {})
	// })
})
