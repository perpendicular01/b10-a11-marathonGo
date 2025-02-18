const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const port = process.env.PORT || 5000;
const app = express()


app.use(cors())
app.use(express.json())

const userName = process.env.DB_USER
const password = process.env.DB_PASS

// console.log(userName, password)


const uri = `mongodb+srv://${userName}:${password}@cluster0.oi6ry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

  

app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, ()=> {
    console.log(`server is running on port: ${port}`)
})
