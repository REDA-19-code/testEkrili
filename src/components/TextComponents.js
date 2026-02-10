import { useState } from "react";
import { TextField } from "@mui/material";

export default function TextComponent({ label, placeholder, value, setValue, width }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <p style={{ color: focused ? "#8371f9" : "gray" ,fontWeight:'500' }}>{label}</p>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        onFocus={() => setFocused(true)}   
        onBlur={() => setFocused(false)}   
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#8371f9",
            },
            "& fieldset": {
              borderRadius: "20px",
            },
          },
        }}
      />
    </div>
  );
}
