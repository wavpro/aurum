const fs = require('fs')
var morgan = require('morgan')
const express = require('express');

function randomString(length = 6, caps = 1) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (caps === 1) return result;
  if (caps === 2) return result.toUpperCase();
  if (caps === 3) return result.toLowerCase();
}


class Redirect {
  /**
   * @param {string} baseURL
   * @param {number} port
   * returns {void}
   * This is the basic redirection class for this package.
   */
  constructor(baseURL, port) {
    this._store = require('data-store')({ path: process.cwd() + '/data/foo.json' });
    if (!baseURL) throw new Error('No Base URL specified.')
    if (!port) throw new Error('No port specified')
    this._baseURL = baseURL;
    this._port = port;
    try {
      if (!this._store.get('urls')) {
        this._store.set('urls.example', 'https://google.com/')
      }
    } catch (err) {
      console.error(err)
    }
  }
  /**
   * Start listening on defined port.
   * @param {string|optional} log Type of log to use, either 'none' or 'morgan'
   * @param {app|optional} app Express app (OPTIONAL)
   */
  async listen(log, app = express()) {
    if (log == 'morgan') {
      app.use(morgan('tiny'))
    }
    app.get(`${this._baseURL}:redirect`, async (req, res) => {
      const link = await this._store.get(`urls.${req.params.redirect}`)
      if (!link) return; else {
        res.redirect(`${link}`)
        var firstCl = await this._store.get(`stats.${req.params.redirect}.clicks`)
        if (!firstCl) firstCl = 1; else firstCl++;
        this._store.set(`stats.${req.params.redirect}.clicks`, firstCl)
      }
    });
    app.listen(this._port, () => {
      console.log('Running!');
    });
  }
  /**
   * @param {string} keyword
   * @param {string} url
   * Add an URL to the redirection system.
   */
  async addURL(keyword, url) {
    if (!keyword) throw new Error('No keyword specified')
    if (keyword == 'random') keyword = randomString()
    if (!url) throw new Error('No URL specified')
    await this._store.set(`urls.${keyword}`, url)
  }
  /**
   * @param {string} keyword URL keyword to get info from.
   */
  getURL(keyword) {
    if (!keyword) throw new Error('No Keyword provided')
    var link = this._store.get(`urls.${keyword}`);
    var clicks = this._store.get(`stats.${keyword}.clicks`)
    if (!clicks) clicks = 0;
    return new URL(keyword, link, clicks)
  }
}
Redirect.YOURLS = class {
  /**
   * @param {object} mysql A configured MYSQL connection using the MYSQL package.
   * @param {string} prefix The YOURLS table prefix
   * @param {string} output The file name for the output file after converting a YOURLS DB to .json
   */
  constructor(mysql, prefix, output) {
    const store2 = require('data-store')({ path: process.cwd() + output });
    mysql.query('SELECT * FROM ' + prefix + 'url', async (err, results, fields) => {
      if (err) throw err; else {
        for (var row of results) {
          await store2.set(`urls.${row.keyword}`, row.url)
        }
      }
    })
  }
}

class URL {
  constructor(short, url, clicks) {
    this.keyword = short;
    this.url = url;
    this.clicks = clicks
  }
  get keyword() {
    return this._keyword
  }
  set keyword(key) {
    return this._keyword = key
  }
  get url() {
    return this._url
  }
  set url(yes) {
    return this._url = yes
  }
  get clicks() {
    return this._clicks;
  }
  set clicks(clicks) {
    return this._clicks = clicks;
  }
}
module.exports = Redirect;
