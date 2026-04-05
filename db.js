let db;

async function initDB() {
localStorage.removeItem("adatbazis");
  const SQL = await initSqlJs({
    locateFile: file => 
      `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
  });

  let saved = localStorage.getItem("adatbazis");

  if (saved) {
    db = new SQL.Database(new Uint8Array(JSON.parse(saved)));
  } else {
    db = new SQL.Database();
    db.run(`
      CREATE TABLE logok (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
		hely TEXT,
		adat TEXT,
		idopont TEXT,
		talalat TEXT
      );
    `);
    saveDB();
  }
}

function saveDB() {
  const data = db.export();
  localStorage.setItem("adatbazis", JSON.stringify(Array.from(data)));
}
