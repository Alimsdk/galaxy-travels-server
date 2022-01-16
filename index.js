const express=require('express');
const app=express();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');
const port=process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofdnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);
console.log(uri);

app.use(cors());
app.use(express.json());

async function run() {
    try {
      await client.connect();
      const database = client.db("galaxyTravels");
      const services = database.collection("services");
      const packages=database.collection('packages');
      const aboutUs=database.collection('aboutus');
      const tickets=database.collection('tickets');

     app.get('/services',async(req,res)=>{

        const cursor=services.find({});

        const result=await cursor.toArray();

        res.send(result);
     })

     app.get('/services/:id', async (req, res) => {
        const id = req.params.id;
        console.log('getting specific service', id);
     
        const service = await services.findOne({ _id: ObjectId(id) });
        res.send(service);
    })
     app.get('/packages/:id', async (req, res) => {
        const id = req.params.id;
        console.log('getting specific service', id);
     
        const package = await packages.findOne({ _id: ObjectId(id) });
        res.send(package);
    })

     app.get('/packages',async(req,res)=>{

        const cursor=packages.find({});

        const result=await cursor.toArray();

        res.send(result);
     })

     app.get('/aboutus',async(req,res)=>{

        const cursor=aboutUs.find({});

        const result=await cursor.toArray();

        res.send(result);
     })

     app.post('/tickets',async(req,res)=>{
        const ticketsInfo=req.body;
        console.log(ticketsInfo);
        const result=await tickets.insertOne(ticketsInfo)
          res.json(result);
     })
     
     app.get('/tickets',async(req,res)=>{
      const cursor = tickets.find({});
      const ticketInfo = await cursor.toArray();
      res.send(ticketInfo);
     })

     app.get('/tickets/:id', async (req, res) => {
      const id = req.params.id;
      console.log('getting specific service', id);
   
      const ticketInfo = await tickets.findOne({ _id: ObjectId(id) });
      res.send(ticketInfo);
  })

  app.delete('/tickets/:id',async(req,res)=>{
     const id=req.params.id;
     const query = { _id: ObjectId(id) };
     const result=await tickets.deleteOne(query);
     res.json(result)
  })
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Hello from Galaxy-Travels-Server');
})

app.listen(port,()=>{
   console.log('listening to port',port);
})