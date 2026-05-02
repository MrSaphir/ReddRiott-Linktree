import { useState, useEffect } from "react";
import useIsMobile from "./hooks/useIsMobile";
import bgVideo from "./assets/background.mp4";
import posterImg from "./assets/poster.jpg";
import logo from "./assets/reddriott.png";
import "./Socials.css";
import { ITEMS as ITEMS_STATIC } from "./data/socials";

const ROLE_LABELS = ["REDD", "RIOTT", "BAND", "CREW", "IN", "LIVE!"];

function getMergedSocials() {
  try {
    const sc = JSON.parse(localStorage.getItem("rr_public_content_v1") || "{}");
    if (!sc.socials) return ITEMS_STATIC;
    return ITEMS_STATIC.map(pl => {
      const sv = sc.socials.find(s => s.id === pl.id);
      if (!sv) return pl;
      return {
        ...pl,
        handle:     sv.handle     ?? pl.handle,
        href:       sv.href       ?? pl.href,
        cta:        sv.cta        ?? pl.cta,
        stats:      pl.stats.map((st, i) => ({ ...st, value: sv.stats?.[i]?.value ?? st.value })),
        rightItems: sv.rightItems ?? pl.rightItems,
      };
    });
  } catch { return ITEMS_STATIC; }
}

function formatCount(n) {
  if (n == null || isNaN(n)) return "—";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return String(n);
}

export default function Socials() {
  const [items,    setItems]    = useState(() => getMergedSocials()); // eslint-disable-line
  const [active,   setActive]   = useState(0);
  const [mounted,  setMounted]  = useState(false);
  const [dynStats, setDynStats] = useState({});
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Discord — API publique
  useEffect(() => {
    fetch("https://discord.com/api/v9/invites/QuaybkRVXY?with_counts=true")
      .then(r => { if (!r.ok) throw new Error(`Discord API ${r.status}`); return r.json(); })
      .then(data => {
        if (data.approximate_member_count != null) {
          setDynStats(prev => ({
            ...prev,
            discord: { MBR: formatCount(data.approximate_member_count) },
          }));
        }
      })
      .catch(() => { console.warn("[Socials] Discord API unavailable — stats non actualisées"); });
  }, []);

  // Cycle auto — mobile uniquement (3 s par barre, remplace le hover)
  useEffect(() => {
    if (!isMobile) return;
    const id = setInterval(() => {
      setActive(i => (i + 1) % items.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isMobile]);

  // Navigation clavier — tous écrans
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")                      setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown")                    setActive(i => Math.min(items.length - 1, i + 1));
      if (e.key === "Enter")                        window.open(items[active].href, "_blank");
      if (e.key === "Escape" || e.key === "ArrowLeft") window.history.back();
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
        <img src={logo} alt="Redd Riott" className="lt-mobile-logo" />
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`lt-bar-outer${active === i ? " active" : ""}${mounted ? " in" : ""}`}
            style={{ transitionDelay: `${i * 65}ms` }}
            onClick={() => handleBarClick(item, i)}
            onMouseEnter={() => !isMobile && setActive(i)}
          >
            <div className="lt-bar-red" />
            <div className="lt-bar">
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
        <div className="lt-right-nav" key={items[active].id}>
          <span className="lt-right-nav-arrow left">◄</span>
          <span className="lt-right-nav-btn">LB</span>
          <span className="lt-right-nav-label">{items[active].label}</span>
          <span className="lt-right-nav-btn">RB</span>
          <span className="lt-right-nav-arrow right">►</span>
        </div>
      )}

      {/* Compte — bord droit, desktop uniquement */}
      {mounted && !isMobile && (
        <div
          className="lt-right-account"
          key={`account-${items[active].id}`}
          onClick={() => window.open(items[active].href, "_blank")}
        >
          <i className={`lt-right-icon ${items[active].iconClass}`} />
          <div className="lt-right-account-info">
            <span className="lt-right-account-handle">{items[active].handle}</span>
            <span className="lt-right-account-stat" style={{ color: items[active].color }}>
              {items[active].stats[0]
                ? `${getStatValue(items[active].id, items[active].stats[0].tag, items[active].stats[0].value)} ${items[active].stats[0].tag}`
                : ""}
            </span>
          </div>
          <span className="lt-right-account-cta" style={{ color: items[active].color }}>
            {items[active].cta}
          </span>
        </div>
      )}

      {/* Posts / items — bord droit, desktop uniquement */}
      {mounted && !isMobile && (items[active].rightItems ?? []).map((item, i) => (
        <div
          className={`lt-right-bar-wrap${item.desc ? " lt-right-bar-static" : ""}`}
          key={`${items[active].id}-ri-${i}`}
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
                <span className="lt-right-bar-meta" style={{ color: item.metaColor ?? items[active].color }}>
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
