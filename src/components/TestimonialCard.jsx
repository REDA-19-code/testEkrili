import { useState } from "react";

const VerifiedBadge = () => (
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#EEF2FF",
    color: "#4F46E5",
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 8px",
    borderRadius: "20px",
    letterSpacing: "0.03em",
    fontFamily: "'DM Sans', sans-serif",
  }}>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="#4F46E5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    VERIFIED OWNER
  </span>
);

const Avatar = ({ name }) => {
  const initials = name.split(" ").map(n => n[0]).join("");
  return (
    <div style={{
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #C7B8F5 0%, #A78BFA 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "700",
      fontSize: "15px",
      fontFamily: "'DM Sans', sans-serif",
      flexShrink: 0,
      boxShadow: "0 2px 8px rgba(167,139,250,0.4)",
    }}>
      {initials}
    </div>
  );
};

export default function TestimonialCard({name,text}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "22px 24px",
            maxWidth: "340px",
            width: "100%",
            boxShadow: hovered
              ? "0 12px 40px rgba(139, 92, 246, 0.18), 0 2px 8px rgba(0,0,0,0.06)"
              : "0 4px 20px rgba(139, 92, 246, 0.1), 0 1px 4px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.25s ease, transform 0.25s ease",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            cursor: "default",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle background decoration */}
          <div style={{
            position: "absolute",
            bottom: "-30px",
            right: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,181,253,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Header row */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "14px",
          }}>
            <Avatar name={name} />
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: "600",
                fontSize: "15px",
                color: "#1E1B4B",
                lineHeight: 1,
              }}>
                {name}
              </span>
              <VerifiedBadge />
            </div>
          </div>

          {/* Quote */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: "italic",
            fontSize: "14px",
            color: "#4B5563",
            lineHeight: "1.6",
            margin: 0,
            paddingLeft: "2px",
          }}>
            {text}
          </p>
        </div>

    </>
  );
}