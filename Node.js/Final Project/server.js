import express from 'express';

import databaseRouters from './routers/databaseRouters.js';

import { connectDB } from './config/database.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/database', databaseRouters);

await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
