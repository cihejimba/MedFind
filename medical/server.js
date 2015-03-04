// server.js
// super basic api - all in this file

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var parse = require('csv-parse');
var fs = require('fs');
var cors = require('cors')
app.use(cors())

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var port = process.env.PORT || 3005; 		// set our port

//router
var router = express.Router(); 				// get an instance of the express Router

//app.use(express.static( __dirname + '/app/public'));
router.route('/search/:term/:page').get(function (req, res) {
    var searchTerm = req.param("term");
    var limitAmount = 10;
    var pageNumber = req.param("page");
    var offsetAmount = (pageNumber - 1) * limitAmount;

    Medicine
      .findAndCountAll({
          where: ["name LIKE '" + searchTerm + "%'"],
          offset: offsetAmount,
          limit: limitAmount
      })
      .complete(function (err, result) {
          console.log(result.count);
          console.log(result.rows);
          res.send({
              total: result.count,
              current_page: parseInt(pageNumber),
              per_page: limitAmount,
              medicines: result.rows
          });
          //res.send("no is " + result.count + " result is " + result.rows[0].name);
      });


});


//register routes to /api
app.use('/api', router);

//simple sqlite - sequalize DB
var Sequelize = require('sequelize');
sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite", // or 'sqlite', 'postgres', 'mariadb'
    storage: "./db.development.sqlite"
    //port:    3306, // or 5432 (for postgres)
});


sequelize
  .authenticate()
  .complete(function (err) {
      if (!!err) {
          console.log('Unable to connect to the database:', err);
      } else {
          console.log('Connection has been established successfully.');
      }
  });

//get the models
var Medicine = sequelize.import(__dirname + "/models/medicine");

//setup the sqlite DB
sequelize
  .sync({ force: false }) //force true - rewrite entire DB from scratch
  .complete(function (err) {
      if (!!err) {
          console.log('An error occurred while creating the table:', err);
      } else {

          console.log('It synced the DB correctly');

          console.log('Importing Data');


          //already imported so lets skip importing from CSV
          //starting the API
          app.listen(port);
          console.log('Started API on port ' + port);
      }

      /*
            importMedicines("medicine.csv").on('finish', function(){
              console.log('finished a piping all of the CSV'); //this pipe use doesn't really work
      
      
              //starting the API
              app.listen(port);
              console.log('Started API on port ' + port);
            });
      
          }
        */

  });


var importMedicines = function (file) {
    console.log("file name and location" + __dirname + '/' + file);
    rs = fs.createReadStream(__dirname + '/' + file);
    parser = parse({ delimiter: ';', columns: true }, function (err, output) {
        if (err) console.log(err);
        //console.log(output);

        for (var i = 0; i < output.length ; i++) {
            addMedicine(output[i]);

        }

    });

    return rs.pipe(parser);

    //r.on('finish', function () { ... });

    //01-Jul-14 MM-MMM-YY
    /*
      var today = moment(new Date());
      return Medicine
        .create({
          name: 'good one',
          active_ingredient: 'sugar',
          price: '234',
          effective_date: today,
          pack_size: '100'
    
        });
    */
};

var addMedicine = function (item) {
    var startDate = moment(item["Effective Date"], "DD-MMM-YY");
    Medicine
      .create({
          name: item["Proprietary Name"],
          active_ingredient: item["Active Ingredients"],
          price: item.SEP,
          effective_date: startDate.format('YYYY-MM-DD HH:mm:ss.SSS Z'),
          pack_size: item["Pack Size"]

      }).complete(function (err, result) {
          console.log('added a medicine');
          console.log(result);
          console.log(err);
      });
};
