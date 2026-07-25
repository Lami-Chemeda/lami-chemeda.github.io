'use client';
import { useState } from 'react';

export default function DevTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Lami Chemeda Interactive Terminal v2.5' },
    { type: 'output', text: 'Type "help" or click any command below to start exploring!' }
  ]);

  const handleCommand = (cmdStr) => {
    const cmd = (cmdStr || input).trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const newHistory = [...history, { type: 'command', text: cmd }];

    let response = '';
    switch (cmd) {
      case 'help':
        response = 'Available commands: [skills] [experience] [hire] [contact] [clear]';
        break;
      case 'skills':
        response = '⚡ Core Arsenal: React Native (95%), ASP.NET (100%), Node.js (95%), Python (95%), Java/Android (100%), MySQL/MongoDB (95%).';
        break;
      case 'experience':
        response = '💼 5+ Years Full-Stack Developer @ OTech Engineering and Solutions. Key projects: Ethiopian e-Voting Platform, Currency Converters, Enterprise Systems.';
        break;
      case 'hire':
        response = '🟢 3 Reasons to Hire Lami: 1) Proven Track Record with Nationwide Enterprise Apps. 2) Clean Architecture & Fast Delivery. 3) 100% Client Satisfaction.';
        break;
      case 'contact':
        response = '📧 Email: lami28807@gmail.com | 📞 Phone: +251 920939012 | 💬 Telegram: @akkakeefanjiraadhedhuga';
        break;
      default:
        response = `Command not recognized: "${cmd}". Type "help" for a list of commands.`;
    }

    setHistory([...newHistory, { type: 'output', text: response }]);
    setInput('');
  };

  return (
    <div style={{ margin: '2rem 0', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #334155', background: '#090D16', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
      {/* Terminal Header */}
      <div style={{ background: '#1E293B', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444', display: 'inline-block' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontFamily: 'monospace' }}>bash - lami@otech:~</span>
        <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Interactive Sandbox</span>
      </div>

      {/* Terminal Body */}
      <div style={{ padding: '1.2rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#E2E8F0', maxHeight: '240px', overflowY: 'auto' }}>
        {history.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>
            {item.type === 'command' ? (
              <div style={{ color: '#60A5FA' }}>
                <span style={{ color: '#10B981' }}>lami@portfolio:~$</span> {item.text}
              </div>
            ) : (
              <div style={{ color: '#CBD5E1', paddingLeft: '1rem', borderLeft: '2px solid #334155' }}>
                {item.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Command Buttons */}
      <div style={{ background: '#0F172A', padding: '0.6rem 1rem', borderTop: '1px solid #1E293B', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: '#64748B', marginRight: '0.3rem' }}>Quick Run:</span>
        {['skills', 'experience', 'hire', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            style={{ background: '#1E293B', border: '1px solid #334155', color: '#93C5FD', padding: '0.3rem 0.7rem', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer', transition: '0.2s', fontFamily: 'monospace' }}
            onMouseOver={(e) => { e.target.style.background = '#3B82F6'; e.target.style.color = '#fff'; }}
            onMouseOut={(e) => { e.target.style.background = '#1E293B'; e.target.style.color = '#93C5FD'; }}
          >
            $ {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
