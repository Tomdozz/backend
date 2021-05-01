let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
const fs = require('fs');

let config = JSON.parse(fs.readFileSync('app.config'));
let dbConnection = config.dbConnection;
let connectionString = dbConnection.replace("[database]", config.db);

let apiRoutes = require("./api-routes");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    //response.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

// Connect to Mongoose and set connection variable
mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log('Connected to database')
    })
    .catch((err) => console.log(err))
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/v1', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running lifearray backend on port " + port);
});