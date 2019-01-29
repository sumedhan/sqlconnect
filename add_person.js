const settings = require("./settings"); // settings.json
const dateFormat = require('dateformat');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
  }
});

const [first_name, last_name, birthdate] = process.argv.slice(2);

knex('famous_people').insert({
  first_name: first_name,
  last_name: last_name,
  birthdate: birthdate,
}).asCallback((err, rows) => {
  if (err) return console.error(err);
  knex.destroy();
})
