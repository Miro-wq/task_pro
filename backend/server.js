require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const boardRoutes = require('./routes/boards');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swaggerOptions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// rute de autentificare
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});