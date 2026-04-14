import { useState, useEffect } from "react";
import bgVideo from "./assets/background.mp4";
import posterImg from "./assets/poster.jpg";
import logoImg from "./assets/reddriott.png";
import newsign from "./assets/newsign.png";
import "./Socials.css";
import { ITEMS } from "./data/socials";

function formatCount(n) {
  if (n == null || isNaN(n)) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return String(n);
}

export default function Socials() {
  const [mounted,  setMounted]  = useState(false);
  const [dynStats, setDynStats] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Discord — API publique, pas d'auth requise
  useEffect(() => {
    fetch("https://discord.com/api/v9/invites/QuaybkRVXY?with_counts=true")
      .then(r => r.json())
      .then(data => {
        if (data.approximate_member_count != null) {
          setDynStats(prev => ({
            ...prev,
            discord: { MBR: formatCount(data.approximate_member_count) },
          }));
        }
      })
      .catch(() => {});
  }, []);

  const getStatValue = (itemId, tag, fallback) =>
    dynStats[itemId]?.[tag] ?? fallback;

  return (
    <div id="lt-root">
      <video className="lt-bg" src={bgVideo} poster={posterImg} autoPlay loop muted playsInline />
      <div className="lt-overlay" />

      <div className={`lt-container${mounted ? " mounted" : ""}`}>
        <div className="lt-header">
          <div className="lt-avatar-wrap">
            <img className="lt-avatar" src={logoImg} alt="Redd Riott" />
          </div>
          <p className="lt-genre">Hard Rock / Glam Metal · Angoulême, France</p>
          <p className="lt-desc">
            🎸 Des reprises mais bientôt des titres originaux ⚡
          </p>
        </div>

        <div className="lt-links">
          {ITEMS.map((item, i) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lt-link"
              style={{ animationDelay: `${i * 80 + 160}ms` }}
            >
              <div className="lt-link-accent" style={{ background: item.color }} />
              {item.isNew && <img className="lt-badge-new" src={newsign} alt="NEW" />}

              {item.iconType === "img" ? (
                <img className="lt-link-icon" src={item.icon} alt={item.label} />
              ) : item.iconType === "flaticon" ? (
                <i className={`lt-link-icon-flat ${item.iconClass}`} style={{ color: item.color }} />
              ) : (
                <span className="lt-link-icon-text" style={{ color: item.color }}>
                  {item.iconText}
                </span>
              )}

              <div className="lt-link-text">
                <span className="lt-link-name">{item.label}</span>
                <span className="lt-link-handle">{item.handle}</span>
              </div>

              <div className="lt-stats">
                {item.stats.map(s => (
                  <div className="lt-stat" key={s.tag}>
                    <span className="lt-stat-tag" style={{ color: s.color, borderColor: s.color }}>
                      {s.tag}
                    </span>
                    <span className="lt-stat-num">
                      {getStatValue(item.id, s.tag, s.value)}
                    </span>
                    <div className="lt-stat-bar" style={{ background: s.color }} />
                  </div>
                ))}
              </div>

              <span className="lt-link-cta" style={{ color: item.color }}>
                {item.cta}
              </span>
            </a>
          ))}
        </div>

        <p className="lt-footer">reddriott.com</p>
      </div>
    </div>
  );
}
