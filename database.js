const { DB_USER, DB_PASSWORD } = require('./config');

const { MongoClient } = require('mongodb');

let database;

const mongoConnect = async (callback) => {
  const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@wilga-net.6jqgogy.mongodb.net/?retryWrites=true&w=majority&appName=wilga-net`;
  
  const client = new MongoClient(uri);

  try {
    await client.connect();
    database = client.db('shop');
    console.log('Connection to the database has been established.');
    callback(); // informacja, że połączenie gotowe
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error('No database found.');
  }
  return database;
};

module.exports = {
  mongoConnect,
  getDatabase
};
