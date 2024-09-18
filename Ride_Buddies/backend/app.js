const express = require('express');
const app = express();

app.use(express.json());
const products = require('./routes/product')

app.use('/api/v1/',products)

module.exports = app;

// const port = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });