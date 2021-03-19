const Redirect = require('../package') 
const redirect = new Redirect('/', 3000)

redirect.listen()

//Programmatically add an URL
redirect.addURL('example', 'https://google.com/')

//Programmatically get an URL
console.log(redirect.getURL(example))
