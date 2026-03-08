export default function StatsBar() {
  const stats = [
    { value: "12k+", label: "ACTIVE LISTINGS" },
    { value: "98%", label: "MATCH RATE" },
    { value: "24/7", label: "SUPPORT" },
  ];

  return (
    <>
     
        <div style={{
          
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          gap: "0",
          width: "100%",
            position:'absolute',
            bottom:"20px",
            justifyContent:'space-around',
           
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              {/* Stat item */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0 36px",
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: "800",
                  fontSize: "26px",
                  color: "#1E1B4B",
                  lineHeight: 1.1,
                  letterSpacing: "-0.5px",
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: "600",
                  fontSize: "10px",
                  color: "#6D28D9",
                  letterSpacing: "0.08em",
                  marginTop: "5px",
                }}>
                  {stat.label}
                </span>
              </div>

              {/* Divider (not after last item) */}
              {index < stats.length - 1 && (
                <div style={{
                  width: "1px",
                  height: "36px",
                  background: "rgba(109, 40, 217, 0.25)",
                }} />
              )}
            </div>
          ))}
        </div>
    </>
  );
}