const config = require('./config.js');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : config.host,
    port : config.port,
    user : config.user,
    password : config.password,
    database : config.db
  }
});


var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then( function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 255);
      table.string('token', 255);
      table.unique('username');
    }).then(function (table) {
      db.knex.schema.hasTable('friendlist').then( function(exists) {
        if (!exists) {
          db.knex.schema.createTable('friendlist', function (table) {
            table.increments('id').primary();
            table.integer('user_id').references('id').inTable('users');
            table.integer('friend_id').references('id').inTable('users');
            //table.foreign('user_id').references('id').inTable('users');
            //table.foreign('friend_id').references('id').inTable('users');
          }).then(function (table) {
            db.knex.schema.hasTable('locations').then( function(exists) {
              if (!exists) {
                db.knex.schema.createTable('locations', function (table) {
                  table.increments('id').primary();
                  table.integer('user_id').references('id').inTable('users');
                  table.float('longitude');
                  table.float('latitude');
                  table.float('bearing');
                  table.timestamps();
                  //table.foreign('user_id').references('id').inTable('users');
                }).then(function (table) {
                  console.log('Created tables');
                });
              }
            });
          });
        }
      });
    });
  }
});





module.exports = db;