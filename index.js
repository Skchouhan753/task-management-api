// npm install express mongoose dotenv joi cors morgan
// npm install --save-dev nodemon
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api', taskRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
