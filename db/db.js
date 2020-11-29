require('dotenv').config();
var {Client} = require('pg');

var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

client.connect()
    .then(console.log("connected"))
    .catch(e=>console.log(e));

exports = 
{
    client:client
}
