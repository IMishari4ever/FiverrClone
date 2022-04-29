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
const order = require('./routes/order');
const User = require('./models/user');
const bcrypt = require('bcrypt')
const passport = require('passport');
const flash = require('express-flash');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const passportSocketIo = require("passport.socketio");
const cookieParser = require('cookie-parser');

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
bodyParser.json()
app.use(passport.initialize());

app.use(passport.session());
app.use(flash());
app.use(express.json())
app.use('/api/users', userRoutes);
app.use('/api', mainRoutes);
app.use('/api/orders', order);
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.text({type: '*/*'}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.listen(4000, () => {
  console.log('Server connected on port 4000')
})
  app.use(session({
  secret: 'key that will sign',
   resave: true,
  saveUninitialized: true,
  store: store,
}))

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,       // the same middleware you registrer in express
  key:          'connect.sid',       // the name of the cookie where express/connect stores its session_id
  secret:       "fsdfklewkfdews",    // the session_secret to parse the cookie
  store:        store,        // we NEED to use a sessionstore. no memorystore please
  success:      onAuthorizeSuccess,  // *optional* callback on success - read more below
  fail:         onAuthorizeFail,     // *optional* callback on fail/error - read more below
}));

function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');
  accept();
}
function onAuthorizeFail(data, message, error, accept){
  console.log('failed connection to socket.io:', message);
  if(error)
    accept(new Error(message));
}

module.exports = app;