import { Router, Request, Response } from "express";
import db from "../db/db";
import mybatisMapper from "mybatis-mapper";
import { queries } from "../queries/queries";

import bcrypt from "bcrypt"
import checkId from "../middlewares/checkId";
import hashPassword from "../middlewares/hashPassword";

const router = Router();

// 회원가입
router.post('/sign', checkId, hashPassword, (req: Request, res: Response) => {
    const { id, password } = req.body;
    const hashedPassword = req.body.password;
    const signQuery = mybatisMapper.getStatement('users.mapper', queries.signPost, { id, password });
    db.query(signQuery, [id, hashedPassword], (err: Error | null, result: any) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Error signing up');
        }
        console.log('User signed up:', result);
        res.status(201).send("Sign up successful");
    });
});

// 로그인
router.post('/login', (req: Request, res: Response) => {
    const { id, password } = req.body;
    const sqlQuery = mybatisMapper.getStatement('users.mapper', queries.loginGet, { id });
    db.query(sqlQuery, [id, password], (err: Error | null, result: any) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (result.length === 0) {
            res.status(404).send('User not found');
            return;
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err: Error | undefined, isMatch: boolean) => {
            if (err) {
                console.error('Password comparison error:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            if (isMatch) {
                console.log("Session before assigning user:", req.session);
                ( req.session as any ).user = {
                    id: user.id
                }
                
                res.status(200).send('Login Successful!');
            } else {
                res.status(401).send('Invalid Password');
            }
        });
    });
});

// 로그아웃
router.post('/logout', (req: Request, res: Response) => {
    req.session.destroy((err: Error | null) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send("Logout failed");
        }
        res.clearCookie('connect.sid');
        res.status(200).send('Logout successful!');
    });
});

export default router;
