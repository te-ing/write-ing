import express from 'express';
var app = express();
var port = 3001;
app.get('/', function (req, res) {
    res.send('Typescript + Node.js + Express Server');
});
app.listen(port, function () {
    console.log("[server]: Server is running at <https://localhost>:".concat(port));
});
