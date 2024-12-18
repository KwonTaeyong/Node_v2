const express = require('express');
const router = express.Router();
const db = require('../db/db');
const mybatisMapper = require('mybatis-mapper');
const queries = require('../queries/queries');

// 등록 API
router.post('/insert', (req, res) => {
    const { title, content, date } = req.body;
    const sqlQuery = mybatisMapper.getStatement('mybatis.mapper', queries.insertPost, {title, content, date})

    db.query(sqlQuery, (err, result) => {
        if(err) {
            console.log('Error:', err);
            res.status(500).send('Error inserting post');
            return;
        }
        console.log("POST", result);
        res.send("POST Successfull !")
    });
});

// 수정 API
router.post('/update/:idx', (req, res) => {
    const { idx } = req.params;
    const { title, content } = req.body;
    const sqlQuery = mybatisMapper.getStatement('mybatis.mapper', queries.updatePost, {idx, title, content});

    db.query(sqlQuery, [title, content, idx], (err, result) => {
        if(err) {
            console.log('Error:', err);
            res.status(500).send('Error updating post');
            return;
        }
        console.log("UPDATE", result);
        res.send("UPDATE Successfull !")
    })
})

module.exports = router