"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "my-presentation-theme";

function subscribeToTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("theme-change", callback);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("theme-change", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved && (saved === "light" || saved === "dark" || saved === "system")) {
      return saved;
    }
  } catch {
    // Ignore localStorage access issues
  }
  return "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

const emptySubscribe = () => () => {};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const computeResolvedTheme = useCallback((currentTheme: Theme): ResolvedTheme => {
    if (currentTheme === "system") {
      if (typeof window === "undefined") return "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return currentTheme;
  }, []);

  const resolvedTheme: ResolvedTheme = isMounted
    ? computeResolvedTheme(theme)
    : "dark";

  // Update DOM whenever resolved theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [resolvedTheme]);

  const setTheme = useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  const toggleTheme = useCallback(() => {
    const currentSaved = getThemeSnapshot();
    const currentResolved =
      currentSaved === "system"
        ? typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : currentSaved;
    const next: Theme = currentResolved === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore
    }
    window.dispatchEvent(new Event("theme-change"));
  }, []);

  // Global hotkey: 't' / 'T' toggles theme if not currently inside an input/textarea
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "t" || e.key === "T") {
        // Do not trigger if modifier keys (Ctrl/Cmd/Alt) are pressed
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          toggleTheme();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
