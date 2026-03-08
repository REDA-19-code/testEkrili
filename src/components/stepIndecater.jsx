import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function StepIndicator({ steps}) {
  const defaultSteps = [
    { label: "Enter your email address" },
    { label: "Check your inbox" },
    { label: "Create a new password" },
  ];
const location=useLocation()
  const items = steps || defaultSteps;
  const [currentStep,setCurrentStep]=useState(()=>{
    if (location.pathname.startsWith("/rest/forget")) return 1
  if (location.pathname.startsWith("/rest/confirm")) return 2
  if (location.pathname.startsWith("/rest/password")) return 3
  return 1
  })
  useEffect(()=>{
    if (location.pathname.startsWith("/rest/forget")) setCurrentStep(1)
  else if (location.pathname.startsWith("/rest/confirm")) setCurrentStep(2)
  else if (location.pathname.startsWith("/rest/password")) setCurrentStep(3)
  })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, width:'100%' }}>

      {items.map((step, i) => {
        const num = i + 1;
        const isDone = num < currentStep;
        const isActive = num === currentStep;
        const isLast = i === items.length - 1;

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

              {/* Step circle */}
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                flexShrink: 0,
                background: isDone || isActive ? "#7c3aed" : "transparent",
                border: isDone || isActive ? "none" : "2px solid #c4b5e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}>
                {isDone ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="#fff" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isActive ? "#fff" : "#c4b5e8",
                    lineHeight: 1,
                  }}>
                    {num}
                  </span>
                )}
              </div>

              {/* Label */}
              <span style={{
                fontSize: 15,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#1a0a3d" : isDone ? "#4c1d95" : "#a89cc8",
                transition: "color 0.2s",
              }}>
                {step.label}
              </span>
            </div>

            {/* Dashed connector */}
            {!isLast && (
              <div style={{
                marginLeft: 17,
                width: 2,
                height: 24,
                borderLeft: "2px dashed #c4b5e8",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}