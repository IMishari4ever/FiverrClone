const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session)
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
const logger = require('morgan');
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/userRoute');
const User = require('./models/user');
const bcrypt = require('bcrypt')
const passport = require('passport');
const flash = require('express-flash');


dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

  const store = new MongoDBSession({
    uri: DB
  })

app.use(logger('dev'));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json())
app.use('/api/users', userRoutes);
app.use('/api', mainRoutes);
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.text({type: '*/*'}));
app.listen(4000, () => {
  console.log('Server connected on port 4000')
})
  app.use(session({
  secret: 'key that will sign',
   resave: true,
  saveUninitialized: true,
  store: store,
}))



module.exports = app;