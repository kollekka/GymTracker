require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const exercises = require('./config/apiGym');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/exercises', exercises);
app.use('/api/auth', authRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));


app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('[ERR]', err.message);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
});
