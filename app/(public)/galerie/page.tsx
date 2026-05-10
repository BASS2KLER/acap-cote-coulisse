"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import VideoSection from "@/components/galerie/VideoSection";

const S: React.CSSProperties = { maxWidth: 1280, margin: "0 auto", padding: "0 48px" };

const TABS = [
  { id: "spectacles", label: "Spectacles" },
  { id: "troupe", label: "Vie de la troupe" },
  { id: "videos", label: "Vidéos" },
] as const;

type TabId = typeof TABS[number]["id"];

function getYoutubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export default function GaleriePage() {
  const [tab, setTab] = useState<TabId>("spectacles");
  const spectacles = useQuery(api.spectacles.list);
  const galerieItems = useQuery(api.galerie.list);

  const photos = (galerieItems ?? []).filter((i) => i.type === "photo");
  const videos = (galerieItems ?? []).filter((i) => i.type === "video");

  const CATEGORIES_PHOTO = ["Auditions", "Répétitions", "Vie de la troupe", "Divers"] as const;

  return (
    <>
      {/* En-tête */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", padding: "48px 0" }}>
        <div style={S}>
          <span className="kicker" style={{ marginBottom: 12, display: "block" }}>
            📸 Archives
          </span>
          <h1 style={{
            fontFamily: "var(--font-fraunces, Fraunces, serif)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1,
            letterSpacing: "-0.025em",
            color: "var(--ink)",
            margin: "0 0 16px",
          }}>
            Galerie
          </h1>
          <p style={{
            fontFamily: "var(--font-worksans)",
            fontSize: "1.0625rem",
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            margin: 0,
          }}>
            Les souvenirs de nos spectacles, répétitions et moments de troupe.
          </p>
        </div>
      </div>

      {/* Onglets */}
      <div style={{ borderBottom: "1px solid var(--ink-line)", background: "#FBF7EC", position: "sticky", top: 72, zIndex: 10 }}>
        <div style={{ ...S, display: "flex", gap: 0 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                fontFamily: "var(--font-worksans)",
                fontWeight: 700,
                fontSize: "0.9375rem",
                padding: "16px 24px",
                background: "none",
                border: "none",
                borderBottom: tab === t.id ? "3px solid var(--lavande-deep)" : "3px solid transparent",
                color: tab === t.id ? "var(--lavande-deep)" : "var(--ink-muted)",
                cursor: "pointer",
                transition: "color 140ms",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu onglet Spectacles */}
      {tab === "spectacles" && (
        <section style={{ ...S, padding: "64px 48px" }}>
          <div style={{ marginBottom: 40 }}>
            <span className="kicker" style={{ marginBottom: 8, display: "block" }}>Saison 2025–2026</span>
            <h2 style={{
              fontFamily: "var(--font-fraunces, Fraunces, serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "1.875rem",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: "var(--ink)",
              margin: "0 0 8px",
            }}>
              Nos spectacles en images
            </h2>
          </div>

          {!spectacles && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ height: 280, borderRadius: 6, background: "var(--moutarde-wash)", border: "1px solid var(--ink-line)" }} />
              ))}
            </div>
          )}

          {spectacles && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {spectacles.map((spectacle) => {
                const hasPhotos = (spectacle.galerieUrls ?? []).length > 0;
                return (
                  <Link key={spectacle._id} href={`/spectacles/${spectacle.slug}`}
                    style={{ textDecoration: "none", display: "block" }}>
                    <div style={{
                      background: "#FBF7EC",
                      border: "1px solid var(--ink-line)",
                      borderRadius: 6,
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      transition: "box-shadow 200ms, transform 200ms",
                    }}>
                      <div style={{
                        background: "var(--brick-wash)",
                        height: 180,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                      }}>
                        {spectacle.galerieUrls?.[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={spectacle.galerieUrls[0]}
                            alt={spectacle.titre}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : spectacle.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={spectacle.imageUrl}
                            alt={spectacle.titre}
                            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", padding: 16 }}
                          />
                        ) : (
                          <span style={{ fontSize: "3.5rem", opacity: 0.3 }}>{spectacle.emoji}</span>
                        )}
                        {hasPhotos && (
                          <span style={{
                            position: "absolute",
                            bottom: 8,
                            right: 8,
                            background: "rgba(0,0,0,0.6)",
                            color: "white",
                            fontSize: "0.6875rem",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: 999,
                            fontFamily: "var(--font-worksans)",
                          }}>
                            {spectacle.galerieUrls!.length} photo{spectacle.galerieUrls!.length > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                      <div style={{ padding: "16px 20px" }}>
                        <h3 style={{
                          fontFamily: "var(--font-fraunces, Fraunces, serif)",
                          fontWeight: 400,
                          fontSize: "1.125rem",
                          color: "var(--ink)",
                          margin: "0 0 4px",
                        }}>
                          {spectacle.titre}
                        </h3>
                        <p style={{
                          fontFamily: "var(--font-worksans)",
                          fontSize: "0.8125rem",
                          color: "var(--ink-muted)",
                          margin: 0,
                          fontStyle: hasPhotos ? "normal" : "italic",
                        }}>
                          {hasPhotos ? `${spectacle.saison}` : "Photos à venir"}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Contenu onglet Vie de la troupe */}
      {tab === "troupe" && (
        <section style={{ ...S, padding: "64px 48px" }}>
          {!galerieItems && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} style={{ aspectRatio: "1", borderRadius: 6, background: "var(--moutarde-wash)", border: "1px solid var(--ink-line)" }} />
              ))}
            </div>
          )}

          {galerieItems && photos.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "80px 0",
              fontFamily: "var(--font-worksans)",
              color: "var(--ink-muted)",
              fontStyle: "italic",
            }}>
              Photos à venir — ajoutez-en depuis l'<Link href="/admin/galerie" style={{ color: "var(--lavande-deep)" }}>espace admin</Link>.
            </div>
          )}

          {photos.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {CATEGORIES_PHOTO.map((cat) => {
                const catPhotos = photos.filter((p) => p.categorie === cat);
                if (catPhotos.length === 0) return null;
                return (
                  <div key={cat}>
                    <h2 style={{
                      fontFamily: "var(--font-fraunces, Fraunces, serif)",
                      fontWeight: 400,
                      fontSize: "1.5rem",
                      color: "var(--ink)",
                      margin: "0 0 20px",
                    }}>
                      {cat}
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                      {catPhotos.map((photo) => (
                        <div key={photo._id} style={{
                          background: "var(--mousse-wash)",
                          border: "1px solid var(--ink-line)",
                          borderRadius: 6,
                          overflow: "hidden",
                        }}>
                          {photo.photoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={photo.photoUrl} alt={photo.titre}
                              style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" }} />
                          ) : (
                            <div style={{ aspectRatio: "1", background: "var(--moutarde-wash)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontSize: "2rem", opacity: 0.4 }}>📷</span>
                            </div>
                          )}
                          <div style={{ padding: "10px 12px" }}>
                            <div style={{
                              fontFamily: "var(--font-worksans)",
                              fontWeight: 700,
                              fontSize: "0.8125rem",
                              color: "var(--ink)",
                              marginBottom: 2,
                            }}>
                              {photo.titre}
                            </div>
                            <div style={{
                              fontFamily: "var(--font-worksans)",
                              fontSize: "0.75rem",
                              color: "var(--ink-muted)",
                            }}>
                              {photo.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Contenu onglet Vidéos */}
      {tab === "videos" && (
        <section style={{ ...S, padding: "64px 48px" }}>
          {/* Vidéos ajoutées via la galerie admin */}
          {videos.length > 0 && (
            <div style={{ marginBottom: 64 }}>
              <h2 style={{
                fontFamily: "var(--font-fraunces, Fraunces, serif)",
                fontWeight: 400,
                fontSize: "1.75rem",
                color: "var(--ink)",
                margin: "0 0 24px",
              }}>
                Moments de la troupe
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                {videos.map((video) => {
                  const ytId = video.urlVideo ? getYoutubeId(video.urlVideo) : null;
                  return (
                    <a key={video._id} href={video.urlVideo ?? "#"} target="_blank" rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}>
                      <div style={{
                        background: "#FBF7EC",
                        border: "1px solid var(--ink-line)",
                        borderRadius: 6,
                        overflow: "hidden",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      }}>
                        <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--ink)" }}>
                          {ytId && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                              alt={video.titre}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          )}
                          <div style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0,0,0,0.2)",
                          }}>
                            <div style={{
                              width: 48, height: 48, borderRadius: "50%",
                              background: "var(--lavande-deep)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <span style={{ color: "white", fontSize: "1.2rem", marginLeft: 3 }}>▶</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: "14px 18px" }}>
                          <div style={{
                            fontFamily: "var(--font-fraunces, Fraunces, serif)",
                            fontWeight: 400,
                            fontSize: "1rem",
                            color: "var(--ink)",
                            marginBottom: 4,
                          }}>
                            {video.titre}
                          </div>
                          <div style={{
                            fontFamily: "var(--font-worksans)",
                            fontSize: "0.75rem",
                            color: "var(--ink-muted)",
                          }}>
                            {video.categorie} · {video.date}
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Archives YouTube (données statiques existantes) */}
          <VideoSection />
        </section>
      )}
    </>
  );
}
