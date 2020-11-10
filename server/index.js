const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'xzqa',
    charset: 'utf8',
    connectionLimit: 20

});
const server = express();
server.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080']
}))
server.get('/category', (req, res) => {
    let sql = 'select id,category_name from xzqa_category';
    pool.query(sql, (error, results) => {
        if (error) throw error;
        res.send({ message: '查询成功', code: 1, results: results })

    });
});
server.get('/article', (req, res) => {

    let cid = req.query.cid;
    //获取第几页
    let page=parseInt(req.query.page);
    let pagesize=10;
    let offset=(page-1)*pagesize;
    //进行查找操作
    // let sql = 'select id,subject,description,image from xzqa_article where category id=?';
    let sql = 'SELECT id,subject,description,image FROM xzqa_article WHERE category_id=? limit ?,?';
    pool.query(sql,[cid,offset,pagesize],(error, results) => {
        if (error) throw error;
        res.send({ message: '查询成功', code: 1, results: results });
    });
});
server.listen(3000);