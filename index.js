const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs').promises;

const app = express()
const port = 3000

// Instead of using a database to store short URL's, just use a JSON file
const fnameDB = './urlDB.json';
let urlDB = require(fnameDB);

// Body Parser middleware 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set EJS to view engine
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    // Main route
    res.render('index')
})

app.post('/shorten', async (req, res) => {
    // Client makes POST request to this endpoint to shorten URL 
    const longURL = req.body.url
    const id = createUniqueID()
    urlDB[id] = longURL
    await insert(id, longURL) // add long and short URL's to urlDB.json
    res.status(200).render('index', { id: id, longURL: longURL }) // re-render template 
})

app.get('/:shorturl', (req, res) => {
    if (req.params.shorturl in urlDB) {
        res.status(200).redirect(urlDB[req.params.shorturl])
    } else {
        res.status(400).send('Invalid URL') //Bad request URL doesnt exist
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})


// Helper functions


async function insert(key, value) {
    // Insert's key value pair into urlDB.json
    urlDB[key] = value
    await fs.writeFile(fnameDB, JSON.stringify(urlDB))
}


function createUniqueID() {
    let id = createID()
    while (id in urlDB) {
        id = createID()
    }
    // While loop guarantees unique ID
    return id
}

function createID(length = 5) {
    // create random 5 digit case sensitive alpha numeric code.
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}