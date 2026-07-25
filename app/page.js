'use client';
import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import './globals.css';
import DevTerminal from './components/DevTerminal';
import ProjectModal from './components/ProjectModal';

function AnalyticsMap() {
  const mapRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//rf.revolvermaps.com/0/0/8.js?i=5m9q8z7x1v2&m=0&c=3b82f6&cr1=ffffff&f=arial&l=33';
    script.async = true;
    mapRef.current.appendChild(script);
  }, []);
  return <div ref={mapRef} style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: '1rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', border: '1px solid rgba(59, 130, 246, 0.2)' }} />;
}

const ALL_PROJECTS = [
  {
    id: 'egovs-supervisor',
    title: 'EGOVS Supervisor Panel',
    category: 'Enterprise & Gov',
    img: '/images/Screenshot 2026-03-16 101652.png',
    problem: 'The Ethiopian Government needed a secure, high-concurrency supervisory platform to monitor nationwide electronic voting stations in real time without data loss or tampering.',
    solution: 'Built a multi-tiered ASP.NET and MySQL backend architecture with real-time websocket updates, cryptographic data verification, and strict role-based supervisor controls.',
    tech: ['ASP.NET', 'C#', 'MySQL', 'WebSockets', 'RBAC Security', 'Bootstrap']
  },
  {
    id: 'egovs-admin',
    title: 'EGOVS Admin Dashboard',
    category: 'Enterprise & Gov',
    img: '/images/Screenshot 2026-03-16 100833.png',
    problem: 'Election administrators required a centralized analytics dashboard to generate audit logs, manage voter registries, and visualize regional voting distributions.',
    solution: 'Engineered a reactive dashboard featuring real-time graphical data aggregations, automated PDF audit reports, and encrypted administrative workflows.',
    tech: ['ASP.NET Core', 'ADO.NET', 'Chart.js', 'SQL Server', 'Enterprise Security']
  },
  {
    id: 'currency-app',
    title: 'Currency Converter (RN + Node)',
    category: 'Mobile Apps',
    img: '/images/Screenshot 2025-02-13 004359.png',
    problem: 'Users and financial traders needed a fast, reliable cross-platform mobile app capable of fetching live global exchange rates with offline fallback capabilities.',
    solution: 'Developed a smooth React Native mobile frontend backed by a Node.js Express API that polls live financial rates and caches them locally using SQLite/AsyncStorage.',
    tech: ['React Native', 'Node.js', 'Express.js', 'REST API', 'AsyncStorage', 'Android/iOS']
  },
  {
    id: 'rn-calc',
    title: 'RN Scientific Calculator + API',
    category: 'Mobile Apps',
    img: '/images/Screenshot 2025-02-12 112228.png',
    problem: 'Engineers and students required an advanced scientific calculator on mobile with zero latency and cloud-synchronized computation history.',
    solution: 'Designed an ergonomic mobile interface in React Native with custom mathematical parsing algorithms and a cloud REST API backend to save user calculation sheets.',
    tech: ['React Native', 'JavaScript ES6+', 'Math.js', 'Node API', 'Cross-Platform']
  },
  {
    id: 'aspnet-login',
    title: 'Secure ASP.NET Authentication Portal',
    category: 'Enterprise & Gov',
    img: '/images/Screenshot 2025-02-12 113607.png',
    problem: 'Enterprise portals frequently suffer from session hijacking and SQL injection vulnerabilities during employee login and onboarding.',
    solution: 'Implemented an enterprise-grade authentication gateway using ASP.NET Identity, salted password hashing, anti-forgery tokens, and multi-factor authentication triggers.',
    tech: ['ASP.NET Core', 'C#', 'SQL Server', 'Entity Framework', 'Cybersecurity']
  },
  {
    id: 'java-employee',
    title: 'Java Enterprise Employee System',
    category: 'Enterprise & Gov',
    img: '/images/Screenshot 2024-12-25 045730.png',
    problem: 'HR departments required a reliable desktop/client-server system to manage thousands of employee payroll records, attendance logs, and performance appraisals.',
    solution: 'Developed an object-oriented Java application utilizing MVC architecture, JDBC database pooling with MySQL, and automated Excel/PDF report generation.',
    tech: ['Java SE/EE', 'JDBC', 'MySQL', 'MVC Architecture', 'Swing/FX', 'OOP']
  },
  {
    id: 'html-calc',
    title: 'Responsive Web Calculator',
    category: 'Web Platforms',
    img: '/images/Screenshot 2025-02-12 110603.png',
    problem: 'A lightweight, zero-dependency browser calculator needed for quick financial estimations across desktop and mobile browsers without loading external libraries.',
    solution: 'Built a lightning-fast vanilla JavaScript application leveraging CSS Grid, modern glassmorphism styling, and keyboard event listeners.',
    tech: ['HTML5', 'CSS3 Glassmorphism', 'Vanilla JavaScript', 'DOM Manipulation']
  }
];

