var mysql   = require("mysql");

var pool = mysql.createPool({
    host     : 'igotcha2019.cntvxkrjqpa0.ap-northeast-2.rds.amazonaws.com',
    user     : 'igotcha2019',
    password : 'igotcha2019',
    port     : '3306',
    database : 'igotcha'
});

// var pool = mysql.createPool({
//       host     : 'localhost',
//       user     : 'root',
//       password : 'password',
//       port     : '3306',
//       database : 'igotcha'
// });

var connection = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = connection;