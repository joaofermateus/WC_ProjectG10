var bl = require('../../../bl/src')
var MongoClient = require('mongodb').MongoClient
, format = require('util').format;

exports = module.exports

exports.get = function handler (request, reply) {
  reply(bl.sayHello())
}

exports.post = function handler (request, reply) {
  reply(bl.sayHello(request.payload.name))
}

exports.login = function handler (request, reply) {
  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var doctors = db.collection('doctors')
    doctors.find({

    }).toArray(function(err, docs) {
      if (err) throw err;
      //console.log(docs)
      reply(bl.login(request.payload.user, request.payload.pass,docs));
    }
  )
});
}

exports.createDoctor = function handler (request, reply) {
  var name = request.payload.name;
  var spec = request.payload.speciality;
  var p = request.payload.pass;
  var docID = 0;
  //console.log(u);
  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var doctors = db.collection('doctors')
    doctors.find({

    }).toArray(function(err, docs) {
      if (err) throw err;
      for (var i = 0; i < docs.length; i++) {
        if (docID < docs[i].docID) {
          docID = docs[i].docID;
          //console.log(docID);
        }
      }
      //console.log(docID);
      docID++;
      doctors.insert(
      { "docID" : Number(docID), "name" : name, "speciality" : spec, "user" : 'doc'+docID, "pass" : p}
    )
      db.close()
      reply(bl.createDoctor(name,docID))
    })
  });
}

exports.submitReport = function handler (request, reply) {
  /*
  date: "24/12/2008",
  docID: $scope.currentDoctor.docID,
  patID: $scope.currentPatient.patID,
  acts:  $scope.currentPatient.acts
  */

  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var reports = db.collection('reports')
    var requests = db.collection('requests')
    var reqID = 0;
    var repID = 0;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = dd+'/'+mm+'/'+yyyy;

      //console.log(docID);
      requests.find({
      }).toArray(function(err, docs) {
        if (err) throw err;
        for (var i = 0; i < docs.length; i++) {
          if ( reqID < docs[i].reqID) {
            reqID = docs[i].reqID;
          }
          if ( repID < docs[i].repID) {
            repID = docs[i].repID;
          }
        }


          for (var i = 0; i < request.payload.acts.length; i++) {
            repID++;
            reqID++;
            //console.log(repID);
            reports.insert(
            { "repID":repID , "date" : today, "docID" : request.payload.docID, "patID" : request.payload.patID, "actID": request.payload.acts[i].actID, "actual_reimb_perc" : ""}
            )
            requests.insert(
            { "reqID" : reqID , "repID" : repID, "status": "REQUESTED"}
            )
          }
          reply(bl.submitReport());
  })


})
}

exports.deletePatient = function handler (request, reply) {
  var name = request.payload.name;
  var patID = request.payload.patID;

  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    query= {"patID": patID};
    var patients = db.collection('patients')
    patients.deleteMany(
      query,
      function(err, results) {
        if (err) throw err;
         //console.log(results);

      }
    );
      reply(bl.deletePatient(name, patID))
    })
}

exports.changepatient = function handler (request, reply) {
  var a;
  var b;
  var c;
  var d;

  var valuesToArray = function(db, coll, callback) {
    db.collection(coll).find().toArray(function (err, result) {
      //console.log(a);
      callback(result)
    });
  };

  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {

    valuesToArray(db,'acts',function (data) {
      valuesToArray(db,'reports',function (data) { //console.log(data);
        valuesToArray(db,'patients',function (data) {
          valuesToArray(db,'doctors',function (data) {

            d = data;
            reply(bl.changepatient(request.payload.patient, a, b, c, d));


          });

          a = data;

        });

        b = data;
      });
      c = data
    });
  });
}



exports.patients = function handler (request, reply) {
  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var patients = db.collection('patients')
    patients.find({

    }).toArray(function(err, docs) {
      if (err) throw err;
      //console.log(docs)
      reply(bl.patients(docs));
    }
  )
});
}

exports.doctors = function handler (request, reply) {
  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var doctors = db.collection('doctors')
    doctors.find({

    }).toArray(function(err, docs) {
      if (err) throw err;
      //console.log(docs)
      reply(bl.doctors(docs));
      return docs;
    }
  )
});
}

exports.reports = function handler (request, reply) {
  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var reports = db.collection('reports')
    reports.find({

    }).toArray(function(err, docs) {
      if (err) throw err;
      //console.log(docs)
      reply(bl.reports(docs));
    }
  )
});
}

exports.acts = function handler (request, reply) {
  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var acts = db.collection('acts')
    acts.find({

    }).toArray(function(err, docs) {
      if (err) throw err;
      //console.log(docs)
      reply(bl.acts(docs));
    }
  )
});
}

exports.acts_rmb = function handler (request, reply) {
  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var acts_rmb = db.collection('acts-rmb')
    acts_rmb.find({

    }).toArray(function(err, docs) {
      if (err) throw err;
      //console.log(docs)
      reply(bl.acts_rmb(docs));
    }
  )
});
}

exports.requests = function handler (request, reply) {
  MongoClient.connect('mongodb://127.0.0.1:27017/projectG10', function (err, db) {
    if (err) throw err;
    var requests = db.collection('requests')
    requests.find({

    }).toArray(function(err, docs) {
      if (err) throw err;
      //console.log(docs)
      reply(bl.requests(docs));
    }
  )
});
}

exports.addmedicalact = function handler (request, reply) {
  reply(bl.addmedicalact(request.payload.actname, request.payload.currentpatient));
}

exports.removemedicalact = function handler (request, reply) {
  reply(bl.removemedicalact(request.payload.actindex, request.payload.currentpatient));
}
