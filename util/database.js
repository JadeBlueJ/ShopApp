const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
let _db;

const mongoConnect = (cb)=>{
  MongoClient.connect('mongodb+srv://Jade:admin@cluster0.snf2pm9.mongodb.net/?retryWrites=true&w=majority')
  .then(client=>{
    console.log(`db connection succesful`)
    _db = client.db()
    cb(client)
  })
  .catch(e=>{
    console.log(e)
    throw e
  })
}
const getDb= ()=>{
  if(_db)
  {
    return _db
  }
  throw 'No db found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
