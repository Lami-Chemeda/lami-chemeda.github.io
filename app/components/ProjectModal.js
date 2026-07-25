'use client';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(12px)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        background: '#0F172A', border: '1px solid #3B82F6', borderRadius: '1.5rem',
        maxWidth: '700px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
        padding: '2rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        color: '#F1F5F9'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.2rem', right: '1.2rem', background: '#1E293B',
          border: '1px solid #334155', color: '#94A3B8', width: '36px', height: '36px',
          borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', transition: '0.2s'
        }} onMouseOver={(e) => { e.target.style.color = '#fff'; e.target.style.background = '#EF4444'; }}>
          ✕
        </button>

        {/* Category Badge */}
        <span style={{
          background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3B82F6', color: '#60A5FA',
          padding: '0.3rem 0.8rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '600',
          display: 'inline-block', marginBottom: '1rem'
        }}>
          ⚡ Case Study: {project.category || 'Full-Stack Project'}
        </span>

        {/* Title */}
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', color: '#F8FAFC', borderBottom: '1px solid #1E293B', paddingBottom: '0.8rem' }}>
          {project.title}
        </h2>

        {/* Image Preview */}
        {project.img && (
          <div style={{ background: '#0B1120', borderRadius: '1rem', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid #1E293B', textAlign: 'center' }}>
            <img src={project.img} alt={project.title} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
          </div>
        )}

        {/* Details */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#93C5FD', fontSize: '1rem', marginBottom: '0.4rem' }}>❓ The Problem & Requirement</h4>
          <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.2rem', background: 'rgba(30, 41, 59, 0.4)', padding: '0.8rem', borderRadius: '0.5rem', borderLeft: '3px solid #F59E0B' }}>
            {project.problem || 'Developing a high-performance, reliable software solution tailored for real-world enterprise operations and user satisfaction.'}
          </p>

          <h4 style={{ color: '#6ee7b7', fontSize: '1rem', marginBottom: '0.4rem' }}>🛠️ Architecture & Solution</h4>
          <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.6', background: 'rgba(30, 41, 59, 0.4)', padding: '0.8rem', borderRadius: '0.5rem', borderLeft: '3px solid #10B981' }}>
            {project.solution || 'Architected a scalable, secure frontend and backend infrastructure with clean code principles, role-based access control, and optimized database queries.'}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div>
          <h4 style={{ color: '#C084FC', fontSize: '0.9rem', marginBottom: '0.6rem' }}>⚙️ Technologies Used:</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(project.tech || ['React', 'Node.js', 'Database', 'Security', 'REST API']).map((t, idx) => (
              <span key={idx} style={{ background: '#1E293B', color: '#E2E8F0', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #334155', fontFamily: 'monospace' }}>
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #1E293B', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose} style={{
            background: 'linear-gradient(95deg, #2563EB, #7C3AED)', color: '#fff', border: 'none',
            padding: '0.7rem 1.5rem', borderRadius: '2rem', fontWeight: '600', cursor: 'pointer',
            transition: '0.2s', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
          }}>
            Got it, looks great! 👍
          </button>
        </div>

      </div>
    </div>
  );
}
