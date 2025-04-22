"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const applied = stored || (systemPrefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", applied);
    setTheme(applied);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 p-2 bg-white dark:bg-neutral-800 rounded-full shadow-md 
      hover:scale-105 transition-transform border border-blue-400 dark:border-white/50 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-lime-500" />
      ) : (
        <Moon size={20} className="text-blue-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
