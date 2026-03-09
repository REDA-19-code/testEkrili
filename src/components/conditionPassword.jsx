import { useState } from "react";

const requirements = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "digit", label: "One numerical digit", test: (p) => /[0-9]/.test(p) },
  { id: "special", label: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

// ✅ يقرأ password من الخارج فقط — لا يملك حالة داخلية
export function ConditionPassword({ password = "" }) {
  const checks = requirements.map((r) => ({ ...r, passed: r.test(password) }));

  return (
    <div style={{ background: "#f7f9fc", borderRadius: "10px", padding: "16px 18px", border: "1px solid #e8ecf0", width: "300px" }}>
      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#9aa3af", textTransform: "uppercase", marginBottom: "12px", fontFamily: "sans-serif" }}>
        Requirements
      </div>
      {checks.map((c, i) => (
        <div key={c.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: i < checks.length - 1 ? "10px" : 0 }}>
          <div style={{
            width: "16px", height: "16px", borderRadius: "50%",
            border: `2px solid ${c.passed ? "#34c759" : "#c8cdd4"}`,
            background: c.passed ? "#34c759" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            transition: "all 0.25s ease",
          }}>
            {c.passed && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span style={{ fontSize: "13.5px", color: c.passed ? "#2d7d46" : "#6b7280", fontFamily: "sans-serif", transition: "color 0.25s" }}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
}
