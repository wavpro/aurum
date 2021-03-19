const Redirect = require('./package')
const mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'foo',
  user     : 'bar',
  password : 'SoSecret123',
  database : 'foobar'
});

const convert = new Redirect.YOURLS(connection, 'prefix_', '/your/file/path/foo.json')
