initDB().then(() => listaFrissit());

function ujUgyfel() {
  let nev = document.getElementById("nev").value;
  let cim = document.getElementById("cim").value;

  let d = new Date(Date.now());
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0');
  
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

const datum = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;


  db.run(
    "INSERT INTO ugyfelek (nev, cim, modositva, sync) VALUES (?, ?, ?, 0)",
    [nev, cim, datum]
  );

  saveDB();
  listaFrissit();
}

function listaFrissit() {
  let res = db.exec("SELECT * FROM ugyfelek ORDER BY id DESC limit 3");

  let html = "";
  if (res.length > 0) {
    for (let row of res[0].values) {
      html += `<div>
        <b>${row[1]}</b> – ${row[3]}
      </div>`;
    }
  }
  document.getElementById("lista").innerHTML = html;
}
