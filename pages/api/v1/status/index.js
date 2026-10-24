import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseConnectionResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseConnectionValue =
    databaseConnectionResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updateAt,
    depedencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseConnectionValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
