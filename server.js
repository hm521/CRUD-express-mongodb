const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://rokatrex:havsandwich123@ds263109.mlab.com:63109/rokatrex', (err, client) => {
    if (err) return console.log(err)
    db = client.db('rokatrex')
    
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})


app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs        
        res.render('index.ejs', {
            quotes: result
        })
    })
})
app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        console.log(req.body)
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})







