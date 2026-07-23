import { useEffect, useState } from 'react';

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = ['results', 'items', 'data', 'users'];

    for (const candidate of candidates) {
      if (Array.isArray(payload[candidate])) {
        return payload[candidate];
      }
    }
  }

  return [];
};

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const apiPath = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        const response = await fetch(apiPath || `${apiBaseUrl}/api/users/`);

        if (!response.ok) {
          throw new Error(`Unable to load users (${response.status})`);
        }

        const payload = await response.json();

        if (isMounted) {
          setUsers(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h4 mb-0">Users</h2>
          <span className="badge text-bg-primary">{users.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Fitness Level</th>
                  <th>Weekly Goal</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || `${user.name}-${user.email}`}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.fitnessLevel}</td>
                    <td>{user.weeklyGoal}</td>
                    <td>{user.team}</td>
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

export default Users;
