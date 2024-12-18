const express = require('express');
const router = express.Router();
const db = require('../db/db');
const mybatisMapper = require('mybatis-mapper');
const queries = require('../queries/queries');

// 삭제 API
router.delete('/delete/:idx', (req, res) => {
    const idx = req.params.idx;
    const sqlQuery  = mybatisMapper.getStatement('mybatis.mapper', queries.deletePost, {idx});

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.error('Error Details: ',err.sqlMessage || err.message);
            res.status(500).send('Database DELETE Error');
            return;
        }
        console.log("DELETE Result: " + JSON.stringify(result));
        res.send('DELETE Successfull !');
    });
})

module.exports = router;