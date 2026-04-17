import { useState, useEffect } from "react";
import bgVideo from "./assets/background.mp4";
import posterImg from "./assets/poster.jpg";
import logoImg from "./assets/reddriott.png";
import newsign from "./assets/newsign.png";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import "./Socials.css";
import { ITEMS } from "./data/socials";

const CHARS = [char1, char2, char3];
const ROLE_LABELS = ["REDD", "RIOTT", "BAND", "CREW", "LIVE"];

function formatCount(n) {
  if (n == null || isNaN(n)) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return String(n);
}

export default function Socials() {
  const [active,   setActive]   = useState(0);
  const [mounted,  setMounted]  = useState(false);
  const [dynStats, setDynStats] = useState({});
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Discord — API publique
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

  // Cycle auto — mobile uniquement (3 s par barre, remplace le hover)
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setActive(i => (i + 1) % ITEMS.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isMobile]);

  // Navigation clavier — tous écrans
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter")     window.open(ITEMS[active].href, "_blank");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, isMobile]);

  const getStatValue = (itemId, tag, fallback) =>
    dynStats[itemId]?.[tag] ?? fallback;

  const handleBarClick = (item, i) => {
    if (isMobile) {
      // Mobile : 1 tap = ouvre directement
      window.open(item.href, "_blank");
    } else {
      // Desktop : 1er clic = sélectionne, 2e = ouvre
      if (active === i) window.open(item.href, "_blank");
      else setActive(i);
    }
  };

  return (
    <div id="lt-root">
      <video className="lt-bg" src={bgVideo} poster={posterImg} autoPlay loop muted playsInline />
      <div className="lt-overlay" />
      <div className="lt-bars">
        {/* Logo au-dessus des barres */}
        <div className={`lt-bars-logo-wrap${mounted ? " in" : ""}`}>
          <img className="lt-bars-logo" src={logoImg} alt="Redd Riott" />
          <div className="lt-bars-logo-sub">
            <span className="lt-bars-logo-genre">HARD ROCK / GLAM METAL · ANGOULÊME, FRANCE</span>
            <span className="lt-bars-logo-desc">🎸 Des reprises mais bientôt des titres originaux ⚡</span>
          </div>
        </div>

        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`lt-bar-outer${active === i ? " active" : ""}${mounted ? " in" : ""}`}
            style={{ transitionDelay: `${i * 65}ms` }}
            onClick={() => handleBarClick(item, i)}
            onMouseEnter={() => !isMobile && setActive(i)}
          >
            <div className="lt-bar-red" />
            <div className="lt-bar">
              <img className="lt-bar-char" src={CHARS[i % 3]} alt="" />
              <div className="lt-bar-fill" />
              <div className="lt-bar-shade" />
              <div className="lt-bar-content">

                <div className="lt-bar-role">{ROLE_LABELS[i]}</div>

                <div className="lt-bar-main">
                  <div className="lt-bar-main-top">
                    <i className={`lt-bar-icon ${item.iconClass}`} style={{ color: "rgba(255,255,255,0.18)" }} />
                    <div className="lt-bar-label">{item.label}</div>
                  </div>
                  <div className="lt-bar-handle">{item.handle}</div>
                </div>

                <div className="lt-bar-stats">
                  {item.stats.map(s => {
                    const tagColor = (active === i && s.activeColor) ? s.activeColor : s.color;
                    return (
                    <div className="lt-bar-stat" key={s.tag}>
                      <div className="lt-bar-stat-top">
                        <span className="lt-bar-stat-tag" style={{ color: tagColor, borderColor: tagColor }}>
                          {s.tag}
                        </span>
                        <span className="lt-bar-stat-num">
                          {getStatValue(item.id, s.tag, s.value)}
                        </span>
                      </div>
                      <div className="lt-bar-stat-lines">
                        <div style={{ height: 3, background: s.color }} />
                        <div style={{ height: 2, background: "#000" }} />
                      </div>
                    </div>
                  ); })}
                  <span className="lt-bar-cta" style={{ color: item.color }}>{item.cta}</span>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nav LB/RB — coin haut droit, desktop uniquement */}
      {mounted && !isMobile && (
        <div className="lt-right-nav" key={ITEMS[active].id}>
          <span className="lt-right-nav-arrow left">◄</span>
          <span className="lt-right-nav-btn">LB</span>
          <span className="lt-right-nav-label">{ITEMS[active].label}</span>
          <span className="lt-right-nav-btn">RB</span>
          <span className="lt-right-nav-arrow right">►</span>
        </div>
      )}

      {/* Compte — bord droit, desktop uniquement */}
      {mounted && !isMobile && (
        <div
          className="lt-right-account"
          key={`account-${ITEMS[active].id}`}
          onClick={() => window.open(ITEMS[active].href, "_blank")}
        >
          <i className={`lt-right-icon ${ITEMS[active].iconClass}`} />
          <div className="lt-right-account-info">
            <span className="lt-right-account-handle">{ITEMS[active].handle}</span>
            <span className="lt-right-account-stat" style={{ color: ITEMS[active].color }}>
              {ITEMS[active].stats[0]
                ? `${getStatValue(ITEMS[active].id, ITEMS[active].stats[0].tag, ITEMS[active].stats[0].value)} ${ITEMS[active].stats[0].tag}`
                : ""}
            </span>
          </div>
          <span className="lt-right-account-cta" style={{ color: ITEMS[active].color }}>
            {ITEMS[active].cta}
          </span>
        </div>
      )}

      {/* Posts / items — bord droit, desktop uniquement */}
      {mounted && !isMobile && (ITEMS[active].rightItems ?? []).map((item, i) => (
        <div
          className={`lt-right-bar-wrap${item.desc ? " lt-right-bar-static" : ""}`}
          key={`${ITEMS[active].id}-ri-${i}`}
          style={{ top: `${228 + i * 52}px`, animationDelay: `${(i + 1) * 55}ms` }}
          onClick={item.href && !item.desc ? () => window.open(item.href, "_blank") : undefined}
        >
          <div className="lt-right-bar">
            {item.desc ? (
              /* Mode descriptif */
              <div className="lt-right-bar-desc-wrap">
                <span className="lt-right-bar-desc-label">{item.label}</span>
                <span className="lt-right-bar-desc-text">{item.desc}</span>
              </div>
            ) : (
              /* Mode post cliquable */
              <>
                <span className="lt-right-bar-text">{item.label}</span>
                <span className="lt-right-bar-meta" style={{ color: item.metaColor ?? ITEMS[active].color }}>
                  {item.meta}
                </span>
              </>
            )}
          </div>
        </div>
      ))}

      <div className={`lt-kbd-hints${mounted ? " visible" : ""}`}>
        <div className="lt-kbd-row"><span className="lt-kbd-key">↑↓</span><span>SELECT</span></div>
        <div className="lt-kbd-row"><span className="lt-kbd-key">↵</span><span>OPEN</span></div>
      </div>
    </div>
  );
}
