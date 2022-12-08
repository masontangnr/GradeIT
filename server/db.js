//This connects server to database
const Pool = require("pg").Pool

const pool = new Pool({
  user: process.env.dev_user,
  host:process.env.dev_host,
  database:process.env.dev_database,
  password:process.env.dev_password,
  port: 5432
})

pool.connect(function(err) {
  if (err) {
    console.error('Database pool failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = pool;