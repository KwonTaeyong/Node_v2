const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mapper/crud-query.xml']);
mybatisMapper.createMapper(['./mapper/user-query.xml']);

const postRoutes = require('./routes/postRoutes');
const getRoutes = require('./routes/getRoutes');
const deleteRoutes = require('./routes/deleteRoutes');
const userRoutes = require('./routes/userRoutes');

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api', postRoutes);
app.use('/api', getRoutes);
app.use('/api', deleteRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
