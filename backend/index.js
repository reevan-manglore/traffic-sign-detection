const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const mongoose = require('mongoose');

const video = require("./routes/video.js")

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL)
        .then(() => console.log("sucessfully connected to database"))
        .catch(() => console.log("an error occured while connecting to database"));


app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(express.static("public"));


app.use("/api/auth",require("./routes/auth.js"));
app.use("/api/video",video);




app.listen(port, () => console.log(`server sucessfully started ${port}`));

