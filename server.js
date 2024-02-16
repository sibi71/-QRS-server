const express = require('express')
const connectDB =require("./config/db");
const apiRouter =require("./routes");
const app = express()
const cors = require("cors")
const port = process.env.PORT || 4000;

connectDB();
app.use(express.json());

app.use(cors())

app.use("/api",apiRouter);

app.get('/', (req, res) => {
    res.send("server is working !")
})

app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`);
})