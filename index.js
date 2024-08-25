const express = require('express');
const userRoutes=require("./routes/userRoutes")
// const bodyParser=require('body-parser');
const cors = require('cors');
const app = express();
const mongoose=require('mongoose');
// const PORT = 5000;
app.use(express.json());
mongoose.connect(
    "mongodb+srv://vaishnavis2022eee:PROJ@cluster0.ykjc4.mongodb.net/"
).then(()=>{
    console.log("connected to database");
})

app.use(cors());
app.use("/user",userRoutes);
app.listen(1000,()=>{
    console.log("Server is running on port 1000");
})