const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let {JWTauthen} = require('./src/middleware/JWTauthen');
const router = require('./src/index')
app.use(JWTauthen)
app.use('/', router)
const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))