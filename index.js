const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5f7tq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        console.log("connect to database");

        const database = client.db("genius-car-mechanics");
        const servicesCollection = database.collection("services");


        //get api
        app.get('/services',async(req,res)=>{
            const cursor = servicesCollection.find({});
            const services =await cursor.toArray();
            res.send(services);
        })


        //post api
        app.post('/services',async(req,res)=>{
            const service = req.body;
            console.log(service);
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);
        })



    }finally{
        // await client.close();
    }
}
run().catch(console.dir);


app.get ('/',(req,res)=>{
    res.send(" Genius server is running");
});


app.listen(port,()=>{
    console.log("Running on genius server on port", port);
})