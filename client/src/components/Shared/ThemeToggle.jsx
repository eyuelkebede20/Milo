import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="btn btn-ghost btn-circle text-lg" aria-label="Toggle Theme">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
