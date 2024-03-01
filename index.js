const express = require('express');
const bodyParser = require('body-parser');
const webscrapper = require('./module/webscrapper');

const app = express();
const port = 4040;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/homescraper', async (req, res) => {
    const { state } = req.body;
    const { zipcode } = req.body;

    const listings = await webscrapper.scraphomes(state, zipcode);
    res.json({ data: listings });
});

app.all('*', (req, res) => {
    res.json({ status: 404, message: 'Page not found.' });
});

app.listen(port, () => {
    console.log(`App listenining at http://localhost:${port}`);
});