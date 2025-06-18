const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv') 
const mongoose = require('mongoose')
const helmet = require('helmet');

const routes = require('./Routes/routes')

dotenv.config()

// port the server runs on
const PORT = process.env.PORT || 8080

// for decoding json and form data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cors setup
app.use("/Public", cors(), express.static("Public"))

const whitelist = ['http://localhost:5173', 'https://midhunreddys.github.io/nxtwave-frontend']
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
 
app.use("/",cors())

// security middleware
app.use(helmet());

// Routes
app.use('/', routes)

// mongo db connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => { console.log("Successfully connected to database") })
    .catch(error => {
        console.log("[-] Mongoose error")
        console.log(error)
    })


app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})

// for avoiding server crash on error
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  })