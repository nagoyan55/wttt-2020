require('dotenv').config();
var {Client} = require('pg');

var client = new Client({
    host: process.env.ENV_HOST,
    database: process.env.ENV_DB,
    user: process.env.ENV_USER,
    port: 5432,
    password: process.ENV_PASSWORD
});

client.connect()
    .then(console.log("connected"))
    .catch(e=>console.log(e));
