import { Request, Response, NextFunction } from "express";
import db from "../db/db";
import mybatisMapper from "mybatis-mapper";
import { queries } from "../queries/queries";


const checkId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const checkIdQuery = mybatisMapper.getStatement('users.mapper', queries.checkGet, {id});
    db.query(checkIdQuery, [id], (err: Error | null, result: any) => {
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

export default checkId;
