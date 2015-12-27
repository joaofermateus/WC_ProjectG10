var MongoClient = require('mongodb').MongoClient
, format = require('util').format;

var count = 0;
var a;
var b;
var c;

var valuesToArray = function(db, coll, callback) {
  db.collection(coll).find().toArray(function (err, result) {
    a = result;
    //console.log(a);
    callback(result)
  });
};
var collections = ['acts', 'doctors', 'reports'];
var tester = [];

MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {

  valuesToArray(db,'acts',function (data) {
    valuesToArray(db,'doctors',function (data) {
      valuesToArray(db,'patients',function (data) {

        a = data;
        console.log(['A variable'] + a);
        console.log(['B variable'] +b);
        console.log(['C variable'] +c);
      })

      b = data;
    })
    c = data
  })


  /*for (var i = 0; i < collections.length; i++) {
    (function(i) {
      tester.push(valuesToArray(db, collections[i], function() {
      }))
    })(i);


    console.log(tester)
  }
  */
});
