import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "TravelBooking.online: independent flight booking assistance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0b1522", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 96, height: 66, borderRadius: 12, background: "#246BFD", alignItems: "center", justifyContent: "center" }}>
            <svg width="44" height="44" viewBox="0 0 44 44"><path d="M9 23 18 32 35 12" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            travelbooking<span style={{ color: "#6c9bff" }}>.online</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>Your travel plans.</div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, lineHeight: 1.05, color: "#6c9bff" }}>Let&apos;s get them done.</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.75)" }}>Independent flight booking assistance · Real people · Clear pricing</div>
      </div>
    ),
    { ...size },
  );
}
