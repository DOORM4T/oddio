import express, { Application, Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import routes from './routes/index.route'
import { resolve } from 'path'

const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', resolve(__dirname, '../views'))
app.use('/', routes)
app.use('/*', (req: Request, res: Response, next: NextFunction) => {
	res.status(404).send('Page not found')
})
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(error.message)
})

export default app
