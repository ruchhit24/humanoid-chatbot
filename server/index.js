const express = require ("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv= require("dotenv");
const chatRoutes = require("./routes/chatRoutes")
const server = express();

server.use(cors());
server.use(bodyParser.json());

dotenv.config();

server.use("/",chatRoutes)

const port = 8080 || process.env.PORT;
server.listen(port,()=>{
    console.log(`server is running on port =${port}`)
})
