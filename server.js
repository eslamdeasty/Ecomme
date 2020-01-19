const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    user = require('./backend/routes/user'),
    product = require('./backend/routes/product'),
    cors = require('cors'),
    port = 3000,
    app = express();

require('dotenv').config();
const Product = require('./backend/models/product');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const productController = require('./backend/controllers/product');

//Adding cors

app.use(cors())
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//View Engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)


// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Make Images "Uploads" Folder Publicly Available
app.use('/public', express.static(path.join("backend/public")));

//Connecting to Mongo 


mongoose.connect(process.env.mongoURI, { useUnifiedTopology: true }).then(
    () => {
        console.log('Connected to DB');
    }).catch(
    (err) => {
        console.log('Connection failed');
        console.log(err);
    }
)

// const conn = mongoose.createConnection(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
// let gfs;
// conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// });

// Create storage engine
// const storage = new GridFsStorage({
//     url: process.env.mongoURI,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });
// const upload = multer({ storage });

// Body Parser MW
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))


//Adding the routes
app.use('/api/users', user);
app.use('/api/products', product)

//Adding new product route
// app.post('/products/add', upload.single('image'), productController.addProduct)

app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});


app.listen(port, () => {
    console.log('Server started on port ' + port)
})