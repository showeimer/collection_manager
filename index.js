const express = require('express');
const routes = require('./routes/routes');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;

const app = express();

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

mongoose

  .connect('mongodb://localhost:27017/newdb', {useMongoClient: true})

  .then(() => app.listen(3000, () => console.log('Mongoose connected and app loaded')));
