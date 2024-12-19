const db = require('../db/db');
const mybatisMapper = require('mybatis-mapper');
const queries = require('../queries/queries');

const checkId = (req, res, next) => {
    console.log(req.body)
    const { id } = req.body;
    const checkIdQuery = mybatisMapper.getStatement('users.mapper', queries.checkGet, {id});
    db.query(checkIdQuery, [id], (err, result) => {
        if(err) {
            console.log('Error checking ID:', err);
            return res.status(500).send('Internal Server Error');
        }
        if(result.length > 0) {
            return res.status(409).send("ID already exists");
        }
        next();
    });
};

module.exports = checkId;