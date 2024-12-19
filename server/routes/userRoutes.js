const express = require('express');
const router = express.Router();
const db = require('../db/db');
const mybatisMapper = require('mybatis-mapper');
const queries = require('../queries/queries');
const bcrypt = require('bcrypt');

const checkId = require('../middlewares/checkId');
const hashPassword = require('../middlewares/hashPassword');


// 회원가입
router.post('/sign', checkId, hashPassword, (req, res) => {
    const { id, password } = req.body;
    const hashedPassword = req.body.password;
    const signQuery = mybatisMapper.getStatement('users.mapper', queries.signPost, { id, password});
    db.query(signQuery, [id, hashedPassword], (err, result) => {
        if(err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Error signing up');
        }
        console.log('User signed up:', result);
        res.status(201).send("Sign up successful");
    });
});

// 로그인
router.post('/login', (req, res) => {
    const {id, password} = req.body;
    const sqlQuery = mybatisMapper.getStatement('users.mapper', queries.loginGet, {id});
    db.query(sqlQuery, [id, password], (err, result) => {
        if(err) {
            console.error('Database Error:', err);
            res.status(500).send("Internal Server Error");
            return;
        }
        if(result.length === 0) {
            res.statut(404).send('User not found');
            return;
        }
        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMathc) => {
            if(err) {
                console.error('Password comparison error:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if(isMathc) {
                req.session.user = {
                    id: user.id
                };
                res.status(200).send('Login Successful!');
            } else {
                res.status(401).send('Invalid Password');
            }
        })
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error('Logout error:', err);
            return res.status(500).send("Logout failed")
        }
        res.clearCookie('connect.sid');
        res.status(200).send('Logout successful!');
    })
})

module.exports = router;