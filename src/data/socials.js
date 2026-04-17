export const ITEMS = [
  {
    id: "instagram",
    label: "INSTAGRAM",
    handle: "@redd_riott_band",
    href: "https://instagram.com/redd_riott_band",
    iconClass: "fi fi-brands-instagram",
    color: "#e1306c",
    cta: "FOLLOW",
    stats: [
      { tag: "FOL", value: "156", color: "#e1306c" },
      { tag: "PST", value: "3",   color: "#f77737" },
    ],
    // Panneau droit : posts cliquables
    rightItems: [
      { label: "CONCERT A L'ALCHIMISTE BAR À SON",           meta: "VOIR →", href: "https://www.instagram.com/p/DVjkU6nCgOx/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==" },
      { label: "PHOTOS DU CONCERT À L'ALCHIMISTE BAR À SON", meta: "VOIR →", href: "https://www.instagram.com/p/DVzK2wIDvaR/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==" },
      { label: "RÉPÈT' A LA NEF",                            meta: "VOIR →", href: "https://www.instagram.com/p/DWUQkYzjjx0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
    ],
  },
  {
    id: "facebook",
    label: "FACEBOOK",
    handle: "Redd Riott",
    href: "https://www.facebook.com/profile.php?id=61582210891398",
    iconClass: "fi fi-brands-facebook",
    color: "#1877f2",
    cta: "FOLLOW",
    stats: [
      { tag: "FOL", value: "7",  color: "#1877f2" },
      { tag: "PST", value: "3",  color: "#28bbff" },
    ],
    rightItems: [
      { label: "FIRST POST",                                  meta: "VOIR →", href: "https://www.facebook.com/share/p/1KgJPFT8Wm/" },
      { label: "PHOTOS DU CONCERT À L'ALCHIMISTE BAR À SON",  meta: "VOIR →", href: "https://www.facebook.com/share/v/18RmUuGZxi/" },
      { label: "RÉPÈT' A LA NEF",                             meta: "AGENDA", href: "https://www.facebook.com/share/p/1Et4DRhPfM/" },
    ],
  },
  {
    id: "threads",
    label: "THREADS",
    handle: "@redd_riott_band",
    href: "https://threads.net/@redd_riott_band",
    iconClass: "fa-brands fa-threads",
    color: "#ffffff",
    cta: "FOLLOW",
    stats: [
      { tag: "FOL", value: "1",  color: "#aaaaaa" },
      { tag: "PST", value: "2",  color: "#ffffff", activeColor: "#222222" },
    ],
    rightItems: [
      { label: "FIRST THREAD",                               meta: "LIRE →", href: "https://www.threads.com/@redd_riott_band/post/DVuwbJIjNJy?xmt=AQF0AxubMxhys-v-aaYgdZ0XY74PxOD1K0OdQuJ7k0dcmQ" },
      { label: "PHOTOS DU CONCERT À L'ALCHIMISTE BAR À SON", meta: "LIRE →", href: "https://www.threads.com/@redd_riott_band/post/DVzK4T4DvhF?xmt=AQF0DlbGN7bX8BSbZRWsa7cJM9rQUWYUS3L6WvRm7u8osA" },
      { label: "RÉPÈT' A LA NEF",                            meta: "LIRE →", href: "https://www.threads.com/@redd_riott_band/post/DXNntmDiKrz?xmt=AQF0DlbGN7bX8BSbZRWsa7cJM9rQUWYUS3L6WvRm7u8osA" },
    ],
  },
  {
    id: "discord",
    label: "DISCORD",
    handle: "Serveur Discord",
    href: "https://discord.gg/QuaybkRVXY",
    iconClass: "fi fi-brands-discord",
    color: "#5865f2",
    cta: "JOIN",
    stats: [
      { tag: "MBR", value: "0", color: "#5865f2" },
    ],
    // Descriptif serveur
    rightItems: [
      { label: "COMMUNAUTÉ ARTISTIQUE",    desc: "Faites part de votre créativité" },
      { label: "PARTAGES & ÉCHANGES",      desc: "Musique, lives, coulisses en exclusivité, discutez avec nous !" },
      { label: "ÉVÉNEMENTS EN DIRECT",     desc: "Annonces concerts & sessions live" },
    ],
  },
  {
    id: "whatsapp",
    label: "WHATSAPP",
    handle: "Canal WhatsApp",
    href: "https://whatsapp.com/channel/0029VbC23JuBfxo8ivNlk23c",
    iconClass: "fi fi-brands-whatsapp",
    color: "#25d366",
    cta: "JOIN",
    stats: [
      { tag: "ABN", value: "39", color: "#25d366" },
    ],
    // Descriptif canal broadcast
    rightItems: [
      { label: "CANAL DE DIFFUSION",     desc: "Infos & actus directement depuis le groupe" },
      { label: "CONCERTS & LIVES",       desc: "Dates, lieux et annonces en avant-première" },
      { label: "MISES À JOUR RAPIDES",   desc: "Notifications légères, sans spam" },
    ],
  },
];
