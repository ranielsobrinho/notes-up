import "reflect-metadata";
import * as express from 'express'

import routes from './routes'
import './domain/connect'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/api',routes)
app.listen(port, () => console.log(`Server is running on port ${port}`))

export default app