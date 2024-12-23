import { Router, Request, Response } from "express";
import db from "../db/db";
import mybatisMapper from "mybatis-mapper";
import { queries } from "../queries/queries";

const router = Router();

// 게시글 조회 
router.get('/get', (req: Request, res: Response) => {
  const sqlQuery = mybatisMapper.getStatement('mybatis.mapper', queries.getAllPosts);

  db.query(sqlQuery, (err: any, result: any) => {
    if (err) {
      console.error('Database Get error:', err.message);
      res.status(500).send('Database Get error: ' + err.message);
      return;
    }
    console.log('GET Result:', result);
    res.json(result);
  });
});

export default router;
