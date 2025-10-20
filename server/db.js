const {MongoClient, ServerApiVersion} = require("mongodb");

const uri = "mongodb+srv://Praboth:Praboth@cluster0.arhf7gj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    ServerApi           : {
        version             : ServerApiVersion.v1,
        strict              : true,
        deprecationErrors   : true,
    },
    compressors         : ["snappy"],
    timeoutMS           : 10000,
    maxPoolSize         : 50,
    minPoolSize         : 0,
    maxConnecting       : 2,
    maxIdleTimeMS       : 10000,
    waitQueueTimeoutMS  : 5000,
});

async function connMongo() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

  }finally{
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
}
// run().catch(console.dir);

module.exports = {
    mongoClient: client,
    connMongo};
