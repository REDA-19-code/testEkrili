import { createContext, useContext } from "react";

const SakniThemeContext = createContext();

const theme = {
  colors: {

    /* PRIMARY */
    primary: "#7b3aec",
    deepViolet: "#6B3FA0",
    mediumViolet: "#7541CE",
    brightViolet: "#6023E2",
    /* BACKGROUND */
    overlyBackground:'#e3cef9',
    /* ACCENTS */
    dustyViolet: "#A480DC",
    midPurple: "#885ED0",
    lavenderPurple: "#9571C6",

    /* TEXT */
    textPrimary: "#1D1A2D",
    textSecondary: "#695c82",
    textBody: "#917BAA",
    textPlaceholder: "#9D9EA2",

    /* BORDERS */
    borderLight: "#E1E1E3",
    borderMid: "#B2B3B7",
    borderSoft: "#C6C7CB",

    /* STATUS */
    error: "#D92644",
    errorHover: "#C62F49",
  },

  shadow: {
    card: "0 8px 30px rgba(123,58,236,0.08)",
  }
};

export const ThemeProvider = ({ children }) => {
  return (
    <SakniThemeContext.Provider value={theme}>
      {children}
    </SakniThemeContext.Provider>
  );
};

export const useTheme = () => useContext(SakniThemeContext);