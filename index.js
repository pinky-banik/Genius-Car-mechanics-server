const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


const uri = "mongodb+srv://process.env.DB_USER:process.env.PASSWORD@cluster0.5f7tq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


app.get ('/',(req,res)=>{
    res.send(" Genius server is running");
});


app.listen(port,()=>{
    console.log("Running on genius server on port", port);
})