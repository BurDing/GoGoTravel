const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport')
const config = require('./config');
const User = require('./')
const router = express.Router();
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

app.use(express.static('./backend/static/'));
app.use(express.static('./frontend/dist/'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Static routes
app.route('/').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/login').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/explore').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/detail').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/register').get(function(req, res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
});
app.route('/profile').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/profile/:id').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})
app.route('/dashboard').get(function(req,res) {
  return res.sendFile(path.join(__dirname, './backend/static/index.html'));
})

/* New things ================================================================ */

require('./backend/models').connect(config.dbUri);
require('./backend/auth/passport')(passport);

// Initialize cookie sessions
app.use(cookieParser());
app.use(cookieSession({
  keys: ['asdf', 'asdf']
}));

// Initialize Passport
app.use(passport.initialize()); // Create an instance of Passport
app.use(passport.session());

// Get our routes
app.use('/api', require('./backend/routes/api')(router, passport));

/* =========================================================================== */

// dynamic binding
const PORT = process.env.PORT || 3000;

// start the server
app.listen(PORT, () => {
  console.log('Server is running on PORT ' + PORT );
});
