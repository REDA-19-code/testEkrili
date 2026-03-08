import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/themeContext";

const OtpCell = ({ value, isFocused, inputRef, onChange, onKeyDown, onFocus, onBlur, onPaste ,color}) => (
    
  <input
    ref={inputRef}
    type="text"
    inputMode="numeric"
    maxLength={1}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onFocus={onFocus}
    onBlur={onBlur}
    onPaste={onPaste}
    style={{
      width: 50,
      height: 80,
      borderRadius: 16,
      border: `2px solid ${value ? color.primary : "#e0e4ef"}`,
      background: value ? "#eef3ff" : "#f7f8fc",
      fontSize: 26,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 600,
      color: color.primary,
      textAlign: "center",
      outline: "none",
      caretColor: "transparent",
      boxShadow: isFocused ? "0 0 0 4px rgba(59,111,212,0.15)" : "none",
      transform: isFocused ? "scale(1.06)" : "scale(1)",
      transition: "border-color .15s, box-shadow .15s, transform .12s, background .15s",
      cursor: "text",
    }}
  />
);

export default function TextVerify({ length = 6, initialValues = [] ,values,setValues}) {
    const {colors}=useTheme()

  const [focused, setFocused] = useState(-1);
  const inputs = useRef([]);

  useEffect(() => { inputs.current[0]?.focus(); }, []);

  const move = (i) => { inputs.current[i]?.focus(); setFocused(i); };

  const handleChange = (e, i) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    setValues(prev => { const n = [...prev]; n[i] = val; return n; });
    if (val && i < length - 1) move(i + 1);
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (values[i]) setValues(prev => { const n = [...prev]; n[i] = ""; return n; });
      else if (i > 0) { setValues(prev => { const n = [...prev]; n[i-1] = ""; return n; }); move(i - 1); }
    }
    if (e.key === "ArrowLeft"  && i > 0)          move(i - 1);
    if (e.key === "ArrowRight" && i < length - 1) move(i + 1);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    setValues(prev => {
      const n = [...prev];
      pasted.split("").forEach((ch, i) => { n[i] = ch; });
      return n;
    });
    move(Math.min(pasted.length, length - 1));
  };

  return (
<div style={{ 
  display: "flex", 
  gap: 10,
  justifyContent: "center" 
}}>
  {values.map((val, i) => (
    <OtpCell
      key={i}
      value={val}
      isFocused={focused === i}
      inputRef={el => (inputs.current[i] = el)}
      onChange={e => handleChange(e, i)}
      onKeyDown={e => handleKeyDown(e, i)}
      onFocus={() => setFocused(i)}
      onBlur={() => setFocused(-1)}
      onPaste={handlePaste}
      color={colors}
    />
  ))}
</div>
  );
}