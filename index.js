// create app
const express = require("express");
const app = express();

// port and env
require("dotenv").config();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// db connection
const db = require('./config/database');
db.connect();

// cloudinary connection
const cloudinary = require('./config/cloudinary');
cloudinary.connect();

// test route
app.get('/', (req, res) => {
    res.send("working....")
})

// mount routes
const upload = require('./routes/FileUpload');
app.use('/api/upload', upload);

// activate server
app.listen(PORT, () => {
    console.log(`listening on ${process.env.API_URL}`)
})