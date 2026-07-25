import { getVisitors, getMessages } from '@/lib/db';
import './admin.css';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const visitors = await getVisitors();
  const messages = await getMessages();

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>🔒 Admin Dashboard</h1>
        <p>Welcome back, Lami.</p>
      </header>

      <main className="admin-main">
        <section className="admin-section">
          <h2>🌍 Recent Visitors</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>IP Address</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {visitors.length > 0 ? (
                  visitors.map((v) => (
                    <tr key={v.id}>
                      <td>{new Date(v.visited_at).toLocaleString()}</td>
                      <td>{v.ip}</td>
                      <td>{v.city}, {v.country}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No visitors logged yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-section">
          <h2>✉️ Contact Messages</h2>
          <div className="messages-grid">
            {messages.length > 0 ? (
              messages.map((m) => (
                <div key={m.id} className="message-card">
                  <div className="message-header">
                    <strong>{m.name}</strong> ({m.email})
                    <span className="time">{new Date(m.sent_at).toLocaleString()}</span>
                  </div>
                  {(m.projectType || m.budget) && (
                    <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0', flexWrap: 'wrap' }}>
                      {m.projectType && <span style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3B82F6', color: '#93C5FD', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>📌 {m.projectType}</span>}
                      {m.budget && <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' }}>💰 {m.budget}</span>}
                    </div>
                  )}
                  <div className="message-body">
                    {m.message}
                  </div>
                </div>
              ))
            ) : (
              <p>No messages received yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
