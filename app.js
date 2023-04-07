const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const multer = require('multer');
// const path = require('path');

const app = express()

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message })
})

// const tempDir = path.join(__dirname, "temp");

// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
//   limits: 10240 
// })

// const upload = multer({
//   storage: multerConfig
// })

// upload.single("image")

module.exports = app
