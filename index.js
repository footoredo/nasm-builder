const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const fs = require('fs')
const app = express()
const cp = require('child_process');

app.set ('view engine', 'pug')

app.get('/', (req, res) => res.render('index'))

run_dir = "./runs"

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.post('/compile', function (req, res) {
    id = Math.random().toString(36).substr(2, 5)
    fs.writeFile (run_dir + '/' + id + '.m', req.body['nasm-code'], (err) => {
        fs.writeFile (run_dir + '/' + id + '.input', req.body['input'], (err) => {
            cp.exec (run_dir + "/" + "run.sh " + id, {}, (err, stdout, stderr) => {
                res.send (stdout)
            })
        })
    })
})

app.listen(1288, () => console.log('listening on port 1288'))
