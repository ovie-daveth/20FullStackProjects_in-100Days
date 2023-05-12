const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require("./mongoose");
const User = require('./mongoose');

const app = express();
const port = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("hello world!");
  });

//middleware



app.post("/api/register", async (req, res) => {
 
  console.log(req.body)
  try {
     const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photourl: req.body.photourl,
    })
    res.json(user)
  } catch (error) {
    console.log(error)
    res.json({status: 'error', error: "Duplicate email address"})
  }
})

app.post('/api/login', async (req, res)=> {
      const user = await User.findOne({
          email: req.body.email, 
          password: req.body.password
         })
         if(user){
          return res.json({status: 'ok', user: true});
         } else{
          return res.json({status: 'error', user: false});
         }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
