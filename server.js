const express = require('express');
const dbConnect = require('./config/db')

const app = express();

// Establish database connection
dbConnect();

// Initialize middleware
app.use(express.json({
  extended: false // Accept body data
}));

app.get('/', (req, res) => res.json({
  message: 'Test W3Contacts API connection'
}));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});