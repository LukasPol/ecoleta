const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db;

db.serialize(() => {
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     name TEXT,
  //     image TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `)

  // const query = `
  //     INSERT INTO places (name, image, address, address2, state, city, items) 
  //       VALUES (?, ?, ?, ?, ?, ?, ?);
  //     `

  // const values = ["Papersider",
  //   "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
  //   "Guilherme Gemballe, Jardim Ámerica",
  //   "Número 260",
  //   "Santa Catarina",
  //   "Rio do Sul",
  //   "Resíduos Eletrônicos, Lâmpadas",
  // ]

  // function afterInsertData(err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Cadastrado com sucesso");
  //   console.log(this);
  // };

  // db.run(query, values, afterInsertData);

  // db.all(`SELECT * FROM places`, function (err, rows) {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   console.log(rows);
  // });

  // db.run(`DELETE FROM places WHERE id = ?`, [5], function (err) {
  //   if (err) {
  //     return console.log(err);
  //   }

  //   console.log('Registro Deletado');
  // });

});