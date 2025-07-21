"use client";
import { useMemo } from "react";
import { createTheme } from "@mui/material";

const useCustomTheme = () => {
  const theme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        typography: { fontFamily: "var(--font-vazirmatn)" },
        palette: {
          mode: "light",
          primary: {
            main: "#f0768b", // Soft feminine pink
            light: "#f7a0ad",
            dark: "#c15465",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#957DAD", // Lavender
            light: "#baa2d3",
            dark: "#6e5c85",
            contrastText: "#ffffff",
          },
          background: {
            default: "#fff9fb",
            paper: "#ffffff",
          },
          warning: {
            main: "#f4b400", // Warm yellow
            light: "#f8cf57",
            dark: "#c19100",
            contrastText: "#000000",
          },
          error: {
            main: "#e57373",
            light: "#f08080",
            dark: "#c62828",
            contrastText: "#ffffff",
          },
          info: {
            main: "#64b5f6",
            light: "#90caf9",
            dark: "#1976d2",
            contrastText: "#ffffff",
          },
          success: {
            main: "#81c784",
            light: "#a5d6a7",
            dark: "#388e3c",
            contrastText: "#ffffff",
          },
          text: {
            primary: "#333333",
            secondary: "#555555",
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 24,
                padding: "10px 24px",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: "0 4px 16px rgba(240, 118, 139, 0.2)",
              },
            },
          },
        },
      }),
    []
  );

  return theme;
};

export default useCustomTheme;
