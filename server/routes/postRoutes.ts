import { Router, Request, Response } from "express";
import db from "../db/db";
import mybatisMapper from "mybatis-mapper";
import { queries } from "../queries/queries";

const router = Router();

// 게시글 등록 
router.post('/insert', (req: Request, res: Response) => {
    const { title, content, date } = req.body;
    const sqlQuery = mybatisMapper.getStatement('mybatis.mapper', queries.insertPost, {title, content, date})

    db.query(sqlQuery, (err: Error | null, result: any) => {
        if(err) {
            console.log('Error:', err);
            res.status(500).send('Error inserting post');
            return;
        }
        console.log("POST", result);
        res.send("POST Successfull !")
    });
});

// 게시글 수정 
router.post('/update/:idx', (req: Request, res: Response) => {
    const { idx } = req.params;
    const { title, content } = req.body;
    const sqlQuery = mybatisMapper.getStatement('mybatis.mapper', queries.updatePost, {idx, title, content});

    db.query(sqlQuery, [title, content, idx], (err: any, result: any) => {
        if(err) {
            console.log('Error:', err);
            res.status(500).send('Error updating post');
            return;
        }
        console.log("UPDATE", result);
        res.send("UPDATE Successfull !")
    })
})

export default router;