export default function Home() {
  const [theme, setTheme] = useState('midnight');
  const [successMsg, setSuccessMsg] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    // 1. Dynamic Backend IP Tracking
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip: data.ip,
            country: data.country_name,
            city: data.city
          })
        });
      })
      .catch(err => console.error('Tracking blocked or failed', err));

    // 2. Scroll Spy
    const updateActiveSectionOnScroll = () => {
      const sections = document.querySelectorAll('.section-card');
      const navLinks = document.querySelectorAll('.nav-link');
      let currentSectionId = '';
      const scrollPosition = window.scrollY + 130;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active-nav');
          }
        });
      }
    };
    
    window.addEventListener('scroll', updateActiveSectionOnScroll);
    updateActiveSectionOnScroll();

    // 3. Theme Check
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'emerald') document.body.classList.add('theme-emerald');
    }

    return () => window.removeEventListener('scroll', updateActiveSectionOnScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'midnight' ? 'emerald' : 'midnight';
    setTheme(newTheme);
    localStorage.setItem('portfolioTheme', newTheme);
    if (newTheme === 'emerald') {
      document.body.classList.add('theme-emerald');
    } else {
      document.body.classList.remove('theme-emerald');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      projectType: formData.get('projectType'),
      budget: formData.get('budget')
    };

    // 1. Send via original EmailJS service
    if (window.emailjs) {
      window.emailjs.sendForm('service_2xgrqht', 'template_y9q2kqb', form)
        .catch(err => console.error("EmailJS error:", err));
    }

    // 2. Save dynamically into our Admin Database
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setSuccessMsg(true);
        form.reset();
        setTimeout(() => setSuccessMsg(false), 5000);
      } else {
        alert('⚠️ Failed to send message.');
      }
    } catch (err) {
      alert('⚠️ Error sending message.');
    }
  };

  const handleDownloadCV = (e) => {
    e.preventDefault();
    alert("📄 Preparing Lami Chemeda's Verified Full-Stack Developer Resume...\n\nExperience: 5+ Years @ OTech\nCertifications: Udacity Verified\nStatus: Available for Enterprise & Freelance Contracts.");
    window.print();
  };

  const filteredProjects = filterCategory === 'All' 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === filterCategory);

  return (
    <>
      {/* EmailJS SDK */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js" 
        strategy="lazyOnload"
        onLoad={() => {
          if (window.emailjs) window.emailjs.init("HnSBdvqnFQ7uxii9G");
        }}
      />

      {/* Case Study Pop-up Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      <header>
        <div className="header-container">
          <div className="logo">
            <h1>⚡ LAMI CHMEDA • FULL‑STACK</h1>
          </div>
          <nav id="navbar">
            <a href="#home" className="nav-link" data-section="home">🏠 HOME</a>
            <a href="#about" className="nav-link" data-section="about">👨‍💻 ABOUT</a>
            <a href="#portfolio" className="nav-link" data-section="portfolio">📁 PORTFOLIO</a>
            <a href="#resume" className="nav-link" data-section="resume">📄 RESUME</a>
            <a href="#contact" className="nav-link" data-section="contact">📬 CONTACT</a>
            <a href="#download" onClick={handleDownloadCV} className="nav-link" style={{ background: 'linear-gradient(95deg, #2563EB, #7C3AED)', color: '#fff', border: 'none', boxShadow: '0 0 12px rgba(124, 58, 237, 0.5)' }}>📥 CV (PDF)</a>
            <button id="themeToggle" className="nav-link" onClick={toggleTheme} style={{ cursor: 'pointer', border: '1px solid #34d399', background: 'rgba(16, 185, 129, 0.1)' }}>🎨 THEME</button>
          </nav>
        </div>
      </header>

      <div className="main-grid">
        {/* left profile card (developer vibe) */}
        <aside className="profile-card">
          <img src="/images/graduate photo.jpg" alt="Lami Chemeda" />
          <div className="profile-name">Lami Chemeda</div>
          <div className="profile-bio">Full-Stack Developer @ OTech</div>
          <div className="profile-tag">React Native | ASP.NET | Node.js | Python</div>
          <div style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '8px', padding: '0.6rem', color: '#a7f3d0', fontWeight: '600', fontSize: '0.85rem', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}>
            🟢 Top-Tier Freelance Engineer<br />(Upwork / Fiverr Verified)
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#A5B4FC' }}>
            <span>📍 Oromia, Bishoftu</span> • <span>🎂 24</span>
          </div>
        </aside>

        {/* right side: sections stacked for scroll spy */}
        <div className="sections-stack">
          {/* HOME SECTION */}
          <section id="home" className="section-card" data-section="home">
            <h2 className="section-title">✦ Digital Forge ✦</h2>
            <p>Innovative full‑stack developer delivering high-quality, scalable solutions for clients. I develop robust real-world projects such as the Ethiopian Government online voting system, student registration systems, employee resume analyzers, and cross-platform mobile apps.</p>
            
            {/* NEW INTERACTIVE TERMINAL FEATURE */}
            <DevTerminal />

            <div style={{ margin: '1.5rem 0', padding: '1.2rem', background: 'rgba(30, 41, 59, 0.5)', borderLeft: '4px solid #10b981', borderRadius: '0 8px 8px 0', boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }}>
              <h3 style={{ color: '#C7D2FE', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>💼 Professional Freelance Services</h3>
              <ul style={{ listStylePosition: 'inside', color: '#CBD5E1', fontSize: '0.9rem', lineHeight: '1.7' }}>
                <li><strong>Custom Mobile Apps:</strong> iOS & Android development using React Native & Node API.</li>
                <li><strong>Enterprise Web Platforms:</strong> ASP.NET Core, C#, Java EE, and scalable React portals.</li>
                <li><strong>Backend & Database Architecture:</strong> High-concurrency MySQL, MongoDB, & REST APIs.</li>
                <li><strong>Clean Code Guarantee:</strong> 100% On-time Delivery, Bug-free deployment & client satisfaction.</li>
              </ul>
            </div>

            <h3 style={{ margin: '1.5rem 0 0.8rem 0', color: '#C7D2FE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>🔥 Featured Builds</span>
              <span style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 'normal' }}>Click any card for Case Study →</span>
            </h3>
            <div className="project-grid">
              {ALL_PROJECTS.slice(0, 5).map((p) => (
                <div key={p.id} className="project-card" onClick={() => setSelectedProject(p)} style={{ cursor: 'pointer' }}>
                  <img src={p.img} alt={p.title} />
                  <div className="project-description"><strong>{p.title}</strong></div>
                  <span className="project-link">📖 Read Case Study →</span>
                </div>
              ))}
            </div>
          </section>

          {/* ABOUT SECTION */}
          <section id="about" className="section-card" data-section="about">
            <h2 className="section-title">📌 About the dev</h2>
            <p><span className="highlight-text">Name:</span> Lami Chemeda &nbsp;|&nbsp; <span className="highlight-text">Dept:</span> Information Technology &nbsp;|&nbsp; <span className="highlight-text">CGPA:</span> 3.86 &nbsp;|&nbsp; <span className="highlight-text">ExitExam:</span> 68/100</p>
            <p><span className="highlight-text">📍 Address:</span> Oromia Bishoftu &nbsp;|&nbsp; <span className="highlight-text">🎂 Age:</span> 24 &nbsp;|&nbsp; <span className="highlight-text">♂️ Sex:</span> Male</p>
            <h3 style={{ margin: '1.5rem 0 0.8rem 0', color: '#C7D2FE' }}>⚙️ Technical Arsenal</h3>
            <div className="skills">
              <div className="skill-item"><div className="skill-name"><span>React Native + Node.js</span><span>95%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '95%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>django</span><span>95%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '95%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>c#</span><span>95%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '95%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>mysql and mongo db</span><span>95%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '95%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>phyton</span><span>95%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '95%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>c++</span><span>95%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '95%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>Express.js</span><span>95%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '95%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>JavaScript (ES6+)</span><span>100%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>ASP.NET / ADO.NET</span><span>100%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>PHP (Web)</span><span>100%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>React.js</span><span>100%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>Java / Android</span><span>100%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
              <div className="skill-item"><div className="skill-name"><span>HTML5/CSS3/Tailwind</span><span>100%</span></div><div className="progress-bg"><div className="progress-fill" style={{ width: '100%' }}></div></div></div>
            </div>
            <em>🏅 International certifications: Udacity (Programming, Data Analysis, Android Dev)</em>
          </section>

          {/* PORTFOLIO SECTION WITH SMART CATEGORY FILTERS */}
          <section id="portfolio" className="section-card" data-section="portfolio">
            <h2 className="section-title">📂 Live Projects & Case Studies</h2>
            <p style={{ marginBottom: '1rem' }}><i>Real-world solutions — from government voting platforms to fintech mobile tools.</i></p>
            
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {['All', 'Enterprise & Gov', 'Mobile Apps', 'Web Platforms'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  style={{
                    background: filterCategory === cat ? 'linear-gradient(95deg, #2563EB, #7C3AED)' : '#1E293B',
                    color: '#fff', border: filterCategory === cat ? '1px solid #C084FC' : '1px solid #334155',
                    padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '600',
                    cursor: 'pointer', transition: '0.2s', boxShadow: filterCategory === cat ? '0 0 12px rgba(124, 58, 237, 0.4)' : 'none'
                  }}
                >
                  {cat === 'All' ? '🌐 All Works' : `⚡ ${cat}`}
                </button>
              ))}
            </div>

            {/* Filtered Grid */}
            <div className="project-grid">
              {filteredProjects.map((p) => (
                <div key={p.id} className="project-card" onClick={() => setSelectedProject(p)} style={{ cursor: 'pointer' }}>
                  <img src={p.img} alt={p.title} />
                  <div className="project-description"><strong>{p.title}</strong></div>
                  <span style={{ fontSize: '0.7rem', color: '#93C5FD', display: 'block', marginTop: '4px' }}>[{p.category}]</span>
                  <span className="project-link">📖 Case Study →</span>
                </div>
              ))}
            </div>
          </section>

          {/* RESUME SECTION */}
          <section id="resume" className="section-card" data-section="resume">
            <h2 className="section-title">📜 Résumé / Credentials</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ marginBottom: '0.8rem' }}><span className="highlight-text">💼 Professional Experience:</span></p>
              <ul style={{ listStyleType: 'none', paddingLeft: '1rem', borderLeft: '2px solid #3B82F6', marginLeft: '0.5rem' }}>
                <li style={{ marginBottom: '1.2rem', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '-1.38rem', top: '0.3rem', width: '12px', height: '12px', background: '#60A5FA', borderRadius: '50%', boxShadow: '0 0 10px #60A5FA' }}></span>
                  <strong style={{ fontSize: '1.1rem', color: '#EDF2FF' }}>Full-Stack Developer</strong> <span style={{ color: '#93C5FD' }}>@ OTech Engineering and Solutions</span><br />
                  <span style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'inline-block', marginBottom: '0.3rem' }}>Since mid-2018 (E.C.) - Present</span><br />
                  <span style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>Developing high-end full-stack applications, robust backend architectures, and real-world software solutions.</span>
                </li>
                <li style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '-1.38rem', top: '0.3rem', width: '12px', height: '12px', background: '#60A5FA', borderRadius: '50%', boxShadow: '0 0 10px #60A5FA' }}></span>
                  <strong style={{ fontSize: '1.1rem', color: '#EDF2FF' }}>Project Development & Participation</strong> <span style={{ color: '#93C5FD' }}>@ MAU University</span><br />
                  <span style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'inline-block', marginBottom: '0.3rem' }}>Since 2015 (E.C.)</span><br />
                  <span style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>Active participant in university-level project development, coding bootcamps, and engineering initiatives.</span>
                </li>
              </ul>
            </div>

            <p><span className="highlight-text">🎓 Education:</span> BSc in Information Technology, MAU University</p>
            <p><span className="highlight-text">🧠 Core Stack:</span> Java, JavaScript, React Native, Node.js, ASP.NET, PHP, Python, MySQL</p>
            <p><span className="highlight-text">📜 Certifications:</span> Programming Fundamentals • Data Analysis • Android Dev (Udacity)</p>
            <div className="project-grid">
              <div className="project-card"><img src="/images/Screenshot 2025-02-12 085712.png" alt="android cert" /><div className="project-description">Android Developer</div><a href="#" className="project-link">View cert</a></div>
              <div className="project-card"><img src="/images/Screenshot 2025-02-12 085754.png" alt="prog cert" /><div className="project-description">Programming</div><a href="#" className="project-link">View cert</a></div>
              <div className="project-card"><img src="/images/Screenshot 2025-02-12 085734.png" alt="data cert" /><div className="project-description">Data Analysis</div><a href="#" className="project-link">View cert</a></div>
            </div>
          </section>

          {/* CONTACT SECTION WITH SMART FREELANCE INPUTS */}
          <section id="contact" className="section-card" data-section="contact">
            <h2 className="section-title">📡 Let’s connect & Hire</h2>
            <p><span className="highlight-text">📞 Phone:</span> +251 920939012 / +251 983664549 &nbsp;|&nbsp; <span className="highlight-text">📧 Email:</span> lami28807@gmail.com</p>
            <p><span className="highlight-text">💬 Telegram:</span> @akkakeefanjiraadhedhuga</p>
            <div className="social-links">
              <a href="https://github.com/lami-chemeda.github.io" target="_blank" rel="noopener noreferrer">🐙 GitHub / lamichemeda</a>
              <a href="#" target="_blank">🔗 website github.com/Lami-Chemeda</a>
            </div>
            <h3 style={{ margin: '1.2rem 0 0.5rem 0' }}>✍️ Start a Project / Send Message</h3>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <input type="text" id="name" name="name" placeholder="Your Full Name" required />
                <input type="email" id="email" name="email" placeholder="Your Email Address" required />
              </div>
              
              {/* Freelance Specifiers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <select name="projectType" style={{ width: '100%', background: '#0F172A', border: '1px solid #334155', borderRadius: '1rem', padding: '0.8rem', color: '#94A3B8', marginBottom: '1rem', fontFamily: 'inherit' }}>
                  <option value="General Inquiry">📌 Select Project Type...</option>
                  <option value="Custom Mobile App (iOS/Android)">📱 Custom Mobile App (RN / Node)</option>
                  <option value="Enterprise Web Application">🌐 Enterprise Web Application (.NET/React)</option>
                  <option value="Backend API & Architecture">⚙️ Backend API & Architecture</option>
                  <option value="Database Optimization">💾 Database Design & Optimization</option>
                  <option value="Freelance Consulting / Bug Fix">🔧 Freelance Consulting / Bug Fix</option>
                </select>

                <select name="budget" style={{ width: '100%', background: '#0F172A', border: '1px solid #334155', borderRadius: '1rem', padding: '0.8rem', color: '#94A3B8', marginBottom: '1rem', fontFamily: 'inherit' }}>
                  <option value="Not Specified">💰 Estimated Budget...</option>
                  <option value="Less than $1,000">💵 Less than $1,000</option>
                  <option value="$1,000 - $3,000">💵 $1,000 - $3,000</option>
                  <option value="$3,000 - $5,000">💵 $3,000 - $5,000</option>
                  <option value="$5,000+ (Enterprise)">💵 $5,000+ (Enterprise Contract)</option>
                </select>
              </div>

              <textarea id="message" name="message" rows="4" placeholder="Describe your project requirements, scope, or collaboration ideas..." required></textarea>
              <button type="submit" style={{ fontSize: '1rem', padding: '1rem' }}>🚀 Send Project Request & Hire</button>
            </form>
            {successMsg && <p style={{ color: '#4ade80', marginTop: '1rem', fontWeight: 'bold', padding: '0.8rem', background: 'rgba(22, 101, 52, 0.3)', borderRadius: '8px', border: '1px solid #16a34a' }}>✓ Project request delivered successfully! I will contact you shortly.</p>}
          </section>

          {/* VISITOR ANALYTICS SECTION */}
          <section id="analytics" className="section-card" data-section="analytics" style={{ textAlign: 'center' }}>
            <h2 className="section-title" style={{ border: 'none', padding: 0, display: 'inline-block' }}>🌍 Global Reach & Analytics</h2>
            <p style={{ marginBottom: '1.5rem', color: '#CBD5E1', fontSize: '0.9rem' }}>Live tracking of visitors checking out my portfolio from around the world.</p>
            
            {/* Interactive 3D Globe Visitor Tracker */}
            <AnalyticsMap />
            
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94A3B8' }}>Detailed backend analytics (devices, sessions, etc.) are monitored securely via Google Analytics.</p>
          </section>
        </div>
      </div>

      <footer>
        <p>© 2025 Lami Chemeda — Verified Full-Stack Developer @ OTech Engineering and Solutions</p>
      </footer>
    </>
  );
}
