'use strict';

const express = require('express');
const request = require('request');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
    // Execute an API call to the following URL
    request('https://randomuser.me/api/', (error, response) => {
        if (!error && response.statusCode == 200) {
            console.log(response.body)
            res.json(JSON.parse(response.body));
        }
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});