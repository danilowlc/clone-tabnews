import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function StatusPage() {
  return (
    <>
      <h1>Status Page</h1>
      <UpdatedAt />
      <Dependencies />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000, // Refresh every 5 seconds
  });

  let updatedAtText = "Loading...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Updated at: {updatedAtText} </div>;
}

function Dependencies() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 5000, // Refresh every 5 seconds
  });

  let dependenciesText = "Loading...";
  if (!isLoading && data) {
    dependenciesText = (
      <>
        <div>Versão: {data.depedencies.database.version}</div>
        <div>
          Opened Connections: {data.depedencies.database.opened_connections}
        </div>
        <div>Max Connections: {data.depedencies.database.max_connections}</div>
      </>
    );
  }

  return (
    <>
      <h2>Database Status</h2>
      <div>{dependenciesText}</div>
    </>
  );
}

export default StatusPage;
