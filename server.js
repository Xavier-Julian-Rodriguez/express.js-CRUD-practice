const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

//GET /api/quotes/random route. 
//This route should send back a random quote from the quotes data
app.get('/api/quotes/random', (req, res, next) => {
    //const randomQuote = getRandomElement(quotes);
    res.send({quote: getRandomElement(quotes)});
})

app.get('/api/quotes', (req, res, next) => {
    const personSearch = req.query.person;
    if(req.query.person === undefined) {
        res.send({quotes: quotes});
    }
    else {
        const author = quotes.filter(quote => quote.person === personSearch);
        res.send({ quotes: author});
    }
})

app.post('/api/quotes', (req, res, next) => {
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    }
    if(req.query.quote && req.query.person) {
        quotes.push({newQuote})
        res.send({quote: newQuote});
    }  else {
        res.status(400).send();
    }

})

app.listen(PORT, () => {
    console.log('server is running on port 4001');
})