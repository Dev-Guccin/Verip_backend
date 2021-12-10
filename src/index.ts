import express from 'express' // 1
const app = express()

import usersRouter from './api/routes/user'

app.get('/', (req: express.Request, res: express.Response) => {
  // 2
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

app.use('/users', usersRouter)
