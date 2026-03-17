require('dotenv').config();
const express = require("express");
const mysql = require('mysql2');  
const app = express();

//CONEXÃO COM MYSQL 
//TO-DO:
// configurações de conexão devem estar dentro de /config/db.js
// #mudar
const db = mysql.createConnection ({
    host: process.env.DB_HOST ||'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'senai',
    database: process.env.DB_NAME ||'livroferta'
});

//FIM TO-DO


//TO-DO
// rotas, regras de negocio (controllers) e models (repositories) devem ser modularizados e separados nos respectivos arquivos
app.post('/usuarios', (req, res) => {
    const {nome, email, senha} = req.body
 
    const sql = "INSERT INTO usuarios (nome, email, senha) values(?, ?, ?)";


    db.query(sql, [nome, email, senha], (err, result) => {
     if(err) {
          return res.status(500).json({error: err.message});
     }
    res.status(201).json({mesage: "Usuário criado.", id:result.insertId});    
});
});
app.get('/usuarios', (req, res) => {
     res.json(users)
});
//FIM TO-DO


//Código organizado
app.use(express.json());

//importar rotas
const livroRoutes = require("../src/routes/livros.routes");
app.use("/livros", livroRoutes);


module.exports = app; 