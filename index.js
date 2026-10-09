const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Conexão com o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuario'
});

db.connect(function (erro) {
  if (erro) {
    console.log('Erro ao conectar:', erro.message);
    return;
  }
  console.log('O banco está funcionando');
});

// CREATE - cadastrar usuário
app.post('/usuarios', function (req, res) {
  const nome = req.body.nome;
  const email = req.body.email;

  db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], function (erro, resultado) {
    if (erro) {
      return res.status(500).json(erro.message);
    }
    res.json({ id: resultado.insertId, nome: nome, email: email });
  });
});

// READ - listar todos
app.get('/usuarios', function (req, res) {
  db.query('SELECT * FROM usuarios', function (erro, resultado) {
    if (erro) {
      return res.status(500).json(erro.message);
    }
    res.json(resultado);
  });
});

// READ - buscar um
app.get('/usuarios/:id', function (req, res) {
  db.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], function (erro, resultado) {
    if (erro) {
      return res.status(500).json(erro.message);
    }
    res.json(resultado[0]);
  });
});

// UPDATE - atualizar
app.put('/usuarios/:id', function (req, res) {
  const nome = req.body.nome;
  const email = req.body.email;

  db.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, req.params.id], function (erro) {
    if (erro) {
      return res.status(500).json(erro.message);
    }
    res.json('Usuário renovado');
  });
});

// DELETE - deletar
app.delete('/usuarios/:id', function (req, res) {
  db.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], function (erro) {
    if (erro) {
      return res.status(500).json(erro.message);
    }
    res.json('Usuário apagado');
  });
});

// Liga o servidor
app.listen(3000, function () {
  console.log('Servidor rodando em http://localhost:3000');
});