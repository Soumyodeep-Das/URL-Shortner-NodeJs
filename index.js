const express = require("express")
const { connectMongoDb } = require("./connections/url")

const DB_URL = 'mongodb://127.0.0.1:27017/url-shortner'
connectMongoDb(DB_URL)

const app = express()
const PORT = 8000

app.use(express.json())

const urlRoute = require("./routes/url")
app.use("/url", urlRoute)

app.listen(PORT, () => console.log(`Server has started on PORT: ${PORT}`))