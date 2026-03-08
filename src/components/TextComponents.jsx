import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "../context/themeContext";

export default function TextComponent({
  label,
  placeholder,
  value,
  setValue,
  width,
  isPassword = false,
  isValid = true,
  errorMessage = ""
}) {
  const { colors } = useTheme();
  const color = isValid ? colors.primary : colors.error;

  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <p
        style={{
          color: focused || !isValid ? color : colors.textSecondary,
          fontWeight: "500",
        }}
      >
        {label}
      </p>

      <TextField
        type={isPassword ? (showPassword ? "text" : "password") : "text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        error={!isValid}
        helperText={!isValid ? errorMessage : ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: color,
            },
            "& fieldset": {
              borderRadius: "20px",
            },
          },
        }}
        InputProps={{
          endAdornment: isPassword && (
            <InputAdornment position="end">
              <IconButton onClick={togglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}