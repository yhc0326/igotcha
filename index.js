const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

// Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Allow Origins from different port ONLY DURING development
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token,X-Access-Token, XKey, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use(express.static('build'));

//Define routes
app.use('/api/user', require('./api/user'));
app.use('/api/game', require('./api/game'));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})
app.get("/", (req, res) => {
  res.json({Server:" is up and running"});
});

app.listen(PORT, () => {
  console.log('server started on port ' + PORT);
});