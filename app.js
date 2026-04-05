initDB().then(() => listaFrissit());

function beolv() {
	
  let kod = document.getElementById("kod").value;

  let d = new Date(Date.now());
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0');
  
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

const datum = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

alert(datum);

  db.run(
    "INSERT INTO logok (adat, idopont, hely) VALUES (?, ?)",
    [kod, datum]
  );

db.run( 
	"INSERT INTO ugyfelek (nev, cim, modositva) VALUES (?, ?, ?)", [nev, cim, datum] ); 


  saveDB();
  listaFrissit();
  alert('ITT ism');
}

function listaFrissit() {
  let res = db.exec("SELECT * FROM logok ORDER BY id DESC limit 3");

  let html = "";
  if (res.length > 0) {
    for (let row of res[0].values) {
      html += `<div>
        <b>${row[2]}</b> – ${row[3]}
      </div>`;
    }
  }
  document.getElementById("lista").innerHTML = html;
  

}
