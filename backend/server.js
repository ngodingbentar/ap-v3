import express from 'express'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import productRouter from './routers/productRouter.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRouter.js'
import awsRoute from './routers/uploadRoute.js'
import categoriesRouter from './routers/categoriesRoute.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
Mongoose.connect(process.env.MONGODB_URL || process.env.MONGODB_URL_LOCAL || 'mongodb+srv://aruspinggir:admin@ecommerce.iclbk.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  bufferCommands: false,
})

app.use('/api/uploads', awsRoute)
app.use('/api/categories', categoriesRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//   res.send('server is ready')
// })
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message})
})
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})