import { useEffect, useState } from 'react';

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = ['results', 'items', 'data', 'teams'];

    for (const candidate of candidates) {
      if (Array.isArray(payload[candidate])) {
        return payload[candidate];
      }
    }
  }

  return [];
};

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const apiPath = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const response = await fetch(apiPath || `${apiBaseUrl}/api/teams/`);

        if (!response.ok) {
          throw new Error(`Unable to load teams (${response.status})`);
        }

        const payload = await response.json();

        if (isMounted) {
          setTeams(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h4 mb-0">Teams</h2>
          <span className="badge text-bg-success">{teams.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Captain</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team._id || team.name}>
                    <td>{team.name}</td>
                    <td>{team.captain || '—'}</td>
                    <td>{team.members?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
