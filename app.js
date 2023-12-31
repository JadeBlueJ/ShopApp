const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorController = require('./controllers/error');
const User = require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('652ec20ad13dbc37d8a1c214')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb://0.0.0.0:27017/shop'
  )
  .then(result => {
    app.listen(3000);
    console.log(`Listening`)
  })
  .catch(err => {
    console.log(err);
  });
