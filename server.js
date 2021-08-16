let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');

const passport = require("passport");
const db = require("./config/keys").mongoURI;
const app = express();




// Express Route
const productRoute = require('./routes/product.route')
const userRoute = require('./routes/user.route')
const saleRoute = require('./routes/sale.route')
const statisticRoute = require('./routes/statistic.route')



// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);




// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/products', productRoute)
app.use('/users', userRoute)
app.use('/sales',saleRoute)
app.use('/statistics',statisticRoute)

app.get('/', (req, res) => {
  res.send("Hola mundo")
})


// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});



// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

