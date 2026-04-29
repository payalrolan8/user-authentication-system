const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://payalrolan008_db_user:intern1234@auth-clutser.4iwrmxu.mongodb.net/mydb')
  .then(() => console.log('CONNECTED'))
  .catch(err => console.log('ERROR:', err.message));