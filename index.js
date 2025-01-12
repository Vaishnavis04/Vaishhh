// const express = require('express');
// const userRoutes=require("./routes/userRoutes")
// // const bodyParser=require('body-parser');
// const cors = require('cors');
// const app = express();
// const mongoose=require('mongoose');
// // const PORT = 5000;
// app.use(express.json());
// mongoose.connect(
//     "mongodb+srv://vaishnavis2022eee:PROJ@cluster0.ykjc4.mongodb.net/"
// ).then(()=>{
//     console.log("connected to database");
// })

// app.use(cors());
// app.use("/user",userRoutes);
// app.listen(1000,()=>{
//     console.log("Server is running on port 1000");
// })
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");

require('dotenv').config();  // Load environment variables from .env

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://your-mongodb-url-here')
    .then(() => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.error("Error connecting to database", err);
    });

// Routes
app.use("/user", userRoutes);

// Start the server
app.listen(1000, () => {
    console.log("Server is running on port 1000");
});
