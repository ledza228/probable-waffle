const express = require('express');
const graphqlHTTP = require("express-graphql");
const routes = require('./routes/postRoute.js')
const userRoutes = require('./routes/userRoute.js')
const path = require('path')
const { schemaComposer } = require('graphql-compose')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const graphqlSchema = require("./models/post");

mongoose.connect("mongodb://root:root@localhost")

const port = 4000

const app = express()
app.use(cors({
    origin : 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json());


// app.use('/api/user/', userRoutes)
// app.use('/', routes)
// console.log("dirdirdir: " + path.join(__dirname, '../uploads/'))
// app.use('/uploads', express.static('../uploads/'))

const schema = schemaComposer.buildSchema()

const root = {
    hello: () => {
        return "Hello world!";
    },
    graphqlSchema
}

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
    })
);

app.listen(port, ()=>{
    console.log("Server started!")
} );