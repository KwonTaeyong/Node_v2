import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import mybatisMapper from 'mybatis-mapper';
import dotenv from 'dotenv';

import postRoutes from './routes/postRoutes';
import getRoutes from './routes/getRoutes';
import deleteRoutes from './routes/deleteRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

// MyBatis Mapper 초기화
mybatisMapper.createMapper(['./mapper/crud-query.xml']);
mybatisMapper.createMapper(['./mapper/user-query.xml']);

// 세션 설정
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'default_secret',
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: false,
            maxAge: 60 * 60 * 1000, // 1시간
        },
    })
);

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 라우트 설정
app.use('/api', postRoutes);
app.use('/api', getRoutes);
app.use('/api', deleteRoutes);
app.use('/api', userRoutes);

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
