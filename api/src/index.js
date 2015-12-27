var Hapi = require('hapi')
var MongoClient = require('mongodb').MongoClient
, format = require('util').format;

//Loading of JSON files to MongoDB
var exec = require('child_process').exec;
var fs = require('fs');
var jsonDir='./src/data/';
var files = fs.readdirSync(jsonDir);
console.log(files);
for (var i = 0; i < files.length; i++) {
  if (files[i].split('.')[1] == 'json') {
    exec('mongoimport --db projectG10 --collection ' + files[i].split('.')[0] + ' --drop --type json --jsonArray ' + jsonDir + files[i], function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
    console.log(files[i]);
  }
}

MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err)
        throw err;

        var doctors = db.collection('doctors')
        doctors.createIndex( { "user": 1 }, { unique: true } )
        doctors.createIndex( { "docID": 1 }, { unique: true } )
        /*doctors.find({
        }).toArray(function(err, docs) {
          if (err) throw err
          console.log(docs)
          db.close()
        })*/
});

var server = module.exports = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
})

server.connection({
  port: 9000
})

// load routes
require('./routes/hello.js')

server.start(function (err) {
  if (err) {
    return console.log('err:' + err)
  }
  console.log('server started: ' + server.info.uri)
})
