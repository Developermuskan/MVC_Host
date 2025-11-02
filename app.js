// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db');
const User = require('./models/userModel'); // Import model

const app = express();
app.use(express.json());
app.use(cors());

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/users', userRoutes);

// ✅ Auto-create tables if not present
sequelize
  .sync({ alter: true }) // use alter:true for safe schema updates
  .then(() => console.log('✅ Tables synced with database'))
  .catch((err) => console.error('❌ Table sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
