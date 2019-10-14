const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

// @route POST api/user/sign-in
// @desc Post info route
// @access Private
router.post('/sign-in', (req, res) => {
    id = req.body.id;
    pw = req.body.pw;

    const sql = 'SELECT id, fname, lname, type FROM user WHERE id=? AND pw=?;';

    connection.query(sql, [id, pw], function(rows, err, fields) {
        if (!err) {
            res.json(rows);
  
        } else {
            res.status(403).send('Server Error');
        }
    });
});

// @route POST api/user/sign-up
// @desc Post info route
// @access Private
router.post('/sign-up', (req, res) => {
    id = req.body.id;
    pw = req.body.pw;
    fname = req.body.fname;
    lname = req.body.lname;
    type = req.body.type?"op":"player";

    const sql = 'INSERT INTO user VALUES(?,?,?,?,?);';

    connection.query(sql, [id, pw, fname, lname, type], function(rows, err, fields) {
        if (!err) {
            if(!rows || rows.affectedRows === 0) {
                res.status(400).send('No changes');
            }
            rows.id=id;
            rows.fname=fname;
            rows.lname=lname;
            rows.type=type;
            res.json(rows);
        } else {
            res.status(403).send('Server Error');
        }
    });
});

module.exports = router;