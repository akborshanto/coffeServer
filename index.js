//password
//
//TmprSB4o0T3WRwFI

const express=require('express')
require('dotenv').config()
const cors=require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
const port=process.env.PORT || 5000;

/* middleware */
app.use(cors())
app.use(express.json())

/* ===========MONGODB============================ */


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.phei2xm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
//const uri = "mongodb+srv://clientCoffe:TmprSB4o0T3WRwFI@cluster1.phei2xm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
//3333333====DATABASE NAME
const coffeeCollection=client.db('CoffeDB').collection('coffe')


/* 11111111111111========POST METHOD==== */
app.post('/addCoffe',async(req,res)=>{


  const newCoffe=req.body;
  console.log(newCoffe)

  const result=await coffeeCollection.insertOne(newCoffe)
  res.send(result)
})


/* data pawar jonno */
app.get('/coffe',async (req,res)=>{

  const cursor=coffeeCollection.find();
  const result=await cursor.toArray();
  res.send(result)
})
/* data delete korar jnno */
app.delete('/coffe/:id',async (req,res)=>{


  const id=req.params.id;
  console.log(id)
  const query={_id:new ObjectId(id)}
  const result=await coffeeCollection.deleteOne(query)
  res.send(result)
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  //  / await client.close();
  }
}
run().catch(console.dir);

/* ================================= */
/* app */
app.get('/',(req,res)=>{
    res.send('COFFE MAKING SERVER IS RUNNINGsdfsdfds')
})
app.listen(port,()=>{
    console.log('coffe server is running on port 5000')
})