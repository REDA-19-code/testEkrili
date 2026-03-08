import { useState } from "react";

const TenantIcon = ({ active }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.5" stroke={active ? "white" : "#6B7280"} strokeWidth="1.8" />
    <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={active ? "white" : "#6B7280"} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const OwnerIcon = ({ active }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z" stroke={active ? "white" : "#6B7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21V12h6v9" stroke={active ? "white" : "#6B7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <div style={{
    width: "22px", height: "22px", borderRadius: "50%",
    background: "#7C3AED",
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "absolute", top: "10px", right: "10px",
  }}>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function ChickType({value,setValue}) {
  

  const roles = [
    { id: false, label: "Tenant", Icon: TenantIcon },
    { id: true,  label: "Owner",  Icon: OwnerIcon  },
  ];

  return (
    <>
     
        <div>
          {/* Label */}
          <p style={{
            fontSize: "11px", fontWeight: "700", color: "#9CA3AF",
            letterSpacing: "0.1em", marginBottom: "12px", margin: "0 0 12px 4px",
          }}>
            JOIN AS A
          </p>

          {/* Cards row */}
          <div style={{ display: "flex", gap: "14px" }}>
            {roles.map(({ id, label, Icon }) => {
              const isActive = value === id;
              return (
                <div
                  key={id}
                  onClick={() => setValue(id)}
                  style={{
                    position: "relative",
                    width: "130px", height: "100px",
                    borderRadius: "14px",
                    border: `2px solid ${isActive ? "#7C3AED" : "#E5E7EB"}`,
                    background: "#fff",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: "10px",
                    cursor: "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    boxShadow: isActive ? "0 0 0 4px rgba(124,58,237,0.08)" : "none",
                  }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: "46px", height: "46px", borderRadius: "50%",
                    background: isActive ? "#7C3AED" : "#F3F4F6",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                  }}>
                    <Icon active={isActive} />
                  </div>

                  {/* Label */}
                  <span style={{
                    fontSize: "14px", fontWeight: "600",
                    color: isActive ? "#7C3AED" : "#374151",
                    transition: "color 0.2s",
                  }}>
                    {label}
                  </span>

                  {/* Checkmark */}
                  {isActive && <CheckIcon />}
                </div>
              );
            })}
          </div>
        </div>

    </>
  );
}