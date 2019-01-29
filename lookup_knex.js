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


const [name] = process.argv.slice(2);
function printDetails(person, index) {
  let prettyDate = dateFormat(person.birthdate, "yyyy-mm-dd");
  console.log(`- ${index+1}: ${person.first_name} ${person.last_name}, born '${prettyDate}'`);
}

function printSummary(number, name) {
  console.log(`Found ${number} person(s) by the name '${name}':`);
}

knex.select().from('famous_people')
  .where('first_name', name)
  .asCallback(function(err, rows) {
  if (err) return console.error(err);
  printSummary(rows.length, name);
  rows.forEach(printDetails);
  knex.destroy();
});
