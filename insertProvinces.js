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

const provinces = [
  { name: 'Azua', population: 214311 },
  { name: 'Baoruco', population: 97095 },
  { name: 'Barahona', population: 187105 },
  // Agrega todas las provincias aquí
];

async function run() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');

    const database = client.db('provincesDB');
    const collection = database.collection('provinces');

    const result = await collection.insertMany(provinces);
    console.log(`${result.insertedCount} provincias insertadas`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
