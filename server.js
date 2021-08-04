const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extend: false }));

// Todo Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/inventory', require('./routes/api/inventory'));
app.use('/api/wishlist', require('./routes/api/wishlist'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/headerimage', require('./routes/api/headerimage'));
app.use('/api/blogs', require('./routes/api/blogs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
