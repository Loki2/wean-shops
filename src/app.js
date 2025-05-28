const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const createHttpError = require('http-errors');
const session = require('express-session');

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

const app = express();

//Initialization Middleware
app.use(morgan('dev'));
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../', 'temp'),
  createParentPath: true,
  limits: { fileSize: 5 * 1024 * 1024 }
}))

//Init session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true
  }
}));

mongoose.connect(`mongodb+srv://${db_username}:${db_password}@cluster0.gqt4a.mongodb.net/${db_name}?retryWrites=true&w=majority`);
// mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database ...!')
});



//connect flash
// app.use((req, res, next) => {
//   res.locals.messages = req.flash();
//   next();
// })



//Import routers
const AuthRoutes = require('./routes/auth.router');
const AdminRoutes = require('./routes/admin.router');
const UserRoutes = require('./routes/user.router');
const CategoryRoutes = require('./routes/category.router');
const ProductRoutes = require('./routes/product.router');



app.use('/auth', AuthRoutes);
app.use('/admin', AdminRoutes);
app.use('/admin/users', UserRoutes);
app.use('/admin/categories', CategoryRoutes);
app.use('/admin/products', ProductRoutes);


//Home Router
const HomeRoutes = require('./routes/home.router');


app.use('/', HomeRoutes);

//Handle Error
app.use((req, res, next) => {
  next(createHttpError.NotFound());
})

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.send(error);
})

module.exports = app;