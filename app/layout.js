import "./globals.css";

export const metadata = {
  title: "Lami Chemeda | Full-Stack Developer Portfolio",
  description: "Portfolio of Lami Chemeda, Full-Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
