const express = require("express");
const app = express();
const cors = require("cors");
const stytch = require("stytch");
const dotenv = require('dotenv')
dotenv.config();
const PORT =5001 
app.use(cors());
app.use(express.json());


app.listen(PORT,() => console.log(`http://localhost:${PORT}`));