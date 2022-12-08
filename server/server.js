const express = require("express");
const app = express()
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

//middleware

app.use(express.json()); // for req.body to be able to use json
app.use(cors());

//ROUTES
app.use("/user", require("./routes/user"));


app.get('/', (req, res) => {
  res.send('Grade It')
})


app.listen(PORT, () => {
  console.log('server is running on port 5000')
})