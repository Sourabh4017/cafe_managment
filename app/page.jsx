

"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "night") setNight(true);
  }, []);

  const toggleTheme = () => {
    const next = !night;
    setNight(next);
    localStorage.setItem("theme", next ? "night" : "day");
  };

  return (
    <div className={night ? "page night" : "page"}>
      {/* 🌸 Sakura */}
      <div className="sakura">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="nav">
        <div className="brand">☕ Café Sourabh</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>

          <button className="theme-btn" onClick={toggleTheme}>
            {night ? "☀ Day" : "🌙 Night"}
          </button>

          <a className="enter-btn" href="/menu">
            Enter Café
          </a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <header className="hero">
        <div className="overlay">
          <h1>Café Sourabh</h1>
          <p>Indian Style Smart Café Experience</p>

          <div className="hero-actions">
            <a href="/menu" className="btn-primary">🍽 View Menu</a>
            <a href="/order-status" className="btn-secondary">📦 Track Order</a>
          </div>
        </div>
      </header>

      {/* ================= CUSTOMER ================= */}
      <section className="section">
        <h2>For Customers</h2>
        <div className="grid">
          <Card title="☰ Menu" jp="select menu item" desc="Browse & order food" href="/menu" night={night} />
          <Card title="📦 Track Order" jp="order status" desc="Live order tracking" href="/order-status" night={night} />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="section narrow">
        <h2>About Café Sourabh</h2>
        <p>
          Café Sourabh blends Indians minimalism with smart digital ordering,
          live kitchen coordination, and tablet-based counters.
        </p>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="gallery-section">
        <h2>Café Atmosphere</h2>
        <div className="gallery">
          <img src="/images/cafe1.jpg" />
          <img src="/images/cafe2.jpg" />
          <img src="/images/cafe3.jpg" />
          <img src="/images/cafe4.jpg" />
        </div>
      </section>

      {/* ================= STAFF ================= */}
      <section className="section">
        <h2>Staff Access</h2>
        <div className="grid">
          <Card title="Admin" jp="manager" desc="Dashboard & control" href="/admin/login" night={night} />
          {/* <Card title="Kitchen" jp="kitchen" desc="Live orders" href="/kitchen" night={night} /> */}
          <Card title="Tablet" jp="counter" desc="Counter screen" href="/tablet" night={night} />
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>📧 sourabhmehra227@gmail.com</p>
        <p>📞 +91-9770208318</p>
        <p>📍 D1 Danish nagar, Bhopal</p>
      </section>

        {/* ================= MAP LOCATION (NEW) ================= */}
      <section className="map-section">
        <h2>Find Us on Map</h2>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps?q=D1+Danish+Nagar+Bhopal&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <footer className="footer">
        © 2026 Café Sourabh • Japanese Inspired Smart Café
      </footer>

      {/* ================= STYLES ================= */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }

        .page {
          font-family: 'Segoe UI', sans-serif;
          background: #faf7f2;
          color: #1f1f1f;
        }

        .page.night {
          background: #0e0e11;
          color: #e5e5e5;
        }

        /* NAV */
        .nav {
          background: #877A7A;
          padding: 14px 24px;
          display: flex;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .brand { font-weight: bold; font-size: 20px; }
        .nav-links { display: flex; gap: 16px; align-items: center; }

        .nav a { color: #fff; text-decoration: none; }

        .enter-btn {
          background: #c89b3c;
          color: #000 !important;
          padding: 6px 14px;
          border-radius: 6px;
        }

        .theme-btn {
          background: transparent;
          border: 1px solid #c89b3c;
          color: #c89b3c;
          padding: 6px 14px;
          border-radius: 20px;
          cursor: pointer;
        }

        /* HERO */
        .hero {
          height: 65vh;
          background: url('/images/hero-cafe.jpg') center/cover no-repeat;
        }

        .overlay {
          height: 100%;
          background: rgba(0,0,0,.55);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .overlay h1 { font-size: 52px; letter-spacing: 4px; }
        .overlay p { opacity: .9; }

        .hero-actions { margin-top: 24px; display: flex; gap: 14px; }

        .btn-primary {
          background: #f4b4c4;
          color: #000;
          padding: 12px 26px;
          border-radius: 30px;
          text-decoration: none;
        }

        .btn-secondary {
          border: 1px solid #f4b4c4;
          color: #f4b4c4;
          padding: 12px 26px;
          border-radius: 30px;
          text-decoration: none;
        }

        /* SECTIONS */
        .section { padding: 60px 20px; max-width: 1200px; margin: auto; }
        .section h2 { text-align: center; margin-bottom: 40px; }
        .section.narrow { max-width: 900px; }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 30px;
        }

        /* CARD */
        .cafe-card {
          padding: 26px;
          border-radius: 16px;
          text-align: center;
          text-decoration: none;
          background: #fff;
          color: #000;
          box-shadow: 0 12px 30px rgba(0,0,0,.08);
          transition: all .35s ease;
          position: relative;
          overflow: hidden;
        }

        .cafe-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(244,180,196,.35), transparent);
          opacity: 0;
          transition: opacity .35s;
        }

        .cafe-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 25px 60px rgba(244,180,196,.35);
        }

        .cafe-card:hover::before { opacity: 1; }

        .night .cafe-card {
          background: #17171c;
          color: #e5e5e5;
          box-shadow: 0 12px 30px rgba(0,0,0,.6);
        }

        .jp { font-size: 14px; color: #c0392b; }

        /* GALLERY */
        .gallery-section { background: #D1BABA; padding: 50px 20px; }
        .gallery {
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .gallery img {
          width: 100%;
          border-radius: 12px;
        }

        /* CONTACT + FOOTER */
        .contact {
          background: #111;
          color: #ddd;
          text-align: center;
          padding: 50px 20px;
        }

          .map-section {
          padding: 60px 20px;
          text-align: center;
        }

        .map-container {
          max-width: 1000px;
          margin: auto;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,.2);
        }

        .map-container iframe {
          width: 100%;
          height: 400px;
          border: 0;
        }

        .footer {
          background: #877A7A;
          color: #DCDBDB;
          text-align: center;
          padding: 24px;
          font-size: 13px;
        }

        /* SAKURA */
        .sakura { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
        .sakura span {
          position: absolute;
          top: -10%;
          width: 14px;
          height: 14px;
          background: rgba(244,180,196,.7);
          border-radius: 50% 50% 50% 0;
          transform: rotate(45deg);
          animation: fall linear infinite;
        }
        .sakura span:nth-child(1){left:10%;animation-duration:12s}
        .sakura span:nth-child(2){left:30%;animation-duration:14s}
        .sakura span:nth-child(3){left:50%;animation-duration:10s}
        .sakura span:nth-child(4){left:70%;animation-duration:16s}
        .sakura span:nth-child(5){left:90%;animation-duration:13s}

        @keyframes fall {
          to { transform: translateY(120vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ title, jp, desc, href }) {
  return (
    <a href={href} className="cafe-card">
      <h3>{title}</h3>
      <span className="jp">{jp}</span>
      <p>{desc}</p>
    </a>
  );
}



// "use client";

// import { useEffect, useState } from "react";

// export default function HomePage() {
//   const [night, setNight] = useState(false);

//   useEffect(() => {
//     const saved = localStorage.getItem("theme");
//     if (saved === "night") setNight(true);
//   }, []);

//   const toggleTheme = () => {
//     const next = !night;
//     setNight(next);
//     localStorage.setItem("theme", next ? "night" : "day");
//   };

//   return (
//     <div className={night ? "page night" : "page"}>
      
//       {/* 🌸 Sakura */}
//       <div className="sakura">
//         {Array.from({ length: 20 }).map((_, i) => (
//           <span key={i} />
//         ))}
//       </div>

//       {/* ================= NAVBAR ================= */}
//       <nav className="nav">
//         <div className="brand">☕ Café Sourabh</div>
//         <div className="nav-links">
//           <a href="#about">About</a>
//           <a href="#contact">Contact</a>

//           <button className="theme-btn" onClick={toggleTheme}>
//             {night ? "☀ Day" : "🌙 Night"}
//           </button>

//           <a className="enter-btn" href="/menu">
//             Enter Café
//           </a>
//         </div>
//       </nav>

//       {/* ================= HERO ================= */}
//       <header className="hero">
//         <div className="overlay">
//           <h1>Café Sourabh</h1>
//           <p>Indian Style Smart Café Experience</p>

//           <div className="hero-actions">
//             <a href="/menu" className="btn-primary">🍽 View Menu</a>
//             <a href="/order-status" className="btn-secondary">📦 Track Order</a>
//           </div>
//         </div>
//       </header>

//       {/* ================= CUSTOMER ================= */}
//       <section className="section">
//         <h2>For Customers</h2>
//         <div className="grid">
//           <Card title="☰ Menu" jp="select menu item" desc="Browse & order food" href="/menu" />
//           <Card title="📦 Track Order" jp="order status" desc="Live order tracking" href="/order-status" />
//         </div>
//       </section>

//       {/* ================= ABOUT ================= */}
//       <section id="about" className="section narrow">
//         <h2>About Café Sourabh</h2>
//         <p>
//           Café Sourabh blends Indian minimalism with smart digital ordering,
//           live kitchen coordination, and tablet-based counters.
//         </p>
//       </section>

//       {/* ================= GALLERY ================= */}
//       <section className="gallery-section">
//         <h2>Café Atmosphere</h2>
//         <div className="gallery">
//           <img src="/images/cafe1.jpg" alt="Cafe Interior 1" loading="lazy" />
//           <img src="/images/cafe2.jpg" alt="Cafe Interior 2" loading="lazy" />
//           <img src="/images/cafe3.jpg" alt="Cafe Interior 3" loading="lazy" />
//           <img src="/images/cafe4.jpg" alt="Cafe Interior 4" loading="lazy" />
//         </div>
//       </section>

//       {/* ================= STAFF ================= */}
//       <section className="section">
//         <h2>Staff Access</h2>
//         <div className="grid">
//           <Card title="Admin" jp="manager" desc="Dashboard & control" href="/admin/login" />
//           <Card title="Tablet" jp="counter" desc="Counter screen" href="/tablet" />
//         </div>
//       </section>

//       {/* ================= CONTACT ================= */}
//       <section id="contact" className="contact">
//         <h2>Contact</h2>
//         <p>📧 sourabhmehra227@gmail.com</p>
//         <p>📞 +91-9770208318</p>
//         <p>📍 D1 Danish Nagar, Bhopal</p>
//       </section>

//       {/* ================= MAP LOCATION (NEW) ================= */}
//       <section className="map-section">
//         <h2>Find Us on Map</h2>

//         <div className="map-container">
//           <iframe
//             src="https://www.google.com/maps?q=D1+Danish+Nagar+Bhopal&output=embed"
//             loading="lazy"
//             allowFullScreen
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//       </section>

//       <footer className="footer">
//         © 2026 Café Sourabh • Smart Café Management System
//       </footer>

//       {/* ================= STYLES (UNCHANGED + ADDITIONS) ================= */}
//       <style>{`
//         * { box-sizing: border-box; }
//         body { margin: 0; }

//         .page {
//           font-family: 'Segoe UI', sans-serif;
//           background: #faf7f2;
//           color: #1f1f1f;
//         }

//         .page.night {
//           background: #0e0e11;
//           color: #e5e5e5;
//         }

//         .nav {
//           background: #877A7A;
//           padding: 14px 24px;
//           display: flex;
//           justify-content: space-between;
//           position: sticky;
//           top: 0;
//           z-index: 10;
//         }

//         .brand { font-weight: bold; font-size: 20px; }
//         .nav-links { display: flex; gap: 16px; align-items: center; }
//         .nav a { color: #fff; text-decoration: none; }

//         .enter-btn {
//           background: #c89b3c;
//           color: #000 !important;
//           padding: 6px 14px;
//           border-radius: 6px;
//         }

//         .theme-btn {
//           background: transparent;
//           border: 1px solid #c89b3c;
//           color: #c89b3c;
//           padding: 6px 14px;
//           border-radius: 20px;
//           cursor: pointer;
//         }

//         .hero {
//           height: 65vh;
//           background: url('/images/hero-cafe.jpg') center/cover no-repeat;
//         }

//         .overlay {
//           height: 100%;
//           background: rgba(0,0,0,.55);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//         }

//         .overlay h1 { font-size: 52px; letter-spacing: 4px; }
//         .overlay p { opacity: .9; }

//         .hero-actions { margin-top: 24px; display: flex; gap: 14px; }

//         .btn-primary {
//           background: #f4b4c4;
//           color: #000;
//           padding: 12px 26px;
//           border-radius: 30px;
//           text-decoration: none;
//         }

//         .btn-secondary {
//           border: 1px solid #f4b4c4;
//           color: #f4b4c4;
//           padding: 12px 26px;
//           border-radius: 30px;
//           text-decoration: none;
//         }

//         .section { padding: 60px 20px; max-width: 1200px; margin: auto; }
//         .section h2 { text-align: center; margin-bottom: 40px; }
//         .section.narrow { max-width: 900px; }

//         .grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//           gap: 30px;
//         }

//         .gallery-section { background: #D1BABA; padding: 50px 20px; }
//         .gallery {
//           max-width: 1100px;
//           margin: auto;
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 20px;
//         }

//         .gallery img {
//           width: 100%;
//           border-radius: 12px;
//         }

//         .contact {
//           background: #111;
//           color: #ddd;
//           text-align: center;
//           padding: 50px 20px;
//         }

//         .map-section {
//           padding: 60px 20px;
//           text-align: center;
//         }

//         .map-container {
//           max-width: 1000px;
//           margin: auto;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 15px 40px rgba(0,0,0,.2);
//         }

//         .map-container iframe {
//           width: 100%;
//           height: 400px;
//           border: 0;
//         }

//         .footer {
//           background: #877A7A;
//           color: #DCDBDB;
//           text-align: center;
//           padding: 24px;
//           font-size: 13px;
//         }

//         .sakura { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
//         .sakura span {
//           position: absolute;
//           top: -10%;
//           width: 14px;
//           height: 14px;
//           background: rgba(244,180,196,.7);
//           border-radius: 50% 50% 50% 0;
//           transform: rotate(45deg);
//           animation: fall linear infinite;
//         }

//         @keyframes fall {
//           to { transform: translateY(120vh) rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// }

// function Card({ title, jp, desc, href }) {
//   return (
//     <a href={href} className="cafe-card">
//       <h3>{title}</h3>
//       <span className="jp">{jp}</span>
//       <p>{desc}</p>
//     </a>
//   );
// }
