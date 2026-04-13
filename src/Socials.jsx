import { useState, useEffect } from "react";
import bgVideo from "./assets/main3.mp4";
import logoImg from "./assets/reddriott.png";
import "./Socials.css";
import { ITEMS } from "./data/socials";

export default function Socials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="lt-root">
      <video className="lt-bg" src={bgVideo} autoPlay loop muted playsInline />
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
