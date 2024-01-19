require('dotenv/config');

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors({origin : true}));
app.use(express.json());


app.get('/', (req, res) => {
    return res.json("hi there...");
});


const userRoutes = require('./routes/auth')
app.use("/api/users" , userRoutes )

// artist
const artistRoutes = require('./routes/artist')
app.use("/api/artist" , artistRoutes )

const albumstRoutes = require('./routes/albums')
app.use("/api/albums" , albumstRoutes )

const songRoutes = require('./routes/songs');
app.use("/api/songs" , songRoutes )



// Use process.env.DB_STRING directly
mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true,

});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
}).on("error", (error) => {
    console.log('MongoDB connection error:', error);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

