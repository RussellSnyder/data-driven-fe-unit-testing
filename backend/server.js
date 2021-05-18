const express = require('express');
const cors = require('cors');

const peopleController = require('./src/controllers/people.controller');
 
const app = express();
app.use(cors());

app.get('/api/people', peopleController.getPeople);

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);