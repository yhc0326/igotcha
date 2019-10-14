const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

// @route POST api/game/load-games
// @desc Post info route
// @access Private
router.post('/load-games', (req, res) => {

    const sql = 'SELECT g.*, COUNT(u.id) as user_count, AVG(d.rating) as rating_avg FROM game g LEFT OUTER JOIN download d ON g.id=d.game_id LEFT OUTER JOIN user u ON d.user_id=u.id GROUP BY g.id;';

    connection.query(sql, [], function(rows, err, fields) {
        if (!err) {
            res.json(rows);
  
        } else {
            res.status(403).send('Server Error');
        }
    });
});

// @route POST api/game/load-ratings-counts
// @desc Post info route
// @access Private
router.post('/load-ratings-counts', (req, res) => {

    const sql = 'SELECT COUNT(u.id) as rating_count FROM game g LEFT OUTER JOIN download d ON g.id=d.game_id AND d.rating IS NOT NULL LEFT OUTER JOIN user u ON d.user_id=u.id GROUP BY g.id;';

    connection.query(sql, [], function(rows, err, fields) {
        if (!err) {
            res.json(rows);
  
        } else {
            res.status(403).send('Server Error');
        }
    });
});

// @route POST api/game/load-game-page
// @desc Post info route
// @access Private
router.post('/load-game-page', (req, res) => {

    id = req.body.id;

    const sql = 'SELECT d.*, u.fname, u.lname, u.type FROM game g LEFT OUTER JOIN download d ON g.id=d.game_id LEFT OUTER JOIN user u ON d.user_id=u.id WHERE g.id=? ORDER BY d.review_date DESC, d.review_time DESC;';

    connection.query(sql, [id], function(rows, err, fields) {
        if (!err) {
            res.json(rows);
  
        } else {
            res.status(403).send('Server Error');
        }
    });
});

// @route POST api/game/download-game
// @desc Post info route
// @access Private
router.post('/download-game', (req, res) => {

    userId = req.body.userId;
    gameId = req.body.gameId;

    const sql = 'INSERT INTO download VALUES(?, ?, null, null, null, null);';
    
    connection.query(sql, [userId, gameId], function(rows, err, fields) {
        if (!err) {
            if(!rows || rows.affectedRows === 0) {
                res.status(400).send('No changes');
            }
            res.json(rows);
  
        } else {
            res.status(403).send('Server Error');
        }
    });
});

// @route POST api/game/add-review
// @desc Post info route
// @access Private
router.post('/add-review', (req, res) => {

    rating = req.body.rating;
    comment = req.body.comment;
    userId = req.body.userId;
    gameId = req.body.gameId;

    const sql = 'UPDATE download SET review=?, rating=?, review_date=curdate(), review_time=curtime() WHERE user_id=? AND game_id=?;';
    
    connection.query(sql, [comment, rating, userId, gameId], function(rows, err, fields) {
        if (!err) {
            if(!rows || rows.affectedRows === 0) {
                res.status(400).send('No changes');
            }
            res.json(rows);
  
        } else {
            res.status(403).send('Server Error');
        }
    });
});

// @route POST api/game/delete-review
// @desc Post info route
// @access Private
router.post('/delete-review', (req, res) => {

    userId = req.body.userId;
    gameId = req.body.gameId;

    const sql = 'UPDATE download SET review=null, rating=null, review_date=null, review_time=null WHERE user_id=? AND game_id=?;';
    
    connection.query(sql, [userId, gameId], function(rows, err, fields) {
        if (!err) {
            if(!rows || rows.affectedRows === 0) {
                res.status(400).send('No changes');
            }
            res.json(rows);
  
        } else {
            res.status(403).send('Server Error');
        }
    });
});

// @route POST api/game/load-ratings
// @desc Post info route
// @access Private
router.post('/load-ratings', (req, res) => {

    const sql = 'SELECT g.*, COUNT(u.id) as user_count, AVG(d.rating) as rating_avg FROM game g LEFT OUTER JOIN download d ON g.id=d.game_id AND d.review_date>DATE_SUB(curdate(), INTERVAL 7 DAY) LEFT OUTER JOIN user u ON d.user_id=u.id GROUP BY g.id;';

    connection.query(sql, [], function(rows, err, fields) {
        if (!err) {
            res.json(rows);
  
        } else {
            res.status(403).send('Server Error');
        }
    });
});

module.exports = router;