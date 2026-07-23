import { useEffect, useState } from 'react';

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = ['results', 'items', 'data', 'workouts'];

    for (const candidate of candidates) {
      if (Array.isArray(payload[candidate])) {
        return payload[candidate];
      }
    }
  }

  return [];
};

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/workouts/`);

        if (!response.ok) {
          throw new Error(`Unable to load workouts (${response.status})`);
        }

        const payload = await response.json();

        if (isMounted) {
          setWorkouts(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h4 mb-0">Workouts</h2>
          <span className="badge text-bg-secondary">{workouts.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Focus</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout._id || workout.title}>
                    <td>{workout.title}</td>
                    <td>{workout.focus}</td>
                    <td>{workout.difficulty}</td>
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

export default Workouts;
