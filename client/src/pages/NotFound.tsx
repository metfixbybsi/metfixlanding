/**
 * NotFound.tsx — 404 page
 * Design: "Earned Authority" — matches MetFix dark design system
 * Colors: #0A0A0A bg | #C9A96E gold | #EFEFEF text
 */
import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#EFEFEF", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
        {/* Gold rule */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
          <div style={{ width: "2rem", height: "1px", background: "#C9A96E" }} />
          <span style={{ fontFamily: "'DM Mono'", fontSize: "0.7rem", letterSpacing: "0.18em", color: "#C9A96E", textTransform: "uppercase" }}>Error 404</span>
          <div style={{ width: "2rem", height: "1px", background: "#C9A96E" }} />
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: "'Playfair Display'", fontWeight: 800, fontSize: "clamp(3rem, 10vw, 5rem)", lineHeight: 1, color: "#EFEFEF", marginBottom: "1rem" }}>
          Page not found.
        </h1>

        <p style={{ fontFamily: "'DM Sans'", fontSize: "1rem", lineHeight: 1.75, color: "rgba(239,239,239,0.55)", marginBottom: "3rem" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA */}
        <button
          onClick={() => setLocation("/")}
          className="btn-primary"
          style={{ fontSize: "0.85rem", padding: "0.875rem 2rem" }}
        >
          Back to MetFix <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
