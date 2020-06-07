const express = require('express')
const server = express()
const db = require('./database/db')

// static files
server.use(express.static("public"));


// Nujucks
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
  express: server,
  noCache: true
});

server.use(express.urlencoded({ extended: true }))

server.get('/', (req, res) => {
  return res.render("index.html");
});

server.get('/create-point', (req, res) => {
  return res.render("create-point.html");
});

server.post('/save-point', (req, res) => {
  const query = `
      INSERT INTO places (name, image, address, address2, state, city, items) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `

  const values = [req.body.name, req.body.image, req.body.address, req.body.address2, req.body.state, req.body.city, req.body.items]

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no Cadastro!");
    }
    console.log("Cadastrado com sucesso");
    console.log(this);

    return res.render("create-point.html", { saved: true });
  };

  db.run(query, values, afterInsertData);
});

server.get('/search', (req, res) => {

  const search = req.query.search
  console.log(req.query)

  if (search == "") {
    return res.render("search-results.html", { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    console.log(rows);
    const total = rows.length;
    return res.render("search-results.html", { places: rows, total });
  });
});

server.listen(3000);