import { Router, Request, Response } from 'express';
import db from '../db/db';
import mybatisMapper from 'mybatis-mapper';
import { queries } from '../queries/queries';

const router = Router();

// 게시글 삭제
router.delete('/delete/:idx', (req: Request, res: Response) => {
    const idx = req.params.idx;

    try {
        const sqlQuery = mybatisMapper.getStatement('mybatis.mapper', queries.deletePost, { idx });
        db.query(sqlQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error Details: ', err.sqlMessage || err.message);
                res.status(500).send('Database DELETE Error');
                return;
            }
            console.log("DELETE Result: " + JSON.stringify(result));
            res.send('DELETE Successful!');
        });
    } catch (error) {
        console.error('SQL Generation Error: ', error);
        res.status(500).send('Error in generating SQL query');
    }
});

export default router;
