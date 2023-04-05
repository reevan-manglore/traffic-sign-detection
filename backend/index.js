const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const video = require("./routes/video.js")

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"));
app.use(cors());

app.use("/api/video",video);



app.listen(port, () => console.log(`server sucessfully started ${port}`));

