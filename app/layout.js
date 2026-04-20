// app/layout.js
import "../app/globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import SocialSidebar from "../components/SocialSidebar";

export const metadata = {
  title: "Sifat Noor Siam — Full Stack Developer & ML Engineer",
  description: "Portfolio of Sifat Noor Siam — Full Stack Developer, Machine Learning Engineer, and Creative Problem Solver.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="body-main">
        <ThemeProvider>
          <div className="bg-decor" />
          <div className="app-wrapper">
            {children}
            <SocialSidebar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}