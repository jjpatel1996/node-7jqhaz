const config = require('config');
const { MongoClient } = require('mongodb');


let instance = null;
let client = null;

function connect() {
  return new Promise((resolve, reject) => {
    const MONGO_HOST = config.get('MONGO_HOST');
    const DATABASE = config.get('DATABASE');

    console.log(`Connecting to ${MONGO_HOST}`);
    client = new MongoClient(MONGO_HOST);
    client.connect((err) => {
      if (err) return reject(err);
      resolve(client.db(DATABASE));
    });
  });
}

async function getInstance() {
  try {
    if (instance === null || client === null) instance = await connect();
  } catch (e) {
    console.error(`Failed to connect to MongoDB server: ${e.message}`);
  }

  return instance;
}

module.exports = {
    getInstance
}