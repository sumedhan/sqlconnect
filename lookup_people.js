const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
client.connect();

const [name] = process.argv.slice(2)

function doQuery(client, query, values, callback1, callback2) {

  client.query(query, values, (err, res) => {
    if(err) {
      console.log(err);
      return false;
    }
    console.log('Searching ...');
    if(res.rows.length) {
      callback1(res.rows.length, values[0]);
      res.rows.forEach(callback2);
    } else {
      console.log("No results found");
    }
    client.end();
  });
};

const query = "SELECT *,CAST(birthdate AS varchar) from famous_people WHERE first_name = $1;";
const values = [name];
function printDetails(person, index) {
  console.log(`- ${index+1}: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
}
function printSummary(number, name) {
  console.log(`Found ${number} person(s) by the name '${name}':`);
}
doQuery(client, query, values, printSummary,printDetails);
