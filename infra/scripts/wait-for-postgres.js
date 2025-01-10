const {exec} = require("node:child_process");

let contador = 0; // Contador global para o relógio
let relogio = ["|", "/", "–", "\\"]; // Símbolos do relógio

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      // Move o cursor para o início da linha e exibe o relógio junto com a mensagem
      process.stdout.write(`\r${relogio[contador % relogio.length]} ⌛ Aguardando PostgreSQL aceitar conexões...`);
      contador++;

      // Chama a função novamente após 250ms
      setTimeout(checkPostgres, 250);
      return;
    }
    console.log("\n🟢 Postgres está pronto!\n");
  }
}
process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões...");
checkPostgres();