const dbWatch = require("../models/watch");

class watchService {
    constructor() {
      this.db = dbWatch;
      
    }
  
    create(watch, cb) {
      //TODO method to create labs
      try {
        const newWatch = new this.db(watch);
        newWatch.save((err, result) => {
  
  
          if (err) {
            console.log(err);
            cb(false);
          } else {
  
            console.log(result);
            cb(true);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  
    update(id,watch, cb) {
      //TODO: method to update labs
      try {
        var query = { "_id": id };
        this.db.findOneAndUpdate(query, watch, { upsert: true }, function (
          err,
          doc
        ) {
          if (err) {
            console.log("Error: ", err);
            cb(false);
          } else {
            console.log("Document: ");
            console.log(doc);
            cb(true);
          }
        });
      } catch (error) {
        console.log(error);
        cb(false);
      }
    }
  
    delete(idwatch, cb) {
      //TODO: method to delete labs
      try {
        this.db.remove({ _id: idwatch }, function (error) {
          if (error) {
            console.log("Error ");
            console.log(error);
            cb(false);
          } else {
            cb(true);
          }
        });
      } catch (error) {
        console.log("Error en delete: ");
        console.log(error);
        cb(false);
      }
    }
  
    get(pags, cb,orden, size=10) {
      try {
       
  
       
        this.db
          .find({}, function (err, docs) {
            if (err) {
              console.log("Paginas: ");
              console.log("Error: ");
              console.log(err);
              cb(false, {}, 0);
            } else {
  
              dbWatch.find({}, (err, docs2) => {
                if (!err) {
                  var paginas = docs2.length;
                  paginas = Math.ceil(paginas / 10);
                  cb(true, docs, paginas);
                } else {
                  cb(false, {}, 0);
                }
              });
            }
          }).skip(size * (pags - 1)).limit(size).sort({precio: orden});
      } catch (error) {
        cb(false, {}, 0);
        console.log("Error: ");
        console.log(error);
      }
    }
  
    getwatch(id, cb){
      try {
        this.db.find({_id: id}, function (err, docs) {
            if (err) {
              console.log("Paginas: ");
              console.log("Error: ");
              console.log(err);
              cb(false, {});
            } else {
              
              cb(true, docs);
            }
          });
      } catch (error) {
        cb(false, {}, 0);
        console.log("Error: ");
        console.log(error);
      }
    }
  }
  module.exports = watchService;
  