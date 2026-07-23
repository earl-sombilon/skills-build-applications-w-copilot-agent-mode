import { useEffect, useState } from 'react';

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = ['results', 'items', 'data', 'activities'];

    for (const candidate of candidates) {
      if (Array.isArray(payload[candidate])) {
        return payload[candidate];
      }
    }
  }

  return [];
};

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/activities/`);

        if (!response.ok) {
          throw new Error(`Unable to load activities (${response.status})`);
        }

        const payload = await response.json();

        if (isMounted) {
          setActivities(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h4 mb-0">Activities</h2>
          <span className="badge text-bg-info">{activities.length}</span>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>User</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || `${activity.type}-${activity.date}`}>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.calories}</td>
                    <td>{activity.userEmail}</td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
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

export default Activities;
