const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');

const db = require('./config/db');
const response = require('./utils/response');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: "secret",
      cookie: { maxAge: 604800000 }
    })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(response);
app.use('/', routes);

db.connectMongo();

app.listen(PORT, (err) => {
    console.log(err || `Listening on port ${PORT}`);
})