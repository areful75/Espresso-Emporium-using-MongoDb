const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Espresso-Emporium-using-MongoDb
// TF1pcPLX8gndcH1E



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2uae3f8.mongodb.net/?appName=Cluster0`;

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
    const coffeesCollection = client.db('espresso-emporium').collection('coffees');//creating collection


    app.get('/coffees', async (req, res) => {
        const cursor = coffeesCollection.find();//getting data from database
        const result = await cursor.toArray();
        res.send(result);
    });//getting data from database


    app.post('/coffees', async (req, res) => {
    const newCoffee = req.body;
      //console.log(newCoffee);
        const result = await coffeesCollection.insertOne(newCoffee);//adding data to database
        res.send(result);
    });

    app.delete('/coffees/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.deleteOne(query);//deleting data from database
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
