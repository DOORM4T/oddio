import express, {
	Application,
	Request,
	Response,
	NextFunction,
	CookieOptions,
} from 'express'
import cors from 'cors'
import cookieParser, { CookieParseOptions } from 'cookie-parser'
import routes from './routes/index.route'
import { resolve } from 'path'

const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', resolve(__dirname, '../views'))
app.use('/', routes)
app.use('/*', (req: Request, res: Response, next: NextFunction) => {
	res.status(404).send('Page not found')
})

export default app
