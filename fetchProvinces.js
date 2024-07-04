const { MongoClient } = require('mongodb');
require('dotenv').config();

// Obtener las variables de entorno
const uri = process.env.MONGODB_URI;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: user,
    password: password
  }
});

async function run() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const database = client.db('provincesDB');
    const collection = database.collection('provinces');

    const provinces = await collection.find({}).toArray();
    console.log('Provincias:', provinces);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
