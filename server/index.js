const express = require('express');
const bodyParser = require( 'body-parser');
const cors = require('cors')

const app = express();

//Middleware

app.use(bodyParser.json());

app.use(cors());

const {connMongo, mongoClient} = require('./db.js');

// Database connection and
// making tha database available throughout app
// usage [ const collection = req.app.locals.collection; ]

connMongo().then(() => {

  const db = mongoClient.db("posts_db");
  const collection = db.collection('posts');

  app.locals.collection = collection;

  const posts = require('./routes/api/posts');
  app.use('/api/posts', posts);

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server started at port ${port}`));

}).catch(console.dir);
