import { useState } from "react";

const getStrength = (score) => {
  if (score <= 3) return { label: "WEAK",   color: "#EF4444" };
  if (score <= 6) return { label: "FAIR",   color: "#F59E0B" };
  if (score <= 8) return { label: "GOOD",   color: "#3B82F6" };
  return              { label: "STRONG", color: "#10B981" };
};

export default function SecurityScore({ score = 2 }) {
  const total = 10;
  const { label, color } = getStrength(score);

  return (
    <>
    
     
        <div style={{ width: "100%",  }}>

         

          {/* Continuous bar */}
          <div style={{
            width: "100%", height: "5px", borderRadius: "999px",
            background: "#E5E7EB", overflow: "hidden",
          }}>
            <div style={{
              width: `${(score / total) * 100}%`,
              height: "100%",
              borderRadius: "999px",
              background: color,
              transition: "width 0.4s ease, background 0.3s ease",
            }} />
          </div>
           {/* Label row */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", marginBottom: "8px",
          }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#9CA3AF", letterSpacing: "0.1em" }}>
              SECURITY SCORE
            </span>
            <span style={{ fontSize: "11px", fontWeight: "700", color, letterSpacing: "0.1em" }}>
              {label}
            </span>
          </div>

        </div>
    </>
  );
}