const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT


app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello world!");
  });

//middleware

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
