const Pool = require('pg').Pool
const Query = require('pg').Query;
const submit = Query.prototype.submit;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

Query.prototype.submit = function () {
  const text = this.text;
  const values = this.values || [];
  const query = text.replace(/\$([0-9]+)/g, (m, v) => JSON.stringify(values[parseInt(v) - 1]))
  console.log(query.split("\n").map((v) => v.trim()).join("\n"));
  submit.apply(this, arguments);
};

module.exports = {
    db: pool
}