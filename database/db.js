const variables = require('./variables');
const mongoose  = require('mongoose');

mongoose.connect(variables.Database.remoteConn, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('autoIndex', false);
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Servidor conectado ao Mongodb')
});
db.on('error', (err) => {
    console.log(err)
});
db.on('disconnected', () => {  
  console.log('Mongoose conexao desconectada'); 
});

module.exports = mongoose;