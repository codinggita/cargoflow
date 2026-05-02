const connectDB = require('./src/config/db');
const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB (Vercel will reuse this connection if the function stays warm)
let cachedDb = null;

const handler = async (req, res) => {
  if (!cachedDb) {
    cachedDb = await connectDB();
  }
  return app(req, res);
};

module.exports = handler;
