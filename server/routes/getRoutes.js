const express = require('express');
const router = express.Router();
const db = require('../db/db'); // DB 모듈
const mybatisMapper = require('mybatis-mapper');
const queries = require('../queries/queries'); // 올바른 경로 설정

// 조회
router.get('/get', (req, res) => {
  const sqlQuery = mybatisMapper.getStatement('mybatis.mapper', queries.getAllPosts);

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error('Database Get error:', err.message);
      res.status(500).send('Database Get error: ' + err.message);
      return;
    }
    console.log('GET Result:', result);
    res.json(result); // JSON 형식으로 응답
  });
});

module.exports = router;
