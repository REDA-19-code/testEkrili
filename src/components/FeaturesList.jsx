export default function FeaturesList({option=0}) {
  const register = [
    "Free to join, no hidden fees",
    "Verified & trusted listings only",
    "Direct contact with property owners",
    "Smart alerts for new matches",
  ];
  const verification=[
    'Link expires in 24 hours',
    'Check spam folder if not found',
    'One click to verify account'
  ]
  const features=option===0?register:verification

  return (
    <>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          lineHeight:'1',
          width:'100%'
        }}>
          {features.map((text, index) => (
            <div key={index} style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}>
              {/* Circle check icon */}
              <div style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                border: "2px solid #7C3AED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                background:"#7C3AED"
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke='white'
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Text */}
              <span style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "#1E1B4B",
                lineHeight: 1,
              }}>
                {text}
              </span>
            </div>
          ))}
        </div>

    </>
  );
}