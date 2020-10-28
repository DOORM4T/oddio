import express, {
	Application,
	Request,
	Response,
	NextFunction,
	CookieOptions,
} from 'express'
import cookieParser from 'cookie-parser'
import routes from './routes/index.route'
import { resolve } from 'path'

const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
// Serve Client
app.use(express.static(resolve(__dirname, '../build')))

app.use('/', routes)

app.use('/*', (req: Request, res: Response, next: NextFunction) => {
	res.sendFile(resolve(__dirname, '../build/index.html'))
})

export default app
