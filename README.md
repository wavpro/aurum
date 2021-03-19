## Aurum URL shortener  
A fast and simple node.js library for URL shortening.  
Install using npm:
```
npm i aurum
```
### Examples  
A list of examples on how to use the package.  
  
    

#### Basic Redirection  
```js
const Redirect = require('aurum') 
const redirect = new Redirect('/', 3000)

redirect.listen()
```  
#### Adding a redirect  
```js
const Redirect = require('aurum') 
const redirect = new Redirect('/', 3000)

redirect.listen()

//Programmatically add an URL
redirect.addURL('example', 'https://google.com/')
```  
#### Getting info about an URL
```js
const Redirect = require('aurum') 
const redirect = new Redirect('/', 3000)

redirect.listen()

//Programmatically get an URL
redirect.getURL('example')
```
#### Using with custom express setup
```js
const Redirect = require('aurum') 
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

const redirect = new Redirect('/', 3000)
redirect.listen('none', app)
```
#### Import data from YOURLS database  
The package also has a built in converter that converts data from a YOURLS database into the Augium format. Currently, it does not convert logs, as that seems to be problematic. 
```js
const Redirect = require('aurum')
const mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'foo',
  user     : 'bar',
  password : 'SoSecret123',
  database : 'foobar'
});

const convert = new Redirect.YOURLS(connection, 'prefix_', '/your/file/path/foo.json')
```  
### Classes  
A list of classes used by the package.  
#### URL  
Example:
```json
URL {
  keyword: 'foobar',
  url: 'URL',
  clicks: 2
}
```  
  
#### Redirect  
Example:  
```json
Redirect {
  _store: Store {
    name: 'foo',
    path: '/home/runner/ImprobableHumiliatingQuadrant/data/foo.json',
    indent: 2,
    debounce: 0,
    defaults: {},
    timeouts: {},
    [Symbol(data-store)]: { urls: [Object], stats: [Object] }
  },
  _baseURL: '/',
  _port: 3000
}
```  
  
#### Redirect.YOURLS  
Example:  
```json
{}
```  
